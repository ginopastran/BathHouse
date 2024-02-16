import path from 'path';
import AWS from "aws-sdk"
import * as fs from 'fs';
import os from 'os';
import { google } from "googleapis"

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

export async function exportAndUploadToS3(jwtClient: any, spreadsheetId: string | undefined, fileName: string) {
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

        const filePath = path.join(tmpDir, fileName);
        const dest = fs.createWriteStream(filePath);

        await new Promise<void>((resolve, reject) => {
            responseDrive.data
                .on('end', () => {
                    console.log('Archivo descargado exitosamente.');

                    const fileContent = fs.readFileSync(filePath);

                    const params = {
                        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
                        Key: fileName,
                        Body: fileContent
                    };

                    s3.upload(params, function (err: Error, data: AWS.S3.ManagedUpload.SendData) {
                        if (err) {
                            reject(err);
                        }
                        console.log(`File uploaded successfully. ${data.Location}`);
                        fs.unlinkSync(filePath);
                        console.log(`Archivo eliminado exitosamente: ${filePath}`);
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