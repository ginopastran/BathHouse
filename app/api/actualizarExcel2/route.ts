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
        const fileName2 = `${session?.user?.email}2.xlsx`;

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
                        [jsonData["metros-cuadrados-de-planta-baja"]], // B9
                        [jsonData["metros-cuadrados-de-planta-alta"]],
                        [jsonData["superficie-p-rgolas-cubiertas-techado"]],
                        [jsonData["superficie-p-rgolas-semi-cubierta-p-rgola"]],
                        [data["sup-aleros"]],
                        [jsonData["sup-cochera-semi-cubierta"]],
                        ["=+B9+B10+B11+B12+B13+B14"],
                        ["=B9+B10+B11+B12/2+B13/2+B14/2"], // B16
                        [""], [""],
                        [data["muros-PB-perimetro"]],
                        [data["muros-PB-interiores-churrasquera-otros"]],
                        [data["muros-steel-concrete-PA-perimetro"]],
                        [data["muros-steel-concrete-PA-interiores"]],
                        [jsonData["altura-de-muro-planta-baja"]], //B23
                        [jsonData["altura-de-muro-planta-alta"]],
                        [jsonData["tabique-durlock-pb-pa"]], //B25
                        [data["balcon-con-porcelanato"]],
                        [data["hormigon-visto"]],
                        [""],
                        [data["puerta-principal"]], // B29
                        [data["puertas"]],
                        [data["ventanas"]],
                        [data["puerta-ventana"]],
                        [data["cantidad-bocas-electricas-tablero"]],
                        [""],
                        [data["cocina"]],
                        [data["lavanderia"]],
                        [data["banos-visita"]],
                        [data["banos"]],
                        // [data["churrasquera"]], //B28
                        [jsonData["aires-acondicionados"]], //B39
                        [jsonData["churrasquera"]], //40
                        [""],
                        [jsonData["pozo-septico"]], //42
                        [jsonData["cisterna-enterrada"]],
                        [jsonData["con-pluviales"]],
                        [jsonData["agua"]],
                        [jsonData["cloaca"]],
                        [jsonData["gas"]],
                        [jsonData["luz"]],
                        [jsonData["pozo-filtrante"]],
                        [jsonData["losa-radiante-electrica"]],
                        [jsonData["losa-radiante-de-agua"]],
                        [jsonData["molduras-de-cumbrera"]],
                        [jsonData["moldura-de-ventanas"]],
                        [jsonData["cielorraso-de-placa-de-yeso"]],
                        [jsonData["cielorraso-de-yeso"]],
                        [jsonData["porcelanato"]],
                        [jsonData["rayado-o-fino-de-muros"]],
                        [jsonData["vereda-vehiculo"]],
                        [jsonData["vereda-paralela-calle"]],
                        [data["cierre-provisorio"]], // B60
                        [data["cierre-definitivo"]],
                        [jsonData["churrasquera-de-ladrillo-y-o-hogar"]],
                        [""], //ACA DEBERIA IR EL DATO DE PILETA ? B63
                        [jsonData["cuenta-con-arquitecto"]],
                        [jsonData["cuenta-con-proyecto"]],
                    ],
                },
            });

        } catch (error) {
            console.log(error);
        }

        try {
            const drive = google.drive({ version: 'v3', auth: jwtClient });
            const responseDrive = await drive.files.export({
                fileId: spreadsheetId,
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            }, { responseType: 'stream' });

            const tmpDir = path.join(os.tmpdir(), 'myapp');
            if (!fs.existsSync(tmpDir)) {
                fs.mkdirSync(tmpDir);
            }

            const filePath = path.join(tmpDir, fileName2);
            const dest = fs.createWriteStream(filePath);

            responseDrive.data
                .on('end', () => {
                    console.log('Archivo descargado exitosamente.');

                    const fileContent = fs.readFileSync(filePath);

                    const params = {
                        Bucket: 'bathouse-excel-test',
                        Key: fileName2,
                        Body: fileContent
                    };

                    s3.upload(params, function (err: Error, data: AWS.S3.ManagedUpload.SendData) {
                        if (err) {
                            throw err;
                        }
                        console.log(`File uploaded successfully. ${data.Location}`);
                    });

                    fs.unlinkSync(filePath);
                    console.log(`Archivo eliminado exitosamente: ${filePath}`);
                })
                .on('error', (err) => {
                    console.error('Error durante la descarga:', err);
                })
                .pipe(dest);

        } catch (error) {
            console.log(error);
        }


        return NextResponse.json({ fileName2: fileName2 });
    } catch (error: any) {
        return NextResponse.json({ message: "An error ocurred", error: error.message }, { headers: corsHeaders });
    }
}