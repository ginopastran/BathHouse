import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { auth } from '@/auth';
import AWS from "aws-sdk"
import * as fs from 'fs';
import os from 'os';
import { google } from "googleapis"


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
    region: "sa-east-1",
});

const s3 = new AWS.S3();

export async function POST(req: NextRequest) {
    const session = await auth();
    try {
        const data = await req.json();

        const jsonData = JSON.stringify(data);
        const jsonFileName = `${session?.user?.email}.json`;
        const jsonBuffer = Buffer.from(jsonData, 'utf-8');

        console.log(data);

        // console.log(jsonData);

        try {
            const params = {
                Bucket: 'bathouse-excel-test',
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

        return NextResponse.json({ jsonFileName: jsonFileName });
    } catch (error: any) {
        return NextResponse.json({ message: "An error ocurred", error: error.message }, { headers: corsHeaders });
    }
}