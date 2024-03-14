import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import axios from "axios";
import { RiLoader4Fill } from "react-icons/ri";
import { Loader2 } from "lucide-react";

const Popoverdata = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cellValues, setCellValues] = useState<{
    // CFSPREMIUM
    cellValueM43: string;
    // CFSPREMIUM (PB y PA)
    cellValueM44: string;
    // SIPPREMIUM
    cellValueM45: string;
    // SIPPREMIUM (PB y PA)
    cellValueM46: string;
    
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
        const response = await axios.get("/api/actualizarExcel");
        const data = response.data;

        console.log(data);

        const roundAndFormat = (value: number | null | undefined): string => {
          return value != null ? Math.round(value).toLocaleString() : "";
        };

        // CFSPREMIUM  
        data.cellValueN43 = roundAndFormat(data.cellValueN43?.result);
        
        // CFSPREMIUM (PB y PA)
        data.cellValueN44 = roundAndFormat(data.cellValueN43?.result);
        if  (data.cellValueN44 != "") {
          setIsCSFPA(true);
        }
        // SIPPREMIUM 
        data.cellValueN45 = roundAndFormat(data.cellValueN43?.result);
        // SIPPREMIUM (PB y PA)
        data.cellValueN46 = roundAndFormat(data.cellValueN43?.result);
        if  (data.cellValueN46 != "") {
          setIsSIPPA(true);
        }
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
    <Tabs defaultValue="account" className="w-full h-full">
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2 className=" h-20 w-20 animate-spin" />
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
              <span>{/* {cellValues?.cellValueI43}  */} 2000 $</span>
            </div>
            <div className={`flex flex-col gap-3 ${isCSFPA ? "hidden":""}`}>
              <h3>CSF Premium (PB y PA) </h3>
              <span>{/* {cellValues?.cellValueI43} */} - $</span>
            </div>
            <div className="flex flex-col gap-3">
              <h3>SIP Premium </h3>
              <span>{/* {cellValues?.cellValueI43} */} 2000 $</span>
            </div>
            <div className={`flex flex-col gap-3 ${isSIPPA ? "hidden":""}`}>
              <h3>SIP Premium (PB y PA)</h3>
              <span>{/* {cellValues?.cellValue43} */} 2000 $</span>
            </div>
          </div>
          {/* TABLIST MOBILE */}

        </>
      )}
    </Tabs>
  );
};

export default Popoverdata;
