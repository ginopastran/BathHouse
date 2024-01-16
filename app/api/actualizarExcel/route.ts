import ExcelJS from 'exceljs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { Stream } from 'stream';


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
    try {
        const { perimetro, ubicacionObra } = await req.json();
        console.log(perimetro, ubicacionObra);

        const filePath = path.resolve('./public/BATHOUSE-Enero-2024.xlsx');


        // Crear un nuevo libro de trabajo
        const workbook = new ExcelJS.Workbook();

        // Leer el libro de trabajo existente
        await workbook.xlsx.readFile(filePath);

        // Acceder a la hoja de cálculo deseada
        const worksheet = workbook.getWorksheet('Informacion de Cotización');

        if (worksheet) {
            // Escribir en una celda
            worksheet.getCell('B7').value = perimetro;
            worksheet.getCell('B3').value = ubicacionObra;

            // Guardar los cambios en el archivo
            await workbook.xlsx.writeFile(filePath);
        }

        return NextResponse.json({ message: "Todo bien pa" });
    } catch (error: any) {
        return NextResponse.json({ message: "An error ocurred", error: error.message }, { headers: corsHeaders });
    }
}

const pipeline = promisify(Stream.pipeline);

export async function GET(req: NextRequest) {
    try {
        const filePath = path.resolve('./public/BATHOUSE-Enero-2024.xlsx');

        const buffer = await fs.promises.readFile(filePath);

        const response = new NextResponse(buffer);

        return response;
    } catch (error: any) {
        return NextResponse.json({ message: "An error ocurred", error: error.message });
    }
}



