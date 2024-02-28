import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import AWS from "aws-sdk"
import getLastJsonFile from '@/lib/json/getLastJsonFile';
import readJsonFromS3 from '@/lib/xlsx/readJsonFromS3';


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

AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_S3_REGION,
});

const s3 = new AWS.S3();

export async function GET(req: NextRequest) {

    const session = await auth()

    try {

        const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!;

        const userFolder = `${session?.user?.email}`;

        const lastModifiedFileName = await getLastJsonFile(bucketName, userFolder);

        if (!lastModifiedFileName) {
            return NextResponse.json({ message: "No se encontró ningún archivo en el bucket de S3" });
        }

        const jsonData = await readJsonFromS3(bucketName, lastModifiedFileName);


        return NextResponse.json({ jsonData })

    } catch (error: any) {
        return NextResponse.json({ message: "Ocurrió un error", error: error.message });
    }
}
