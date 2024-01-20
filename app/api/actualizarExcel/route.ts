import ExcelJS from 'exceljs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { Stream } from 'stream';
import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const resend = new Resend(process.env.RESEND_API_KEY);
let fileNameGlobal = '';

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}


export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        console.log(data);

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const fileName = `${data["nombre-completo"]}-${formattedDate}.xlsx`;
        const filePath = path.resolve(`./public/${fileName}`);

        const workbook = new ExcelJS.Workbook();

        const originalFilePath = path.resolve('./public/BATHOUSE-Enero-2024.xlsx');
        await workbook.xlsx.readFile(originalFilePath);

        const worksheet = workbook.getWorksheet('Informacion de Cotización');

        if (worksheet) {
            worksheet.getCell('B2').value = data["nombre-completo"];
            worksheet.getCell('B3').value = data["ubicacion"];
            worksheet.getCell('B9').value = data["metros-cuadrados-de-planta-baja"];
            worksheet.getCell('B10').value = data["metros-cuadrados-de-planta-alta"];
            worksheet.getCell('B11').value = data["superficie-p-rgolas-cubiertas-techado"];
            worksheet.getCell('B12').value = data["superficie-p-rgolas-semi-cubierta-p-rgola"];
            worksheet.getCell('B14').value = data["superficie-cochera-semi-cubierta-p-rgola"];
            worksheet.getCell('B23').value = data["altura-de-muro-planta-baja"];
            worksheet.getCell('B24').value = data["altura-de-muro-planta-alta"];
            worksheet.getCell('B25').value = data["tabique-durlock-pb-pa"];
            worksheet.getCell('B28').value = data["churrasquera"];
            worksheet.getCell('B35').value = data["cant-banos"];
            worksheet.getCell('B41').value = data["aires-acondicionados"];
            worksheet.getCell('B43').value = data["pozo-filtrante"];
            worksheet.getCell('B44').value = data["cisterna-enterrada"];
            worksheet.getCell('B45').value = data["con-pluviales"];
            worksheet.getCell('B46').value = data["agua"];
            worksheet.getCell('B47').value = data["cloaca"];
            worksheet.getCell('B48').value = data["gas"];
            worksheet.getCell('B49').value = data["luz"];
            worksheet.getCell('B50').value = data["pozo-filtrante-bool"];
            worksheet.getCell('B51').value = data["losa-radiante-electrica"];
            worksheet.getCell('B52').value = data["losa-radiante-de-agua"];
            worksheet.getCell('B53').value = data["molduras-de-cumbrera"];
            worksheet.getCell('B54').value = data["moldura-de-ventanas"];
            worksheet.getCell('B55').value = data["cielorraso-de-placa-de-yeso"];
            worksheet.getCell('B56').value = data["cielorraso-de-yeso"];
            worksheet.getCell('B57').value = data["porcelanato"];
            worksheet.getCell('B58').value = data["rayado-o-fino-de-muros"];
            worksheet.getCell('B59').value = data["vereda-vehiculo"];
            worksheet.getCell('B63').value = data["churrasquera-de-ladrillo-y-o-hogar"];
            worksheet.getCell('B61').value = data["cierre-provisorio"];
            worksheet.getCell('B65').value = data["cuenta-con-arquitecto"];
            worksheet.getCell('B66').value = data["cuenta-con-proyecto"];

            await workbook.xlsx.writeFile(filePath);
        }

        // const excelBuffer = await fs.promises.readFile(filePath);

        // const emailOptions = {
        //     from: 'Acme <onboarding@resend.dev>',
        //     to: ['ginopastran@gmail.com'],
        //     subject: 'Hello world',
        //     react: EmailTemplate({ firstName: data["nombre-completo"] }),
        //     text: 'Please find the attached Excel file.',
        //     attachments: [
        //         {
        //             filename: 'BATHOUSE-Enero-2024.xlsx',
        //             content: excelBuffer,
        //             encoding: 'base64',
        //         },
        //     ],
        // };

        // const emailData = await resend.emails.send(emailOptions);

        fileNameGlobal = fileName;

        return NextResponse.json({ fileName: fileName });
    } catch (error: any) {
        return NextResponse.json({ message: "An error ocurred", error: error.message }, { headers: corsHeaders });
    }
}

const pipeline = promisify(Stream.pipeline);

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
    try {
        const filePath = path.resolve(`./public/${fileNameGlobal}`);

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        const worksheet = workbook.getWorksheet('Informacion de Cotización');

        let cellValueH26, cellValueH27;
        if (worksheet) {
            cellValueH26 = worksheet.getCell('H26').value;
            cellValueH27 = worksheet.getCell('H27').value;
        }

        return NextResponse.json({ cellValueH26: cellValueH26, cellValueH27: cellValueH27 });
    } catch (error: any) {
        return NextResponse.json({ message: "Ocurrió un error", error: error.message });
    }
}
