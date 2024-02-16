import AWS from 'aws-sdk';
import ExcelJS from 'exceljs';
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
                        [jsonData["superficie-p-rgolas-cochera-semi-cubierta-p-rgola"]],
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
                        [jsonData["vereda-peatonal-paralela-calle"]],
                        [data["cierre-provisorio"]], // B60
                        [data["cierre-definitivo"]],
                        [jsonData["churrasquera-de-ladrillo-y-o-hogar"]],
                        [jsonData["pileta"]], //ACA DEBERIA IR EL DATO DE PILETA ? B63
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




export async function GET(req: NextRequest) {

    const session = await auth()

    try {

        const fileNameGlobal = `${session?.user?.email}2.xlsx`;
        const bucketName = "bathouse-excel-test";

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
