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

// const resend = new Resend(process.env.RESEND_API_KEY);
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

        const originalFilePath = path.resolve('./public/7-BATHOUSE-Enero-2024.xlsx');
        await workbook.xlsx.readFile(originalFilePath);

        const worksheet = workbook.getWorksheet('Informacion de Cotización');

        if (worksheet) {
            worksheet.getCell('B2').value = data["nombre-completo"];
            worksheet.getCell('B3').value = data["ubicacion"];
            worksheet.getCell('B9').value = data["metros-cuadrados-de-planta-baja"];
            worksheet.getCell('B10').value = data["metros-cuadrados-de-planta-alta"];
            worksheet.getCell('B11').value = data["superficie-p-rgolas-cubiertas-techado"];
            worksheet.getCell('B12').value = data["superficie-p-rgolas-semi-cubierta-p-rgola"];
            worksheet.getCell('B14').value = data["sup-cochera-semi-cubierta"];
            worksheet.getCell('B23').value = data["altura-de-muro-planta-baja"];
            worksheet.getCell('B24').value = data["altura-de-muro-planta-alta"];
            worksheet.getCell('B25').value = data["tabique-durlock-pb-pa"];
            worksheet.getCell('B28').value = data["churrasquera"];
/*          worksheet.getCell('B35').value = data["cant-banos"]; */ 
            worksheet.getCell('B41').value = data["aires-acondicionados"];
            worksheet.getCell('B42').value = data["pozo-septico"];
            worksheet.getCell('B43').value = data["cisterna-enterrada"];
            worksheet.getCell('B44').value = data["con-pluviales"];
            worksheet.getCell('B45').value = data["agua"];
            worksheet.getCell('B46').value = data["cloaca"];
            worksheet.getCell('B47').value = data["gas"];
            worksheet.getCell('B48').value = data["luz"];
            worksheet.getCell('B49').value = data["pozo-filtrante"];
            worksheet.getCell('B50').value = data["losa-radiante-electrica"];
            worksheet.getCell('B51').value = data["losa-radiante-de-agua"];
            worksheet.getCell('B52').value = data["molduras-de-cumbrera"];
            worksheet.getCell('B53').value = data["moldura-de-ventanas"];
            worksheet.getCell('B54').value = data["cielorraso-de-placa-de-yeso"];
            worksheet.getCell('B55').value = data["cielorraso-de-yeso"];
            worksheet.getCell('B56').value = data["porcelanato"];
            worksheet.getCell('B57').value = data["rayado-o-fino-de-muros"];
            worksheet.getCell('B58').value = data["vereda-vehiculo"];
            worksheet.getCell('B59').value = data["vereda-paralela-calle"];
            worksheet.getCell('B62').value = data["churrasquera-de-ladrillo-y-o-hogar"];
            worksheet.getCell('B63').value = data["churrasquera-de-ladrillo-y-o-hogar"];
            /* worksheet.getCell('B61').value = data["cierre-provisorio"]; */
            worksheet.getCell('B64').value = data["cuenta-con-arquitecto"];
            worksheet.getCell('B65').value = data["cuenta-con-proyecto"];

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
            cellValueH4 = worksheet.getCell('H4').value;
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

        const buffer = await fs.promises.readFile(filePath);
        const response = new NextResponse(buffer);

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
