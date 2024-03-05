import path from 'path';
import AWS from "aws-sdk"
import * as fs from 'fs';
import os from 'os';
import { google } from "googleapis"
import { auth } from '@/auth';

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


export async function exportAndUploadJson(jsonFileName: string, jsonBuffer: any) {

    const session = await auth()
    if (!session?.user?.email) {
        throw new Error('El correo electrónico del usuario no está definido');
    }

    try {
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

    } catch (error) {
        console.log(error);
    }

}