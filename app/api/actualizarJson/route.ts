import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { auth } from '@/auth';
import AWS from "aws-sdk"
import * as fs from 'fs';
import os from 'os';
import { google } from "googleapis"
import { exportAndUploadJson } from '@/lib/json/exportAndUploadJson';


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

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

export async function POST(req: NextRequest) {
    const session = await auth();
    try {
        const data = await req.json();

        data.fecha = new Date().toISOString();

        const jsonData = JSON.stringify(data);
        const jsonFileName = `${session?.user?.email}/` + `${data["nombre-obra"]}.json`;
        const jsonBuffer = Buffer.from(jsonData, 'utf-8');

        console.log(data);

        try {
            await exportAndUploadJson(jsonFileName, jsonBuffer)
        } catch (error) {
            console.log(error);
        }
        // console.log(jsonData);
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


        return NextResponse.json({ jsonFileName: jsonFileName });
    } catch (error: any) {
        return NextResponse.json({ message: "An error ocurred", error: error.message }, { headers: corsHeaders });
    }
}
