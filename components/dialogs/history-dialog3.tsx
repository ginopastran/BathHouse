"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { FormWraper } from "../forms/form-wrapper";
import { HistoryCardWraper } from "../cards/history-card-wrapper";
import { CircleLoader } from "react-spinners";

interface HistoryDialogProps {
  xlsxName: string;
}

const HistoryDialog3 = ({ xlsxName }: HistoryDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cellValues, setCellValues] = useState<{
    //CSF Premium (PB)
    cellValueAG2: string;
    //CSF Premium (PB y PA)
    cellValueAH2: string;
    //SIP Premium (PB)
    cellValueAI2: string;
    //SIP Premioum (PB - PA)
    cellValueAJ2: string;
    //Cassasip/Cassaforma %
    cellValueAH6: string;
  } | null>(null);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string>("");
  const [isCSFPA, setIsCSFPA] = useState(false);
  const [isSIPPA, setIsSIPPA] = useState(false);

  const handleSeleccion = (opcion: string) => {
    setOpcionSeleccionada(opcion);
  };

  useEffect(() => {
    const fetchCellValues = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/historial3", {
          params: { xlsxName },
        });
        const data = response.data;

        console.log(data);

        const roundAndFormat = (value: number | null | undefined): string => {
          return value != null ? Math.round(value).toLocaleString() : "";
        };

        // CFSPREMIUM
        data.cellValueAG2 = roundAndFormat(data.cellValueAG2?.result);

        // CFSPREMIUM (PB y PA)
        data.cellValueAH2 = roundAndFormat(data.cellValueAH2?.result);
        if (data.cellValueAH2 != "") {
          setIsCSFPA(true);
        }
        // SIPPREMIUM
        data.cellValueAI2 = roundAndFormat(data.cellValueAI2?.result);
        // SIPPREMIUM (PB y PA)
        data.cellValueAJ2 = roundAndFormat(data.cellValueAJ2?.result);
        if (data.cellValueAJ2 != "") {
          setIsSIPPA(true);
        }
        //Cassasip/Cassaforma %
        data.cellValueAH6 = roundAndFormat(data.cellValueAH6?.result);
        setCellValues(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCellValues();
  }, []);

  return (
    <HistoryCardWraper>
      <Tabs defaultValue="account" className="w-full h-full">
        {isLoading ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* <Loader2 className=" h-20 w-20 animate-spin" /> */}
            <CircleLoader color="#FA851E" size={70} />
          </div>
        ) : (
          <>
            {/* TABLIST DESKTOP */}
            <h1 className=" text-black dark:text-white text-center font-semibold uppercase p-1 pb-2 hidden lg:block ">
              Informacion de Cotización
            </h1>
            <div className="flex w">
              <div className={`flex flex-col gap-3 `}>
                <h3>CSF Premium </h3>
                <span>{cellValues?.cellValueAG2} </span>
              </div>
              <div className={`flex flex-col gap-3 `}>
                <h3>CSF Premium (PB y PA) </h3>
                <span> {cellValues?.cellValueAH2} $</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3>SIP Premium </h3>
                <span> {cellValues?.cellValueAI2} </span>
              </div>
              <div className={`flex flex-col gap-3 `}>
                <h3>SIP Premium (PB y PA)</h3>
                <span>{cellValues?.cellValueAJ2}</span>
              </div>
              <div className={`flex flex-col gap-3 `}>
                <h3>Cassasip/Cassaforma %</h3>
                <span>{cellValues?.cellValueAH6}%</span>
              </div>
            </div>
            {/* TABLIST MOBILE */}
          </>
        )}
      </Tabs>
    </HistoryCardWraper>
  );
};

export default HistoryDialog3;
