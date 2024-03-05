import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { exportAndUploadJson } from '@/lib/json/exportAndUploadJson';

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
    const session = await auth();
    try {
        const data = await req.json();

        data.fecha = new Date().toISOString();

        const jsonData = JSON.stringify(data);
        const jsonFileName = `${session?.user?.email}/` + `${data["nombre-obra"]}.json`;
        const jsonBuffer = Buffer.from(jsonData, 'utf-8');

        console.log(data);

        await exportAndUploadJson(jsonFileName, jsonBuffer);

        // Recargar la página después de completar la carga del archivo JSON en S3
        return NextResponse.json({ jsonFileName: jsonFileName, message: "File uploaded successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: "An error occurred", error: error.message }, { headers: corsHeaders });
    }
}