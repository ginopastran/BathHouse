import ExcelJS from 'exceljs';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import AWS from "aws-sdk"
import readExcelFromS3 from '@/lib/xlsx/readExcelFromS3';

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

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

export async function GET(req: NextRequest) {

    const session = await auth()

    const getLastXlsx3File = async (bucketName: string, userFolder: string): Promise<string | undefined> => {
        const params = {
            Bucket: bucketName,
            Prefix: userFolder,
        };

        try {
            const data = await s3.listObjectsV2(params).promise();
            const contents = data.Contents;

            if (!contents || contents.length === 0) {
                return undefined;
            }

            // Filtra los archivos para incluir solo los que terminan en .xlsx
            const xlsx3Files = contents.filter(file => file?.Key?.endsWith('-3.xlsx'));

            if (xlsx3Files.length === 0) {
                return undefined;
            }

            // Ordena los archivos por fecha de última modificación
            xlsx3Files.sort((a, b) => {
                const aTime = a.LastModified ? a.LastModified.getTime() : 0;
                const bTime = b.LastModified ? b.LastModified.getTime() : 0;
                return bTime - aTime;
            });

            // Devuelve el nombre del archivo 2.xlsx más reciente
            return xlsx3Files[0].Key;
        } catch (error) {
            console.error("Error al listar los archivos desde S3:", error);
            return undefined;
        }
    }

    try {
        const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!;
        const userFolder = `${session?.user?.email}`;
        const lastModifiedFileName = await getLastXlsx3File(bucketName, userFolder);

        if (!lastModifiedFileName) {
            return NextResponse.json({ message: "No se encontró ningún archivo en el bucket de S3" });
        }

        const excelData = await readExcelFromS3(bucketName, lastModifiedFileName);

        if (!excelData) {
            return NextResponse.json({ message: "No se pudo leer el archivo Excel desde S3" });
        }

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(excelData);

        const worksheet = workbook.getWorksheet('VIP');

        if (!worksheet) {
            return NextResponse.json({ message: "No se encontró la hoja de trabajo 'VIP'" });
        }

        // Crear un nuevo libro de trabajo y agregar una nueva hoja de trabajo
        const newWorkbook = new ExcelJS.Workbook();
        const newWorksheet = newWorkbook.addWorksheet('VIP');

        // Copiar las filas de la hoja de trabajo original a la nueva hoja de trabajo
        worksheet.eachRow((row, rowNumber) => {
            newWorksheet.addRow(row.values);
        });

        // Convertir el nuevo libro de trabajo a un array de bytes
        const buffer = await newWorkbook.xlsx.writeBuffer();

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename=VIP.xlsx`
            }
        });
    } catch (error: any) {
        return NextResponse.json({ message: "Ocurrió un error", error: error.message });
    }
}