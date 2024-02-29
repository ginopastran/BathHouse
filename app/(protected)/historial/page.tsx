"use client";

import { EditJsonButton } from "@/components/edit-json-button";
import HistoryCard from "@/components/history-card";
import { getAllJsonFiles } from "@/lib/json/getAllJsonFiles";
import { formatDateString } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface JsonData {
  "nombre-completo": string;
  "nombre-obra": string;
  ubicacion: string;
  "metros-cuadrados-de-planta-baja": number;
  "metros-cuadrados-de-planta-alta": number;
  "superficie-p-rgolas-cubiertas-techado": number;
  "superficie-p-rgolas-semi-cubierta-p-rgola": number;
  "superficie-p-rgolas-semi-cochera-cubierta-p-rgola": number;
  "sup-alero": number;
  "pb-muros-pb-perimetro": number;
  "pb-muros-pb-interiores-churrasquera-otros": number;
  "pa-muros-pa-perimetro": number;
  "pa-muros-pa-interiores": number;
  "altura-de-muro-planta-baja": number;
  "altura-de-muro-planta-alta": number;
  fecha: string;
}

function HistoryPage() {
  const [data, setData] = useState<JsonData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const jsonFiles = await getAllJsonFiles();

      // Ordena los archivos JSON por fecha en orden descendente
      const sortedJsonFiles = jsonFiles.sort((a, b) => {
        const dateA = new Date(a.fecha);
        const dateB = new Date(b.fecha);

        // Cambia el signo a '<' para un orden ascendente
        return dateB.getTime() - dateA.getTime();
      });

      setData(sortedJsonFiles);
      console.log(sortedJsonFiles);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen dark relative pt-8 z-30">
      <main className="flex-1 overflow-auto p-4 text-white">
        <div className="container max-w-3xl space-y-8">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">History of Requests</h1>
              <p className="text-gray-500">A timeline of key requests</p>
            </div>
          </div>
          <div className="grid gap-8">
            {data.map((item, index) => (
              <div className="flex items-center space-x-4" key={index}>
                <HistoryCard
                  requestNumber={item["nombre-obra"]}
                  date={formatDateString(item["fecha"])}
                  jsonData={item}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="flex items-center h-14 px-4 border-t border-gray-100 dark:border-gray-800"></footer>
    </div>
  );
}

export default HistoryPage;
