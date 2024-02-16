import ExcelJS from 'exceljs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { auth } from '@/auth';
import AWS from "aws-sdk"
import * as fs from 'fs';
import os from 'os';
import { Readable } from 'stream';
import readExcelFromS3 from '@/lib/readExcelFromS3';
import { google } from "googleapis"
import { GoogleAuth } from "google-auth-library"
import { exportAndUploadToS3 } from '@/lib/exportAndUploadToS3';


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// const resend = new Resend(process.env.RESEND_API_KEY);
let fileNameGlobal = '';

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}
AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_S3_REGION,
});

const s3 = new AWS.S3();

const privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || '';

if (!privateKey || !clientEmail) {
    throw new Error('Las variables de entorno GOOGLE_SHEETS_PRIVATE_KEY y GOOGLE_SHEETS_CLIENT_EMAIL deben estar definidas');
}


export async function POST(req: NextRequest) {
    const session = await auth();
    try {
        const data = await req.json();

        const jsonData = JSON.stringify(data);
        const jsonFileName = `${session?.user?.email}.json`;
        const jsonBuffer = Buffer.from(jsonData, 'utf-8');


        // console.log(data);

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
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
                        [data["nombre-completo"]], // B2
                        [data["ubicacion"]], // B3
                        [""], [""], [""], [""], [""], [data["metros-cuadrados-de-planta-baja"]], // B9
                        [data["metros-cuadrados-de-planta-alta"]],
                        [data["superficie-p-rgolas-cubiertas-techado"]],
                        [data["superficie-p-rgolas-semi-cubierta-p-rgola"]],
                        [""],
                        [data["superficie-p-rgolas-cochera-semi-cubierta-p-rgola"]],
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
                        [data["vereda-peatonal-paralela-calle"]],
                        [""], [""],
                        [data["churrasquera-de-ladrillo-y-o-hogar"]],
                        [data["pileta"]], //ACA DEBERIA IR EL DATO DE PILETA ? B63
                        [data["cuenta-con-arquitecto"]],
                        [data["cuenta-con-proyecto"]],
                    ],
                },
            });

            await exportAndUploadToS3(jwtClient, spreadsheetId, fileName);
        } catch (error) {
            console.log(error);
        }

        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: jsonFileName,
            Body: jsonBuffer
        };

        s3.upload(params, function (err: Error, data: AWS.S3.ManagedUpload.SendData) {
            if (err) {
                throw err;
            }
            console.log(`JSON file uploaded successfully. ${data.Location}`);
        });

        return NextResponse.json({ fileName: fileName });
    } catch (error: any) {
        return NextResponse.json({ message: "An error ocurred", error: error.message }, { headers: corsHeaders });
    }
}


// export async function GET(req: NextRequest) {
//     try {
//         const filePath = path.resolve(`./public/${fileNameGlobal}`);

//         const buffer = await fs.promises.readFile(filePath);

//         const response = new NextResponse(buffer);

//         return response;
//     } catch (error: any) {
//         return NextResponse.json({ message: "An error ocurred", error: error.message });
//     }
// }

export async function GET(req: NextRequest) {

    const session = await auth()

    try {

        const fileNameGlobal = `${session?.user?.email}.xlsx`;
        const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!;

        const excelData = await readExcelFromS3(bucketName, fileNameGlobal);

        if (!excelData) {
            return NextResponse.json({ message: "No se pudo leer el archivo Excel desde S3" });
        }

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(excelData);

        const worksheet = workbook.getWorksheet('Informacion de Cotización');

        if (!worksheet) {
            return NextResponse.json({ message: "No se encontró la hoja de trabajo 'Informacion de Cotización'" });
        }


        let cellValueH4, cellValueH5, cellValueH6;
        let cellValueI4, cellValueI5, cellValueI6;
        let cellValueJ4, cellValueJ5, cellValueJ6;
        let cellValueK4, cellValueK5, cellValueK6;
        let cellValueH10, cellValueH11, cellValueH12;
        let cellValueI10, cellValueI11, cellValueI12;
        let cellValueJ10, cellValueJ11, cellValueJ12;
        let cellValueK10, cellValueK11, cellValueK12;
        let cellValueH16, cellValueH17, cellValueH18;
        let cellValueI16, cellValueI17, cellValueI18;
        let cellValueJ16, cellValueJ17, cellValueJ18;
        let cellValueK16, cellValueK17, cellValueK18;
        let cellValueH22, cellValueH23, cellValueH24;
        let cellValueI22, cellValueI23, cellValueI24;
        let cellValueJ22, cellValueJ23, cellValueJ24;
        let cellValueK22, cellValueK23, cellValueK24;
        let cellValueH28, cellValueH29, cellValueH30;
        let cellValueI28, cellValueI29, cellValueI30;
        let cellValueJ28, cellValueJ29, cellValueJ30;
        let cellValueK28, cellValueK29, cellValueK30;
        let cellValueH34, cellValueH35, cellValueH36;
        let cellValueI34, cellValueI35, cellValueI36;
        let cellValueJ34, cellValueJ35, cellValueJ36;
        let cellValueK34, cellValueK35, cellValueK36;

        if (worksheet) {
            // CASSAFORMA-TOTAL
            cellValueH4 = worksheet.getCell('H4').value
            cellValueH5 = worksheet.getCell('H5').value;
            cellValueH6 = worksheet.getCell('H6').value;
            // CASSAFORMA-MATERIALES
            cellValueI4 = worksheet.getCell('I4').value;
            cellValueI5 = worksheet.getCell('I5').value;
            cellValueI6 = worksheet.getCell('I6').value;
            // CASSAFORMA-M.O.
            cellValueJ4 = worksheet.getCell('J4').value;
            cellValueJ5 = worksheet.getCell('J5').value;
            cellValueJ6 = worksheet.getCell('J6').value;
            // CASSAFORMA-TERMINACIONES
            cellValueK4 = worksheet.getCell('K4').value;
            cellValueK5 = worksheet.getCell('K5').value;
            cellValueK6 = worksheet.getCell('K6').value;
            // CASSAFORMA + TECHO LTN-TOTAL
            cellValueH10 = worksheet.getCell('H10').value;
            cellValueH11 = worksheet.getCell('H11').value;
            cellValueH12 = worksheet.getCell('H12').value;
            // CASSAFORMA + TECHO LTN-MATERIALES
            cellValueI10 = worksheet.getCell('I10').value;
            cellValueI11 = worksheet.getCell('I11').value;
            cellValueI12 = worksheet.getCell('I12').value;
            // CASSAFORMA + TECHO LTN-M.O.
            cellValueJ10 = worksheet.getCell('J10').value;
            cellValueJ11 = worksheet.getCell('J11').value;
            cellValueJ12 = worksheet.getCell('J12').value;
            // CASSAFORMA + TECHO LTN-TERMINACIONES
            cellValueK10 = worksheet.getCell('K10').value;
            cellValueK11 = worksheet.getCell('K11').value;
            cellValueK12 = worksheet.getCell('K12').value;
            //CASSAFORMA DOS PLANTAS + LTN-TOTAL
            cellValueH16 = worksheet.getCell('H16').value;
            cellValueH17 = worksheet.getCell('H17').value;
            cellValueH18 = worksheet.getCell('H18').value;
            // CASSAFORMA DOS PLANTAS + LTN-MATERIALES
            cellValueI16 = worksheet.getCell('I16').value;
            cellValueI17 = worksheet.getCell('I17').value;
            cellValueI18 = worksheet.getCell('I18').value;
            // CASSAFORMA DOS PLANTAS + LTN-M.O.
            cellValueJ16 = worksheet.getCell('J16').value;
            cellValueJ17 = worksheet.getCell('J17').value;
            cellValueJ18 = worksheet.getCell('J18').value;
            // CASSAFORMA DOS PLANTAS + LTN-TERMINACIONES
            cellValueK16 = worksheet.getCell('K16').value;
            cellValueK17 = worksheet.getCell('K17').value;
            cellValueK18 = worksheet.getCell('K18').value;
            // CASSASIP-TOTAL
            cellValueH22 = worksheet.getCell('H22').value;
            cellValueH23 = worksheet.getCell('H23').value;
            cellValueH24 = worksheet.getCell('H24').value;
            // CASSASIP-MATERIALES
            cellValueI22 = worksheet.getCell('I22').value;
            cellValueI23 = worksheet.getCell('I23').value;
            cellValueI24 = worksheet.getCell('I24').value;
            // CASSASIP-M.O.
            cellValueJ22 = worksheet.getCell('J22').value;
            cellValueJ23 = worksheet.getCell('J23').value;
            cellValueJ24 = worksheet.getCell('J24').value;
            // CASSASIP-TERMINACIONES
            cellValueK22 = worksheet.getCell('K22').value;
            cellValueK23 = worksheet.getCell('K23').value;
            cellValueK24 = worksheet.getCell('K24').value;
            // SEELFRAMING-TOTAL
            cellValueH28 = worksheet.getCell('H28').value;
            cellValueH29 = worksheet.getCell('H29').value;
            cellValueH30 = worksheet.getCell('H30').value;
            // SEELFRAMING-MATERIALES
            cellValueI28 = worksheet.getCell('I28').value;
            cellValueI29 = worksheet.getCell('I29').value;
            cellValueI30 = worksheet.getCell('I30').value;
            // SEELFRAMING-M.O.
            cellValueJ28 = worksheet.getCell('J28').value;
            cellValueJ29 = worksheet.getCell('J29').value;
            cellValueJ30 = worksheet.getCell('J30').value;
            // SEELFRAMING-TERMINACIONES
            cellValueK28 = worksheet.getCell('K28').value;
            cellValueK29 = worksheet.getCell('K29').value;
            cellValueK30 = worksheet.getCell('K30').value;
            // LADRILLO-TOTAL
            cellValueH34 = worksheet.getCell('H34').value;
            cellValueH35 = worksheet.getCell('H35').value;
            cellValueH36 = worksheet.getCell('H36').value;
            // LADRILLO-MATERIALES
            cellValueI34 = worksheet.getCell('I34').value;
            cellValueI35 = worksheet.getCell('I35').value;
            cellValueI36 = worksheet.getCell('I36').value;
            // LADRILLO-M.O.
            cellValueJ34 = worksheet.getCell('J34').value;
            cellValueJ35 = worksheet.getCell('J35').value;
            cellValueJ36 = worksheet.getCell('J36').value;
            // LADRILLO-TERMINACIONES
            cellValueK34 = worksheet.getCell('K34').value;
            cellValueK35 = worksheet.getCell('K35').value;
            cellValueK36 = worksheet.getCell('K36').value;
        }

        return NextResponse.json({
            cellValueH4,
            cellValueH5,
            cellValueH6,
            cellValueI4,
            cellValueI5,
            cellValueI6,
            cellValueJ4,
            cellValueJ5,
            cellValueJ6,
            cellValueK4,
            cellValueK5,
            cellValueK6,
            cellValueH10,
            cellValueH11,
            cellValueH12,
            cellValueI10,
            cellValueI11,
            cellValueI12,
            cellValueJ10,
            cellValueJ11,
            cellValueJ12,
            cellValueK10,
            cellValueK11,
            cellValueK12,
            cellValueH16,
            cellValueH17,
            cellValueH18,
            cellValueI16,
            cellValueI17,
            cellValueI18,
            cellValueJ16,
            cellValueJ17,
            cellValueJ18,
            cellValueK16,
            cellValueK17,
            cellValueK18,
            cellValueH22,
            cellValueH23,
            cellValueH24,
            cellValueI22,
            cellValueI23,
            cellValueI24,
            cellValueJ22,
            cellValueJ23,
            cellValueJ24,
            cellValueK22,
            cellValueK23,
            cellValueK24,
            cellValueH28,
            cellValueH29,
            cellValueH30,
            cellValueI28,
            cellValueI29,
            cellValueI30,
            cellValueJ28,
            cellValueJ29,
            cellValueJ30,
            cellValueK28,
            cellValueK29,
            cellValueK30,
            cellValueH34,
            cellValueH35,
            cellValueH36,
            cellValueI34,
            cellValueI35,
            cellValueI36,
            cellValueJ34,
            cellValueJ35,
            cellValueJ36,
            cellValueK34,
            cellValueK35,
            cellValueK36,
        });
    } catch (error: any) {
        return NextResponse.json({ message: "Ocurrió un error", error: error.message });
    }
}
