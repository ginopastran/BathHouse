"use client";

import { EditJsonButton } from "@/components/edit-json-button";
import HistoryCard from "@/components/history-card";
import NewCompNavbar from "@/components/new-comp-navbar";
import { getAllJsonFiles } from "@/lib/json/getAllJsonFiles";
import { formatDateString } from "@/lib/utils";
import { getAllXlsxFiles } from "@/lib/xlsx/getAllXlsxFiles";
import { Button } from "@nextui-org/react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonFiles = await getAllJsonFiles();

        // Ordena los archivos JSON por fecha en orden descendente
        const sortedJsonFiles = jsonFiles.sort((a, b) => {
          const dateA = new Date(a.fecha);
          const dateB = new Date(b.fecha);

          // Cambiar el signo a '<' para un orden ascendente
          return dateB.getTime() - dateA.getTime();
        });

        setData(sortedJsonFiles);
        console.log(sortedJsonFiles);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* <Loader2 className=" h-20 w-20 animate-spin" /> */}
        <CircleLoader color="#FA851E" size={70} />
      </div>
    );
  }

  return (
    <>
      <NewCompNavbar title="Historial" />
      <div className="flex flex-col h-screen dark relative pt-8 z-30">
        <main className="flex-1 overflow-auto p-4 text-white">
          <div className="container max-w-3xl space-y-8">
            <div className="flex flex-col items-center space-y-2 text-center"></div>
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
    </>
  );
}

export default HistoryPage;
