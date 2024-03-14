import path from 'path';
import AWS from "aws-sdk"
import * as fs from 'fs';
import os from 'os';
import { google } from "googleapis"
import { auth } from '@/auth';
import xlsx from 'xlsx';

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

const jwtClient = new google.auth.JWT(
    clientEmail,
    undefined,
    privateKey.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
);

export async function exportAndUploadVIPToS3(jwtClient: any, spreadsheetId: string | undefined, originalFileName: string, data: any) {
    try {
        const session = await auth()
        if (!session?.user?.email) {
            throw new Error('El correo electrónico del usuario no está definido');
        }

        const drive = google.drive({ version: 'v3', auth: jwtClient });
        const responseDrive = await drive.files.export({
            fileId: spreadsheetId,
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }, { responseType: 'stream' });

        const tmpDir = path.join(os.tmpdir(), 'myapp');
        const userDir = path.join(tmpDir, session.user.email);
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }

        const filePath = path.join(userDir, `${data["nombre-completo"]}.xlsx`);
        const dest = fs.createWriteStream(filePath);

        await new Promise<void>((resolve, reject) => {
            responseDrive.data
                .on('end', () => {
                    console.log('Archivo descargado exitosamente.');

                    // Leer el archivo Excel descargado con xlsx
                    const workbook = xlsx.readFile(filePath);

                    // Eliminar todas las hojas excepto la hoja "VIP"
                    workbook.SheetNames.forEach(sheetName => {
                        if (sheetName !== 'VIP') {
                            delete workbook.Sheets[sheetName];
                        }
                    });

                    // Guardar el archivo modificado
                    const modifiedFilePath = path.join(userDir, `VIP_${data["nombre-completo"]}.xlsx`);
                    xlsx.writeFile(workbook, modifiedFilePath);

                    // Subir el archivo modificado a S3
                    const fileContent = fs.readFileSync(modifiedFilePath);
                    const params = {
                        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
                        Key: originalFileName.replace('.xlsx', `_VIP.xlsx`), // Cambia el nombre del archivo original
                        Body: fileContent
                    };

                    s3.upload(params, function (err: Error, data: AWS.S3.ManagedUpload.SendData) {
                        if (err) {
                            reject(err);
                        }
                        console.log(`Archivo VIP subido exitosamente a S3. ${data.Location}`);
                        fs.unlinkSync(modifiedFilePath);
                        console.log(`Archivo VIP eliminado exitosamente: ${modifiedFilePath}`);
                    });

                    // Subir el archivo original a S3
                    const originalFileContent = fs.readFileSync(filePath);
                    const originalParams = {
                        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
                        Key: originalFileName,
                        Body: originalFileContent
                    };

                    s3.upload(originalParams, function (err: Error, data: AWS.S3.ManagedUpload.SendData) {
                        if (err) {
                            reject(err);
                        }
                        console.log(`Archivo original subido exitosamente a S3. ${data.Location}`);
                        fs.unlinkSync(filePath);
                        console.log(`Archivo original eliminado exitosamente: ${filePath}`);
                        resolve();
                    });
                })
                .on('error', (err) => {
                    console.error('Error durante la descarga:', err);
                    reject(err);
                })
                .pipe(dest);
        });
    } catch (error) {
        console.log('Error al exportar el archivo de Google Sheets:', error);
        throw error;
    }
}