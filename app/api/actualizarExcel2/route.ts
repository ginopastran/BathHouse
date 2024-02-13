import AWS from 'aws-sdk';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { google } from 'googleapis';
import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import readExcelFromS3 from '@/lib/readExcelFromS3';
import readJsonFromS3 from '@/lib/readJsonFromS3';

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    region: "sa-east-1",
});

const s3 = new AWS.S3();

const privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || '';

export async function POST(req: NextRequest) {
    const session = await auth();
    try {
        const data = await req.json();

        const bucketName = 'bathouse-excel-test'
        const jsonFileName = `${session?.user?.email}.json`

        const jsonData = await readJsonFromS3(bucketName, jsonFileName);

        console.log(jsonData);

        console.log(data);

        const fileName = `${session?.user?.email}.xlsx`;

        const jwtClient = new google.auth.JWT(
            clientEmail,
            undefined,
            privateKey.replace(/\\n/g, '\n'),
            ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
        );

        const sheets = google.sheets({ version: 'v4', auth: jwtClient });

        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        const range = 'Informacion de Cotización!B2:B65';

        const valueInputOption = 'RAW';

        try {
            const response = await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: range,
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    // Los arrays con strings vacíos son para rellenar espacios que no se llenan en el data del form, es porque google sheets no deja especificar un dato para cada celda espeficica, solo deja agregar un rango desde una celda hasta otra, ej: B2:B65
                    values: [
                        [jsonData["nombre-completo"]], // B2
                        [jsonData["ubicacion"]], // B3
                        [""], [""], [""],
                        [data["perimetro-lote"]], //B7
                        [data["frente-lote"]],
                        [data["metros-cuadrados-de-planta-baja"]], // B9
                        [data["metros-cuadrados-de-planta-alta"]],
                        [data["superficie-p-rgolas-cubiertas-techado"]],
                        [data["superficie-p-rgolas-semi-cubierta-p-rgola"]],
                        [""],
                        [data["sup-cochera-semi-cubierta"]],
                        ["=+B9+B10+B11+B12+B13+B14"], ["=B9+B10+B11+B12/2+B13/2+B14/2"], // AQUI ES DONDE DIGO 
                        [""], [""], [""], [""], [""], [""],
                        [data["altura-de-muro-planta-baja"]], //B23
                        [data["altura-de-muro-planta-alta"]],
                        [data["tabique-durlock-pb-pa"]], //B25
                        [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""],
                        // [data["churrasquera"]], //B28
                        [data["aires-acondicionados"]], //B39
                        [data["churrasquera"]], //40
                        [""],
                        [data["pozo-septico"]], //42
                        [data["cisterna-enterrada"]],
                        [data["con-pluviales"]],
                        [data["agua"]],
                        [data["cloaca"]],
                        [data["gas"]],
                        [data["luz"]],
                        [data["pozo-filtrante"]],
                        [data["losa-radiante-electrica"]],
                        [data["losa-radiante-de-agua"]],
                        [data["molduras-de-cumbrera"]],
                        [data["moldura-de-ventanas"]],
                        [data["cielorraso-de-placa-de-yeso"]],
                        [data["cielorraso-de-yeso"]],
                        [data["porcelanato"]],
                        [data["rayado-o-fino-de-muros"]],
                        [data["vereda-vehiculo"]],
                        [data["vereda-paralela-calle"]],
                        [""], [""],
                        [data["churrasquera-de-ladrillo-y-o-hogar"]],
                        [""], //ACA DEBERIA IR EL DATO DE PILETA ? B63
                        [data["cuenta-con-arquitecto"]],
                        [data["cuenta-con-proyecto"]],
                    ],
                },
            });

        } catch (error) {
            console.log(error);
        }

        // try {
        //     const drive = google.drive({ version: 'v3', auth: jwtClient });
        //     const responseDrive = await drive.files.export({
        //         fileId: spreadsheetId,
        //         mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        //     }, { responseType: 'stream' });

        //     const tmpDir = path.join(os.tmpdir(), 'myapp');
        //     if (!fs.existsSync(tmpDir)) {
        //         fs.mkdirSync(tmpDir);
        //     }

        //     const filePath = path.join(tmpDir, fileName);
        //     const dest = fs.createWriteStream(filePath);

        //     responseDrive.data
        //         .on('end', () => {
        //             console.log('Archivo descargado exitosamente.');

        //             const fileContent = fs.readFileSync(filePath);

        //             const params = {
        //                 Bucket: 'bathouse-excel-test',
        //                 Key: fileName,
        //                 Body: fileContent
        //             };

        //             s3.upload(params, function (err: Error, data: AWS.S3.ManagedUpload.SendData) {
        //                 if (err) {
        //                     throw err;
        //                 }
        //                 console.log(`File uploaded successfully. ${data.Location}`);
        //             });
        //         })
        //         .on('error', (err) => {
        //             console.error('Error durante la descarga:', err);
        //         })
        //         .pipe(dest);

        // } catch (error) {
        //     console.log(error);
        // }


        return NextResponse.json({ fileName: fileName });
    } catch (error: any) {
        return NextResponse.json({ message: "An error ocurred", error: error.message }, { headers: corsHeaders });
    }
}