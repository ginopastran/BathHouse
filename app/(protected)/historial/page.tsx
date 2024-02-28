"use client";

import HistoryCard from "@/components/history-card";
import { getAllJsonFiles } from "@/lib/json/getAllJsonFiles";
import { formatDateString } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

interface JsonData {
  "nombre-obra": string;
  fecha: string;
}

function HistoryPage() {
  const [data, setData] = useState<JsonData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const jsonFiles = await getAllJsonFiles();
      setData(jsonFiles);
      console.log(jsonFiles);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen dark z-40 relative pt-8">
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
