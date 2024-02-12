import AWS from 'aws-sdk';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { google } from 'googleapis';
import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import readExcelFromS3 from '@/lib/s3';

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

        console.log(data);

        const fileName = `${session?.user?.email}.xlsx`;
        const bucketName = "bathouse-excel-test";


        // Descargar el archivo de S3
        const fileContent = await readExcelFromS3(bucketName, fileName);
        if (!fileContent) {
            console.error('No se pudo leer el archivo desde S3.');
            return;
        }

        // leer y actualizar el archivo Excel 

        // Subir el archivo actualizado de nuevo a S3
        const uploadParams = {
            Bucket: 'my-bucket',
            Key: fileName,
            Body: fileContent
        };

        s3.upload(uploadParams, function (err: Error, data: AWS.S3.ManagedUpload.SendData) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
        });

        return NextResponse.json({ fileName: fileName });
    } catch (error: any) {
        return NextResponse.json({ message: "An error ocurred", error: error.message }, { headers: corsHeaders });
    }
}