"use client";

import { EditJsonButton } from "@/components/edit-json-button";
import HistoryCard from "@/components/history-card";
import HistoryCard2 from "@/components/history-card2";
import NewCompNavbar from "@/components/new-comp-navbar";
import { getAllJson2Files } from "@/lib/json/getAllJson2Files";
import { getAllJson3Files } from "@/lib/json/getAllJson3Files";
import { getAllJsonFiles } from "@/lib/json/getAllJsonFiles";
import { formatDateString } from "@/lib/utils";
import { getAllXlsxFiles } from "@/lib/xlsx/getAllXlsxFiles";
import { Button } from "@nextui-org/react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";

function HistoryPage() {
  const [data, setData] = useState<JsonData[]>([]);
  const [data2, setData2] = useState<JsonData2[]>([]);
  const [data3, setData3] = useState<JsonData3[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonFiles = await getAllJsonFiles();
        const jsonFiles2 = await getAllJson2Files();
        const jsonFiles3 = await getAllJson3Files();

        // Ordena los archivos JSON por fecha en orden descendente
        const sortedJsonFiles = jsonFiles.sort((a, b) => {
          const dateA = new Date(a.fecha);
          const dateB = new Date(b.fecha);

          // Cambiar el signo a '<' para un orden ascendente
          return dateB.getTime() - dateA.getTime();
        });
        const sortedJson2Files = jsonFiles2.sort((a, b) => {
          const dateA = new Date(a.fecha);
          const dateB = new Date(b.fecha);

          // Cambiar el signo a '<' para un orden ascendente
          return dateB.getTime() - dateA.getTime();
        });
        const sortedJson3Files = jsonFiles3.sort((a, b) => {
          const dateA = new Date(a.fecha);
          const dateB = new Date(b.fecha);

          // Cambiar el signo a '<' para un orden ascendente
          return dateB.getTime() - dateA.getTime();
        });

        setData(sortedJsonFiles);
        setData2(sortedJson2Files);
        setData3(sortedJson3Files);
        console.log(sortedJsonFiles);
        console.log(sortedJson2Files);
        console.log(sortedJson3Files);
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
              {data2.map((item, index) => (
                <div className="flex items-center space-x-4" key={index}>
                  <HistoryCard2
                    requestNumber={item["nombre-obra"]}
                    date={formatDateString(item["fecha"])}
                    jsonData2={item}
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
