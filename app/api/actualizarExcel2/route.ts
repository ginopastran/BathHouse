import AWS from 'aws-sdk';
import ExcelJS from 'exceljs';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { google } from 'googleapis';
import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import readExcelFromS3 from '@/lib/xlsx/readExcelFromS3';
import readJsonFromS3 from '@/lib/xlsx/readJsonFromS3';
import { exportAndUploadToS3 } from '@/lib/exportAndUploadToS3';
import getLastJsonFile from '@/lib/json/getLastJsonFile';
import getLastXlsx2File from '@/lib/xlsx/getLastXlsx2File';

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
    region: process.env.NEXT_PUBLIC_S3_REGION,
});

const s3 = new AWS.S3();

const privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || '';

export async function POST(req: NextRequest) {
    const session = await auth();
    try {
        const data = await req.json();
        const userFolder = `${session?.user?.email}`;

        const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!
        const jsonFileName = await getLastJsonFile(bucketName, userFolder)

        if (!jsonFileName) {
            return NextResponse.json({ message: "No se encontró ningún archivo en el bucket de S3" });
        }

        const jsonData = await readJsonFromS3(bucketName, jsonFileName);

        console.log(jsonData);

        console.log(data);

        const fileName = `${session?.user?.email}.xlsx`;
        const fileName2 = `${session?.user?.email}/` + `${data["nombre-obra"]}.xlsx`;

        const jwtClient = new google.auth.JWT(
            clientEmail,
            undefined,
            privateKey.replace(/\\n/g, '\n'),
            ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
        );

        const sheets = google.sheets({ version: 'v4', auth: jwtClient });

        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        const range = 'Informacion de Cotización!B2:B73';

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
                        [jsonData["nombre-obra"]], // B3
                        [jsonData["ubicacion"]], // B4
                        [""], [""], [""],
                        [data["perimetro-lote"]], //B8
                        [data["frente-lote"]],
                        [jsonData["metros-cuadrados-de-planta-baja"]], // B10
                        [jsonData["metros-cuadrados-de-planta-alta"]],
                        [jsonData["superficie-p-rgolas-cubiertas-techado"]],
                        [jsonData["superficie-p-rgolas-semi-cubierta-p-rgola"]],
                        [jsonData["superficie-p-rgolas-semi-cochera-cubierta-p-rgola"]],
                        [jsonData["sup-aleros"]],
                        ["=+B9+B10+B11+B12+B13+B14"],
                        ["=B9+B10+B11+B12/2+B13/2+B14/2"], // B17
                        [""], [""],
                        [jsonData["pb-muros-pb-perimetro"]],
                        [jsonData["pb-muros-pb-interiores-churrasquera-otros"]],
                        [jsonData["pa-muros-pa-perimetro"]],
                        [jsonData["pa-muros-pa-interiores"]],
                        [jsonData["altura-de-muro-planta-baja"]],
                        [jsonData["altura-de-muro-planta-alta"]], //B25
                        [data["tabique-durlock-pb-pa"]], //B26
                        [data["balcon-porcelanato"]],
                        [data["hormigon-visto"]],
                        [data["cantidad-encuentros-PB"]],
                        [data["cantidad-encuentros-PA"]],
                        [data["espesor-muro-SIP"]],
                        [data["tipo-techo"]], //B32
                        [""],
                        [data["puerta-principal-cantidad"]], // B34
                        [data["puerta-interior"]],
                        [data["ventana-habitacion"]],
                        [data["puerta-ventana-habitacion"]],
                        [data["ventana-bano"]],
                        [data["puerta-ventana-living"]],
                        [data["puerta-lavanderia"]],
                        [data["vidrio-simple-dvh"]], // B41
                        [""],
                        [data["bocas-electricas"]],
                        [""],
                        [data["con-cocina"]],
                        [data["con-lavanderia"]],
                        [data["banos-visita"]],
                        [data["banos"]],
                        [data["aires-acondicionados"]],
                        [data["churrasquera"]], //B50
                        [""],
                        [data["pozo-septico"]], //B52
                        [data["cisterna-enterrada"]],
                        [data["con-pluviales"]],
                        [data["agua"]],
                        [data["cloaca"]],
                        [data["gas"]],
                        [data["luz"]],
                        [data["pozo-filtrante"]],
                        [data["tipo-calefaccion"]],
                        [data["molduras-de-cumbrera"]],
                        [data["moldura-de-ventanas"]],
                        [data["tipo-cielorraso"]],
                        [data["porcelanato"]],
                        [data["rayado-o-fino-de-muros"]],
                        [data["vereda-vehiculo"]],
                        [data["vereda-peatonal-PAR-calle"]],
                        [data["cierre-provisorio"]],
                        [data["cierre-definitivo"]],
                        [data["churrasquera-de-ladrillo-y-o-hogar"]],
                        [data["pileta"]],
                        [data["cuenta-con-proyecto"]],
                        [data["pago-aforos"]], // B73
                    ],
                },
            });

            await exportAndUploadToS3(jwtClient, spreadsheetId, fileName2, data);
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
        const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!;

        const userFolder = `${session?.user?.email}`;

        const lastModifiedFileName = await getLastXlsx2File(bucketName, userFolder);

        if (!lastModifiedFileName) {
            return NextResponse.json({ message: "No se encontró ningún archivo en el bucket de S3" });
        }

        const excelData = await readExcelFromS3(bucketName, lastModifiedFileName);

        if (!excelData) {
            return NextResponse.json({ message: "No se pudo leer el archivo Excel desde S3" });
        }

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(excelData);

        const worksheet = workbook.getWorksheet('Informacion de Cotización');

        if (!worksheet) {
            return NextResponse.json({ message: "No se encontró la hoja de trabajo 'Informacion de Cotización'" });
        }


        //CASSAFORMA PURO
        let cellValueI5, cellValueI6, cellValueI7
        let cellValueK5, cellValueK6, cellValueK7
        let cellValueL5, cellValueL6, cellValueL7
        let cellValueM5, cellValueM6, cellValueM7
        let cellValueN5, cellValueN6, cellValueN7
        //CASSAFORMA + TECHO LTN
        let cellValueI11, cellValueI12, cellValueI13
        let cellValueK11, cellValueK12, cellValueK13
        let cellValueL11, cellValueL12, cellValueL13
        let cellValueM11, cellValueM12, cellValueM13
        let cellValueN11, cellValueN12, cellValueN13
        //CASSAFORMA + TECHO LTN (DOS PLANTAS)
        let cellValueI17, cellValueI18, cellValueI19
        let cellValueK17, cellValueK18, cellValueK19
        let cellValueL17, cellValueL18, cellValueL19
        let cellValueM17, cellValueM18, cellValueM19
        let cellValueN17, cellValueN18, cellValueN19
        //CASSASIP (UNA PLANTA)
        let cellValueI23, cellValueI24, cellValueI25
        let cellValueK23, cellValueK24, cellValueK25
        let cellValueL23, cellValueL24, cellValueL25
        let cellValueM23, cellValueM24, cellValueM25
        let cellValueN23, cellValueN24, cellValueN25

        //CASSASIP (DOS PLANTAS)
        let cellValueI29, cellValueI30, cellValueI31
        let cellValueK29, cellValueK30, cellValueK31
        let cellValueL29, cellValueL30, cellValueL31
        let cellValueM29, cellValueM30, cellValueM31
        let cellValueN29, cellValueN30, cellValueN31

        //SEEL FRAMING 
        let cellValueI35, cellValueI36, cellValueI37
        let cellValueK35, cellValueK36, cellValueK37
        let cellValueL35, cellValueL36, cellValueL37
        let cellValueM35, cellValueM36, cellValueM37
        let cellValueN35, cellValueN36, cellValueN37

        //LADRILLO  
        let cellValueI41, cellValueI42, cellValueI43
        let cellValueK41, cellValueK42, cellValueK43
        let cellValueL41, cellValueL42, cellValueL43
        let cellValueM41, cellValueM42, cellValueM43
        let cellValueN41, cellValueN42, cellValueN43

        if (worksheet) {
            // CASSAFORMA-TOTAL
            cellValueI5 = worksheet.getCell('I5').value
            cellValueI6 = worksheet.getCell('I6').value;
            cellValueI7 = worksheet.getCell('I7').value;
            // CASSAFORMA-MATERIALES
            cellValueK5 = worksheet.getCell('K5').value;
            cellValueK6 = worksheet.getCell('K6').value;
            cellValueK7 = worksheet.getCell('K7').value;
            // CASSAFORMA-SERVICIOS
            cellValueL5 = worksheet.getCell('L5').value;
            cellValueL6 = worksheet.getCell('L6').value;
            cellValueL7 = worksheet.getCell('L7').value;
            // CASSAFORMA-M.O.
            cellValueM5 = worksheet.getCell('M5').value;
            cellValueM6 = worksheet.getCell('M6').value;
            cellValueM7 = worksheet.getCell('M7').value;
            // CASSAFORMA-TERMINACIONES
            cellValueN5 = worksheet.getCell('N5').value;
            cellValueN6 = worksheet.getCell('N6').value;
            cellValueN7 = worksheet.getCell('N7').value;

            // CASSAFORMA + TECHO LTN-TOTAL
            cellValueI11 = worksheet.getCell('I11').value;
            cellValueI12 = worksheet.getCell('I12').value;
            cellValueI13 = worksheet.getCell('I13').value;
            // CASSAFORMA + TECHO LTN-MATERIALES
            cellValueK11 = worksheet.getCell('K11').value;
            cellValueK12 = worksheet.getCell('K12').value;
            cellValueK13 = worksheet.getCell('K13').value;
            // CASSAFORMA + TECHO LTN SERVICIOS
            cellValueL11 = worksheet.getCell('L11').value;
            cellValueL12 = worksheet.getCell('L12').value;
            cellValueL13 = worksheet.getCell('L13').value;
            // CASSAFORMA + TECHO LTN-M.O.
            cellValueM11 = worksheet.getCell('M11').value;
            cellValueM12 = worksheet.getCell('M12').value;
            cellValueM13 = worksheet.getCell('M13').value;
            // CASSAFORMA + TECHO LTN-TERMINACIONES
            cellValueN11 = worksheet.getCell('N11').value;
            cellValueN12 = worksheet.getCell('N12').value;
            cellValueN13 = worksheet.getCell('N13').value;

            // CASSAFORMA + LTN (DOS PLANTAS) TOTAL
            cellValueI17 = worksheet.getCell('I17').value;
            cellValueI18 = worksheet.getCell('I18').value;
            cellValueI19 = worksheet.getCell('I19').value;
            // CASSAFORMA + LTN (DOS PLANTAS) MATERIALES
            cellValueK17 = worksheet.getCell('K17').value;
            cellValueK18 = worksheet.getCell('K18').value;
            cellValueK19 = worksheet.getCell('K19').value;
            // CASSAFORMA + LTN (DOS PLANTAS) SERVICIOS
            cellValueL17 = worksheet.getCell('L17').value;
            cellValueL18 = worksheet.getCell('L18').value;
            cellValueL19 = worksheet.getCell('L19').value;
            // CASSAFORMA + LTN (DOS PLANTAS) M.O.
            cellValueM17 = worksheet.getCell('M17').value;
            cellValueM18 = worksheet.getCell('M18').value;
            cellValueM19 = worksheet.getCell('M19').value;
            // CASSAFORMA + LTN (DOS PLANTAS) TERMINACIONES
            cellValueN17 = worksheet.getCell('N17').value;
            cellValueN18 = worksheet.getCell('N18').value;
            cellValueN19 = worksheet.getCell('N19').value;

            // CASSASIP (UNA PLANTA) TOTAL
            cellValueI23 = worksheet.getCell('I23').value;
            cellValueI24 = worksheet.getCell('I24').value;
            cellValueI25 = worksheet.getCell('I25').value;
            // CASSASIP (UNA PLANTA) MATERIALES
            cellValueK23 = worksheet.getCell('K23').value;
            cellValueK24 = worksheet.getCell('K24').value;
            cellValueK25 = worksheet.getCell('K25').value;
            // CASSASIP (UNA PLANTA) SERVICIOS
            cellValueL23 = worksheet.getCell('L23').value;
            cellValueL24 = worksheet.getCell('L24').value;
            cellValueL25 = worksheet.getCell('L25').value;
            // CASSASIP (UNA PLANTA) M.O.
            cellValueM23 = worksheet.getCell('M23').value;
            cellValueM24 = worksheet.getCell('M24').value;
            cellValueM25 = worksheet.getCell('M25').value;
            // CASSASIP (UNA PLANTA) TERMINACIONES
            cellValueN23 = worksheet.getCell('N23').value;
            cellValueN24 = worksheet.getCell('N24').value;
            cellValueN25 = worksheet.getCell('N25').value;

            // CASSASIP (DOS PLANTAS) TOTAL
            cellValueI29 = worksheet.getCell('H22').value;
            cellValueI30 = worksheet.getCell('H23').value;
            cellValueI31 = worksheet.getCell('H24').value;
            // CASSASIP (DOS PLANTAS) MATERIALES
            cellValueK29 = worksheet.getCell('K29').value;
            cellValueK30 = worksheet.getCell('K30').value;
            cellValueK31 = worksheet.getCell('K31').value;
            // CASSASIP (DOS PLANTAS) SERVICIOS
            cellValueL29 = worksheet.getCell('L29').value;
            cellValueL30 = worksheet.getCell('L30').value;
            cellValueL31 = worksheet.getCell('L31').value;
            // CASSASIP (DOS PLANTAS) M.O.
            cellValueM29 = worksheet.getCell('M29').value;
            cellValueM30 = worksheet.getCell('M30').value;
            cellValueM31 = worksheet.getCell('M31').value;
            // CASSASIP (DOS PLANTAS) TERMINACIONES
            cellValueN29 = worksheet.getCell('N29').value;
            cellValueN30 = worksheet.getCell('N30').value;
            cellValueN31 = worksheet.getCell('N31').value;

            // SEELFRAMING TOTAL
            cellValueI35 = worksheet.getCell('I35').value;
            cellValueI36 = worksheet.getCell('I36').value;
            cellValueI37 = worksheet.getCell('I37').value;
            // SEELFRAMING MATERIALES
            cellValueK35 = worksheet.getCell('K35').value;
            cellValueK36 = worksheet.getCell('K36').value;
            cellValueK37 = worksheet.getCell('K37').value;
            // SEELFRAMING SERVICIOS
            cellValueL35 = worksheet.getCell('L35').value;
            cellValueL36 = worksheet.getCell('L36').value;
            cellValueL37 = worksheet.getCell('L37').value;
            // SEELFRAMING M.O.
            cellValueM35 = worksheet.getCell('M35').value;
            cellValueM36 = worksheet.getCell('M36').value;
            cellValueM37 = worksheet.getCell('M37').value;
            // SEELFRAMING TERMINACIONES
            cellValueN35 = worksheet.getCell('N35').value;
            cellValueN36 = worksheet.getCell('N36').value;
            cellValueN37 = worksheet.getCell('N37').value;

            // LADRILLO TOTAL
            cellValueI41 = worksheet.getCell('I41').value;
            cellValueI42 = worksheet.getCell('I42').value;
            cellValueI43 = worksheet.getCell('I43').value;
            // LADRILLO MATERIALES
            cellValueK41 = worksheet.getCell('K41').value;
            cellValueK42 = worksheet.getCell('K42').value;
            cellValueK43 = worksheet.getCell('K43').value;
            // LADRILLO SERVICIOS
            cellValueL41 = worksheet.getCell('L41').value;
            cellValueL42 = worksheet.getCell('L42').value;
            cellValueL43 = worksheet.getCell('L43').value;
            // LADRILLO M.O.
            cellValueM41 = worksheet.getCell('M41').value;
            cellValueM42 = worksheet.getCell('M42').value;
            cellValueM43 = worksheet.getCell('M43').value;
            // LADRILLO TERMINACIONES
            cellValueN41 = worksheet.getCell('N41').value;
            cellValueN42 = worksheet.getCell('N42').value;
            cellValueN43 = worksheet.getCell('N43').value;
        }

        return NextResponse.json({
            cellValueI5, cellValueI6, cellValueI7,
            cellValueK5, cellValueK6, cellValueK7,
            cellValueL5, cellValueL6, cellValueL7,
            cellValueM5, cellValueM6, cellValueM7,
            cellValueN5, cellValueN6, cellValueN7,

            cellValueI11, cellValueI12, cellValueI13,
            cellValueK11, cellValueK12, cellValueK13,
            cellValueL11, cellValueL12, cellValueL13,
            cellValueM11, cellValueM12, cellValueM13,
            cellValueN11, cellValueN12, cellValueN13,

            cellValueI17, cellValueI18, cellValueI19,
            cellValueK17, cellValueK18, cellValueK19,
            cellValueL17, cellValueL18, cellValueL19,
            cellValueM17, cellValueM18, cellValueM19,
            cellValueN17, cellValueN18, cellValueN19,

            cellValueI23, cellValueI24, cellValueI25,
            cellValueK23, cellValueK24, cellValueK25,
            cellValueL23, cellValueL24, cellValueL25,
            cellValueM23, cellValueM24, cellValueM25,
            cellValueN23, cellValueN24, cellValueN25,

            cellValueI29, cellValueI30, cellValueI31,
            cellValueK29, cellValueK30, cellValueK31,
            cellValueL29, cellValueL30, cellValueL31,
            cellValueM29, cellValueM30, cellValueM31,
            cellValueN29, cellValueN30, cellValueN31,

            cellValueI35, cellValueI36, cellValueI37,
            cellValueK35, cellValueK36, cellValueK37,
            cellValueL35, cellValueL36, cellValueL37,
            cellValueM35, cellValueM36, cellValueM37,
            cellValueN35, cellValueN36, cellValueN37,

            cellValueI41, cellValueI42, cellValueI43,
            cellValueK41, cellValueK42, cellValueK43,
            cellValueL41, cellValueL42, cellValueL43,
            cellValueM41, cellValueM42, cellValueM43,
            cellValueN41, cellValueN42, cellValueN43,
        });
    } catch (error: any) {
        return NextResponse.json({ message: "Ocurrió un error", error: error.message });
    }
}
