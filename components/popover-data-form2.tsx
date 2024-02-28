import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const Popoverdata = () => {
  {
    const [isLoading, setIsLoading] = useState(false);
    const [cellValues, setCellValues] = useState<{
      // CASSAFORMA-TOTAL
      cellValueI5: string;
      cellValueI6: string;
      cellValueI7: string;
      // CASSAFORMA-MATERIALES
      cellValueK5: string;
      cellValueK6: string;
      cellValueK7: string;
      // CASSAFORMA-SERVICIOS
      cellValueL5: string;
      cellValueL6: string;
      cellValueL7: string;
      // CASSAFORMA M.O.
      cellValueM5: string;
      cellValueM6: string;
      cellValueM7: string;
      // CASSAFORMA TERMINACIONES
      cellValueN5: string;
      cellValueN6: string;
      cellValueN7: string;

      // CASSAFORMA+TECHO LTN-TOTAL
      cellValueI11: string;
      cellValueI12: string;
      cellValueI13: string;
      // CASSAFORMA+TECHO LTN-MATERIALES
      cellValueK11: string;
      cellValueK12: string;
      cellValueK13: string;
      // CASSAFORMA+TECHO LTN-SERVICIOS
      cellValueL11: string;
      cellValueL12: string;
      cellValueL13: string;
      // CASSAFORMA+TECHO LTN M.O.
      cellValueM11: string;
      cellValueM12: string;
      cellValueM13: string;
      // CASSAFORMA+TECHO LTN TERMINACIONES
      cellValueN11: string;
      cellValueN12: string;
      cellValueN13: string;

      // CASSAFORMA + LTN (DOS PLANTAS) TOTAL
      cellValueI17: string;
      cellValueI18: string;
      cellValueI19: string;
      // CASSAFORMA DOS PLANTAS + LTN-MATERIALES
      cellValueK17: string;
      cellValueK18: string;
      cellValueK19: string;
      // CASSAFORMA DOS PLANTAS + LTN-SERVICIOS
      cellValueL17: string;
      cellValueL18: string;
      cellValueL19: string;
      // CASSAFORMA DOS PLANTAS + LTN-M.O.
      cellValueM17: string;
      cellValueM18: string;
      cellValueM19: string;
      // CASSAFORMA DOS PLANTAS + LTN-TERMINACIONES
      cellValueN17: string;
      cellValueN18: string;
      cellValueN19: string;

      // CASSASIP (UNA PLANTA) TOTAL
      cellValueI23: string;
      cellValueI24: string;
      cellValueI25: string;
      // CASSASIP (UNA PLANTA) MATERIALES
      cellValueK23: string;
      cellValueK24: string;
      cellValueK25: string;
      // CASSASIP (UNA PLANTA) SERVICIOS
      cellValueL23: string;
      cellValueL24: string;
      cellValueL25: string;
      // CASSASIP (UNA PLANTA) M.O.
      cellValueM23: string;
      cellValueM24: string;
      cellValueM25: string;
      // CASSASIP (UNA PLANTA) TERMINACIONES
      cellValueN23: string;
      cellValueN24: string;
      cellValueN25: string;

      // CASSASIP (DOS PLANTAS) TOTAL
      cellValueI29: string;
      cellValueI30: string;
      cellValueI31: string;
      // CASSASIP (DOS PLANTAS) MATERIALES
      cellValueK29: string;
      cellValueK30: string;
      cellValueK31: string;
      // CASSASIP (DOS PLANTAS) SERVICIOS
      cellValueL29: string;
      cellValueL30: string;
      cellValueL31: string;
      // CASSASIP (DOS PLANTAS) SERVICIOS
      cellValueM29: string;
      cellValueM30: string;
      cellValueM31: string;
      // CASSASIP (DOS PLANTAS) TERMINACIONES
      cellValueN29: string;
      cellValueN30: string;
      cellValueN31: string;

      // SEELFRAMING-TOTAL
      cellValueI35: string;
      cellValueI36: string;
      cellValueI37: string;
      // SEELFRAMING-MATERIALES
      cellValueK35: string;
      cellValueK36: string;
      cellValueK37: string;
      // SEELFRAMING-SERVICIOS
      cellValueL35: string;
      cellValueL36: string;
      cellValueL37: string;
      // SEELFRAMING-M.O.
      cellValueM35: string;
      cellValueM36: string;
      cellValueM37: string;
      // SEELFRAMING-TERMINACIONES
      cellValueN35: string;
      cellValueN36: string;
      cellValueN37: string;

      // LADRILLO-TOTAL
      cellValueI41: string;
      cellValueI42: string;
      cellValueI43: string;
      // LADRILLO-MATERIALES
      cellValueK41: string;
      cellValueK42: string;
      cellValueK43: string;
      // LADRILLO-SERVICIOS
      cellValueL41: string;
      cellValueL42: string;
      cellValueL43: string;
      // LADRILLO-M.O.
      cellValueM41: string;
      cellValueM42: string;
      cellValueM43: string;
      // LADRILLO-TERMINACIONES
      cellValueN41: string;
      cellValueN42: string;
      cellValueN43: string;
    } | null>(null);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState<string>("");

    const handleSeleccion = (opcion: string) => {
      setOpcionSeleccionada(opcion);
    };

    useEffect(() => {
      const fetchCellValues = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get("/api/actualizarExcel2");
          const data = response.data;

          // console.log(data);

          const roundAndFormat = (value: number | null | undefined): string => {
            return value != null ? Math.round(value).toLocaleString() : "";
          };

          // CASSAFORMA-TOTAL
          data.cellValueI5 = roundAndFormat(data.cellValueI5?.result);
          data.cellValueI6 = roundAndFormat(data.cellValueI6?.result);
          data.cellValueI7 = roundAndFormat(data.cellValueI7?.result);
          // CASSAFORMA-MATERIALES
          data.cellValueK5 = roundAndFormat(data.cellValueK5?.result);
          data.cellValueK6 = roundAndFormat(data.cellValueK6?.result);
          data.cellValueK7 = roundAndFormat(data.cellValueK7?.result);
          // CASSAFORMA-SERVICIOS
          data.cellValueL5 = roundAndFormat(data.cellValueL5?.result);
          data.cellValueL6 = roundAndFormat(data.cellValueL6?.result);
          data.cellValueL7 = roundAndFormat(data.cellValueL7?.result);
          // CASSAFORMA-M.O.
          data.cellValueM5 = roundAndFormat(data.cellValueM5?.result);
          data.cellValueM6 = roundAndFormat(data.cellValueM6?.result);
          data.cellValueM7 = roundAndFormat(data.cellValueM7?.result);
          // CASSAFORMA-TERMINACIONES
          data.cellValueN5 = roundAndFormat(data.cellValueN5?.result);
          data.cellValueN6 = roundAndFormat(data.cellValueN6?.result);
          data.cellValueN7 = roundAndFormat(data.cellValueN7?.result);

          // CASSAFORMA+TECHO LTN-TOTAL
          data.cellValueI11 = roundAndFormat(data.cellValueI11?.result);
          data.cellValueI12 = roundAndFormat(data.cellValueI12?.result);
          data.cellValueI13 = roundAndFormat(data.cellValueI13?.result);
          // CASSAFORMA+TECHO LTN-MATERIALES
          data.cellValueK11 = roundAndFormat(data.cellValueK11?.result);
          data.cellValueK12 = roundAndFormat(data.cellValueK12?.result);
          data.cellValueK13 = roundAndFormat(data.cellValueK13?.result);
          // CASSAFORMA+TECHO LTN-SERVICIOS
          data.cellValueL11 = roundAndFormat(data.cellValueL11?.result);
          data.cellValueL12 = roundAndFormat(data.cellValueL12?.result);
          data.cellValueL13 = roundAndFormat(data.cellValueL13?.result);
          // CASSAFORMA+TECHO LTN M.O.
          data.cellValueM11 = roundAndFormat(data.cellValueM11?.result);
          data.cellValueM12 = roundAndFormat(data.cellValueM12?.result);
          data.cellValueM13 = roundAndFormat(data.cellValueM13?.result);
          // CASSAFORMA+TECHO LTN TERMINACIONES
          data.cellValueN11 = roundAndFormat(data.cellValueN11?.result);
          data.cellValueN12 = roundAndFormat(data.cellValueN12?.result);
          data.cellValueN13 = roundAndFormat(data.cellValueN13?.result);

          // CASSAFORMA + LTN (DOS PLANTAS) TOTAL
          data.cellValueI17 = roundAndFormat(data.cellValueI17?.result);
          data.cellValueI18 = roundAndFormat(data.cellValueI18?.result);
          data.cellValueI19 = roundAndFormat(data.cellValueI19?.result);
          // CASSAFORMA + LTN (DOS PLANTAS) MATERIALES
          data.cellValueK17 = roundAndFormat(data.cellValueK17?.result);
          data.cellValueK18 = roundAndFormat(data.cellValueK18?.result);
          data.cellValueK19 = roundAndFormat(data.cellValueK19?.result);
          // CASSAFORMA + LTN (DOS PLANTAS) SERVICIOS
          data.cellValueL17 = roundAndFormat(data.cellValueL17?.result);
          data.cellValueL18 = roundAndFormat(data.cellValueL18?.result);
          data.cellValueL19 = roundAndFormat(data.cellValueL19?.result);
          // CASSAFORMA + LTN (DOS PLANTAS) M.O.
          data.cellValueM17 = roundAndFormat(data.cellValueM17?.result);
          data.cellValueM18 = roundAndFormat(data.cellValueM18?.result);
          data.cellValueM19 = roundAndFormat(data.cellValueM19?.result);
          // CASSAFORMA + LTN (DOS PLANTAS) TERMINACIONES
          data.cellValueN17 = roundAndFormat(data.cellValueN17?.result);
          data.cellValueN18 = roundAndFormat(data.cellValueN18?.result);
          data.cellValueN19 = roundAndFormat(data.cellValueN19?.result);

          // CASSASIP (UNA PLANTA) TOTAL
          data.cellValueI23 = roundAndFormat(data.cellValueI23?.result);
          data.cellValueI24 = roundAndFormat(data.cellValueI24?.result);
          data.cellValueI25 = roundAndFormat(data.cellValueI25?.result);
          // CASSASIP (UNA PLANTA) MATERIALES
          data.cellValueK23 = roundAndFormat(data.cellValueK23?.result);
          data.cellValueK24 = roundAndFormat(data.cellValueK24?.result);
          data.cellValueK25 = roundAndFormat(data.cellValueK25?.result);
          // CASSASIP (UNA PLANTA) SERVICIOS
          data.cellValueL23 = roundAndFormat(data.cellValueL23?.result);
          data.cellValueL24 = roundAndFormat(data.cellValueL24?.result);
          data.cellValueL25 = roundAndFormat(data.cellValueL25?.result);
          // CASSASIP (UNA PLANTA) M.O.
          data.cellValueM23 = roundAndFormat(data.cellValueM23?.result);
          data.cellValueM24 = roundAndFormat(data.cellValueM24?.result);
          data.cellValueM25 = roundAndFormat(data.cellValueM25?.result);
          // CASSASIP (UNA PLANTA) TERMINACIONES
          data.cellValueN23 = roundAndFormat(data.cellValueN23?.result);
          data.cellValueN24 = roundAndFormat(data.cellValueN24?.result);
          data.cellValueN25 = roundAndFormat(data.cellValueN25?.result);

          // CASSASIP (DOS PLANTAS) TOTAL
          data.cellValueI29 = roundAndFormat(data.cellValueI29?.result);
          data.cellValueI30 = roundAndFormat(data.cellValueI30?.result);
          data.cellValueI31 = roundAndFormat(data.cellValueI31?.result);
          // CASSASIP (DOS PLANTAS) MATERIALES
          data.cellValueK29 = roundAndFormat(data.cellValueK29?.result);
          data.cellValueK30 = roundAndFormat(data.cellValueK30?.result);
          data.cellValueK31 = roundAndFormat(data.cellValueK31?.result);
          // CASSASIP (DOS PLANTAS) SERVICIOS
          data.cellValueL29 = roundAndFormat(data.cellValueL29?.result);
          data.cellValueL30 = roundAndFormat(data.cellValueL30?.result);
          data.cellValueL31 = roundAndFormat(data.cellValueL31?.result);
          // CASSASIP (DOS PLANTAS) M.O.
          data.cellValueM29 = roundAndFormat(data.cellValueM29?.result);
          data.cellValueM30 = roundAndFormat(data.cellValueM30?.result);
          data.cellValueM31 = roundAndFormat(data.cellValueM31?.result);
          // CASSASIP (DOS PLANTAS) TERMINACIONES
          data.cellValueN29 = roundAndFormat(data.cellValueN29?.result);
          data.cellValueN30 = roundAndFormat(data.cellValueN30?.result);
          data.cellValueN31 = roundAndFormat(data.cellValueN31?.result);

          // SEELFRAMING-TOTAL
          data.cellValueI35 = roundAndFormat(data.cellValueI35?.result);
          data.cellValueI36 = roundAndFormat(data.cellValueI36?.result);
          data.cellValueI37 = roundAndFormat(data.cellValueI37?.result);
          // SEELFRAMING-MATERIALES
          data.cellValueK35 = roundAndFormat(data.cellValueK35?.result);
          data.cellValueK36 = roundAndFormat(data.cellValueK36?.result);
          data.cellValueK37 = roundAndFormat(data.cellValueK37?.result);
          // SEELFRAMING-SERVICIOS
          data.cellValueL35 = roundAndFormat(data.cellValueL35?.result);
          data.cellValueL36 = roundAndFormat(data.cellValueL36?.result);
          data.cellValueL37 = roundAndFormat(data.cellValueL37?.result);
          // SEELFRAMING-M.O.
          data.cellValueM35 = roundAndFormat(data.cellValueM35?.result);
          data.cellValueM36 = roundAndFormat(data.cellValueM36?.result);
          data.cellValueM37 = roundAndFormat(data.cellValueM37?.result);
          // SEELFRAMING-TERMINACIONES
          data.cellValueN35 = roundAndFormat(data.cellValueN35?.result);
          data.cellValueN36 = roundAndFormat(data.cellValueN36?.result);
          data.cellValueN37 = roundAndFormat(data.cellValueN37?.result);

          // LADRILLO-TOTAL
          data.cellValueI41 = roundAndFormat(data.cellValueI41?.result);
          data.cellValueI42 = roundAndFormat(data.cellValueI42?.result);
          data.cellValueI43 = roundAndFormat(data.cellValueI43?.result);
          // LADRILLO-MATERIALES
          data.cellValueK41 = roundAndFormat(data.cellValueK41?.result);
          data.cellValueK42 = roundAndFormat(data.cellValueK42?.result);
          data.cellValueK43 = roundAndFormat(data.cellValueK43?.result);
          // LADRILLO-SERVICIOS
          data.cellValueL41 = roundAndFormat(data.cellValueL41?.result);
          data.cellValueL42 = roundAndFormat(data.cellValueL42?.result);
          data.cellValueL43 = roundAndFormat(data.cellValueL43?.result);
          // LADRILLO-M.O.
          data.cellValueM41 = roundAndFormat(data.cellValueM41?.result);
          data.cellValueM42 = roundAndFormat(data.cellValueM42?.result);
          data.cellValueM43 = roundAndFormat(data.cellValueM43?.result);
          // LADRILLO-TERMINACIONES
          data.cellValueN41 = roundAndFormat(data.cellValueN41?.result);
          data.cellValueN42 = roundAndFormat(data.cellValueN42?.result);
          data.cellValueN43 = roundAndFormat(data.cellValueN43?.result);

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
              Forma de construccion
            </h1>
            <TabsList className="hidden flex-wrap lg:flex z-40">
              <TabsTrigger value="casaforma">CASSAFORMA</TabsTrigger>
              <TabsTrigger value="casaformartecho">
                CASSAFORMA + Techo LTN
              </TabsTrigger>
              <TabsTrigger value="casaformadosplantas">
                CASSAFORMA DOS PLANTAS + LTN
              </TabsTrigger>
              <TabsTrigger value="casasip">CASSASIP</TabsTrigger>
              <TabsTrigger value="steelframinng">SEEL FRAMING</TabsTrigger>
              <TabsTrigger value="ladrillo">LADRILLO</TabsTrigger>
            </TabsList>
            {/* TABLIST MOBILE */}
            <div className="z-40">
              <TabsList className="flex flex-col lg:hidden z-40">
                <h1 className=" text-black dark:text-white text-center font-semibold uppercase p-1 pb-2 block lg:hidenn ">
                  Forma de construccion
                </h1>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {opcionSeleccionada !== "" ? opcionSeleccionada : "Ver"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full flex flex-col">
                    <TabsTrigger
                      value="casaforma"
                      onClick={() => handleSeleccion("CASSAFORMA")}
                    >
                      CASSAFORMA
                    </TabsTrigger>
                    <TabsTrigger
                      value="casaformartecho"
                      onClick={() => handleSeleccion("CASSAFORMA + Techo LTN")}
                    >
                      CASSAFORMA+ Techo LTN
                    </TabsTrigger>
                    <TabsTrigger
                      value="casaformadosplantas"
                      onClick={() =>
                        handleSeleccion("CASSAFORMA DOS PLANTAS + LTN")
                      }
                    >
                      CASSAFORMA DOS PLANTAS + LTN
                    </TabsTrigger>
                    <TabsTrigger
                      value="casasip"
                      onClick={() => handleSeleccion("CASSASIP")}
                    >
                      CASSASIP
                    </TabsTrigger>
                    <TabsTrigger
                      value="steelframinng"
                      onClick={() => handleSeleccion("SEEL FRAMING")}
                    >
                      SEEL FRAMING
                    </TabsTrigger>
                    <TabsTrigger
                      value="ladrillo"
                      onClick={() => handleSeleccion("LADRILLO")}
                    >
                      LADRILLO
                    </TabsTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TabsList>
            </div>

            <TabsContent value="casaforma" className=" flex mt-2">
              <div className="flex w-full h-full flex-col justify-between gap-10 pt-6">
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Total
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI5}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI6}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI7}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Materiales
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK5}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK6}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK7}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Mano de Obra
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueM5}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueM6}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueM7}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Terminaciones
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueN5}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueN6}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueN7}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            {/* <TabsContent
              value="casaformartecho"
              className="flex justify-center items-center"
            >
              <div className="flex w-full h-full flex-col justify-between gap-10 pt-6">
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Total
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH10}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH11}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH12}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Materiales
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI10}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI11}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI12}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Mano de Obra
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ10}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ11}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ12}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Terminaciones
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK10}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK11}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK12}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="casaformadosplantas" className="flex">
              <div className="flex w-full h-full flex-col justify-between gap-10 pt-6">
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Total
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH16}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH17}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH18}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Materiales
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI16}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI17}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI18}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Mano de Obra
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ16}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ17}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ18}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Terminaciones
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK16}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK17}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK18}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="casasip" className="flex">
              <div className="flex w-full h-full flex-col justify-between gap-10 pt-6">
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Total
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH22}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH23}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH24}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Materiales
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI22}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI23}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI24}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Mano de Obra
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ22}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ23}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ24}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Terminaciones
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK22}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK23}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK24}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="steelframinng" className="flex">
              <div className="flex w-full h-full flex-col justify-between gap-10 pt-6">
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Total
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH28}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH29}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH30}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Materiales
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI28}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI29}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI30}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Mano de Obra
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ28}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ29}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ30}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Terminaciones
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK28}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK29}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK30}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="ladrillo" className="flex">
              <div className="flex w-full h-full flex-col justify-between gap-10 pt-6">
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Total
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH34}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH35}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueH36}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Materiales
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI34}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI35}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueI36}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Mano de Obra
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ34}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ35}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueJ36}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="flex justify-center font-bold uppercase">
                    Terminaciones
                  </h2>
                  <div className="flex">
                    <h3 className=" font-semibold w-1">Pesos:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK34}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">Dolares:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK35}
                    </p>
                  </div>

                  <div className="flex">
                    <h3 className=" font-semibold w-1">USD:</h3>
                    <p className="flex justify-center flex-grow">
                      {cellValues?.cellValueK36}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent> */}
          </>
        )}
      </Tabs>
    );
  }
};

export default Popoverdata;
