import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import axios from "axios";

const Popoverdata = () => {
  const [cellValues, setCellValues] = useState<{
    // CASSAFORMA-TOTAL
    cellValueH4: string;
    cellValueH5: string;
    cellValueH6: string;
    // CASSAFORMA-MATERIALES
    cellValueI4: string;
    cellValueI5: string;
    cellValueI6: string;
    // CASSAFORMA M.O.
    cellValueJ4: string;
    cellValueJ5: string;
    cellValueJ6: string;
    // CASSAFORMA TERMINACIONES
    cellValueK4: string;
    cellValueK5: string;
    cellValueK6: string;
    // CASSAFORMA+TECHO LTN-TOTAL
    cellValueH10: string;
    cellValueH11: string;
    cellValueH12: string;
    // CASSAFORMA+TECHO LTN-MATERIALES
    cellValueI10: string;
    cellValueI11: string;
    cellValueI12: string;
    // CASSAFORMA+TECHO LTN M.O.
    cellValueJ10: string;
    cellValueJ11: string;
    cellValueJ12: string;
    // CASSAFORMA+TECHO LTN TERMINACIONES
    cellValueK10: string;
    cellValueK11: string;
    cellValueK12: string;
    //CASSAFORMA DOS PLANTAS + LTN-TOTAL
    cellValueH16: string;
    cellValueH17: string;
    cellValueH18: string;
    // CASSAFORMA DOS PLANTAS + LTN-MATERIALES
    cellValueI16: string;
    cellValueI17: string;
    cellValueI18: string;
    // CASSAFORMA DOS PLANTAS + LTN-M.O.
    cellValueJ16: string;
    cellValueJ17: string;
    cellValueJ18: string;
    // CASSAFORMA DOS PLANTAS + LTN-TERMINACIONES
    cellValueK16: string;
    cellValueK17: string;
    cellValueK18: string;
    // CASSASIP-TOTAL
    cellValueH22: string;
    cellValueH23: string;
    cellValueH24: string;
    // CASSASIP-MATERIALES
    cellValueI22: string;
    cellValueI23: string;
    cellValueI24: string;
    // CASSASIP-M.O.
    cellValueJ22: string;
    cellValueJ23: string;
    cellValueJ24: string;
    // CASSASIP-TERMINACIONES
    cellValueK22: string;
    cellValueK23: string;
    cellValueK24: string;
  } | null>(null);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string>("");

  const handleSeleccion = (opcion: string) => {
    setOpcionSeleccionada(opcion);
  };

  useEffect(() => {
    const fetchCellValues = async () => {
      const response = await axios.get("/api/actualizarExcel");
      const data = response.data;

      // CASSAFORMA-TOTAL
      data.cellValueH4 = Math.round(data.cellValueH4.result).toLocaleString();
      data.cellValueH5 = Math.round(data.cellValueH5.result).toLocaleString();
      data.cellValueH6 = Math.round(data.cellValueH6.result).toLocaleString();
      // CASSAFORMA-MATERIALES
      data.cellValueI4 = Math.round(data.cellValueI4.result).toLocaleString();
      data.cellValueI5 = Math.round(data.cellValueI5.result).toLocaleString();
      data.cellValueI6 = Math.round(data.cellValueI6.result).toLocaleString();
      // CASSAFORMA-M.O.
      data.cellValueJ4 = Math.round(data.cellValueJ4.result).toLocaleString();
      data.cellValueJ5 = Math.round(data.cellValueJ5.result).toLocaleString();
      data.cellValueJ6 = Math.round(data.cellValueJ6.result).toLocaleString();
      // CASSAFORMA-TERMINACIONES
      data.cellValueK4 = Math.round(data.cellValueK4.result).toLocaleString();
      data.cellValueK5 = Math.round(data.cellValueK5.result).toLocaleString();
      data.cellValueK6 = Math.round(data.cellValueK6.result).toLocaleString();
      // CASSAFORMA+TECHO LTN-TOTAL
      data.cellValueH10 = Math.round(data.cellValueH10.result).toLocaleString();
      data.cellValueH11 = Math.round(data.cellValueH11.result).toLocaleString();
      data.cellValueH12 = Math.round(data.cellValueH12.result).toLocaleString();
      // CASSAFORMA+TECHO LTN-MATERIALES
      data.cellValueI10 = Math.round(data.cellValueI10.result).toLocaleString();
      data.cellValueI11 = Math.round(data.cellValueI11.result).toLocaleString();
      data.cellValueI12 = Math.round(data.cellValueI12.result).toLocaleString();
      // CASSAFORMA+TECHO LTN M.O.
      data.cellValueJ10 = Math.round(data.cellValueJ10.result).toLocaleString();
      data.cellValueJ11 = Math.round(data.cellValueJ11.result).toLocaleString();
      data.cellValueJ12 = Math.round(data.cellValueJ12.result).toLocaleString();
      // CASSAFORMA+TECHO LTN TERMINACIONES
      data.cellValueK10 = Math.round(data.cellValueK10.result).toLocaleString();
      data.cellValueK11 = Math.round(data.cellValueK11.result).toLocaleString();
      data.cellValueK12 = Math.round(data.cellValueK12.result).toLocaleString();
      //CASSAFORMA DOS PLANTAS + LTN-TOTAL
      data.cellValueH16 = Math.round(data.cellValueH16.result).toLocaleString();
      data.cellValueH17 = Math.round(data.cellValueH17.result).toLocaleString();
      data.cellValueH18 = Math.round(data.cellValueH18.result).toLocaleString();
      // CASSAFORMA DOS PLANTAS + LTN-MATERIALES
      data.cellValueI16 = Math.round(data.cellValueI16.result).toLocaleString();
      data.cellValueI17 = Math.round(data.cellValueI17.result).toLocaleString();
      data.cellValueI18 = Math.round(data.cellValueI18.result).toLocaleString();
      // CASSAFORMA DOS PLANTAS + LTN-M.O.
      data.cellValueJ16 = Math.round(data.cellValueJ16.result).toLocaleString();
      data.cellValueJ17 = Math.round(data.cellValueJ17.result).toLocaleString();
      data.cellValueJ18 = Math.round(data.cellValueJ18.result).toLocaleString();
      // CASSAFORMA DOS PLANTAS + LTN-TERMINACIONES
      data.cellValueK16 = Math.round(data.cellValueK16.result).toLocaleString();
      data.cellValueK17 = Math.round(data.cellValueK17.result).toLocaleString();
      data.cellValueK18 = Math.round(data.cellValueK18.result).toLocaleString();
      // CASSASIP-TOTAL
      data.cellValueH22 = Math.round(data.cellValueH22.result).toLocaleString();
      data.cellValueH23 = Math.round(data.cellValueH23.result).toLocaleString();
      data.cellValueH24 = Math.round(data.cellValueH24.result).toLocaleString();
      // CASSASIP-MATERIALES
      data.cellValueI22 = Math.round(data.cellValueI22.result).toLocaleString();
      data.cellValueI23 = Math.round(data.cellValueI23.result).toLocaleString();
      data.cellValueI24 = Math.round(data.cellValueI24.result).toLocaleString();
      // CASSASIP-M.O.
      data.cellValueJ22 = Math.round(data.cellValueJ22.result).toLocaleString();
      data.cellValueJ23 = Math.round(data.cellValueJ23.result).toLocaleString();
      data.cellValueJ24 = Math.round(data.cellValueJ24.result).toLocaleString();
      // CASSASIP-TERMINACIONES
      data.cellValueK22 = Math.round(data.cellValueK22.result).toLocaleString();
      data.cellValueK23 = Math.round(data.cellValueK23.result).toLocaleString();
      data.cellValueK24 = Math.round(data.cellValueK24.result).toLocaleString();

      setCellValues(data);
    };

    fetchCellValues();
  }, []);

  return (
    <Tabs defaultValue="account" className="w-full h-full">
      {/* TABLIST DESKTOP */}
      <h1 className=" text-black text-center font-semibold uppercase p-1 pb-2 hidden lg:block ">
        Forma de construccion
      </h1>
      <TabsList className="hidden flex-wrap lg:flex z-40">
        <TabsTrigger value="casaforma">CASSAFORMA</TabsTrigger>
        <TabsTrigger value="casaformartecho">CASSAFORMA+ Techo LTN</TabsTrigger>
        <TabsTrigger value="casaformadosplantas">
          DOS PLANTAS Cassaforma + LTN
        </TabsTrigger>
        <TabsTrigger value="casasip">CASSASIP</TabsTrigger>
        <TabsTrigger value="steelframinng">Steel Framinng</TabsTrigger>
        <TabsTrigger value="ladrillo">Ladrillo</TabsTrigger>
      </TabsList>
      {/* TABLIST MOBILE */}
      <div className="z-40">
        <TabsList className="flex flex-col lg:hidden z-40">
          <h1 className=" text-black text-center font-semibold uppercase p-1 pb-2 block lg:hidenn ">
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
                onClick={() => handleSeleccion("CASSAFORMA DOS PLANTAS + LTN")}
              >
                DOS PLANTAS Cassaforma + LTN
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
                Steel Framinng
              </TabsTrigger>
              <TabsTrigger
                value="ladrillo"
                onClick={() => handleSeleccion("LADRILLO")}
              >
                Ladrillo
              </TabsTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </TabsList>
      </div>

      <TabsContent value="casaforma" className=" flex">
        <div className="flex w-full h-full flex-col justify-between gap-10 pt-10">
          <div>
            <h2 className="flex justify-center font-bold uppercase">Total</h2>
            <div className="flex">
              <h3 className=" font-semibold w-1">Pesos:</h3>
              <p className="flex justify-center flex-grow">
                {cellValues?.cellValueH4}
              </p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">Dolares:</h3>
              <p className="flex justify-center flex-grow">
                {cellValues?.cellValueH5}
              </p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">USD:</h3>
              <p className="flex justify-center flex-grow">
                {cellValues?.cellValueH6}
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
                {cellValues?.cellValueI4}
              </p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">Dolares:</h3>
              <p className="flex justify-center flex-grow">
                {cellValues?.cellValueI5}
              </p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">USD:</h3>
              <p className="flex justify-center flex-grow">
                {cellValues?.cellValueI6}
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
                {cellValues?.cellValueJ4}
              </p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">Dolares:</h3>
              <p className="flex justify-center flex-grow">
                {cellValues?.cellValueJ5}
              </p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">USD:</h3>
              <p className="flex justify-center flex-grow">
                {cellValues?.cellValueJ6}
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
                {cellValues?.cellValueK4}
              </p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">Dolares:</h3>
              <p className="flex justify-center flex-grow">
                {cellValues?.cellValueK5}
              </p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">USD:</h3>
              <p className="flex justify-center flex-grow">
                {cellValues?.cellValueK6}
              </p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="casaformartecho"
        className="flex justify-center items-center"
      >
        <div className="flex w-full h-full flex-col justify-between gap-10 pt-10">
          <div>
            <h2 className="flex justify-center font-bold uppercase">Total</h2>
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
        <div className="flex w-full h-full flex-col justify-between gap-10 pt-10">
          <div>
            <h2 className="flex justify-center font-bold uppercase">Total</h2>
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
        <div className="flex w-full h-full flex-col justify-between gap-10 pt-10">
          <div>
            <h2 className="flex justify-center font-bold uppercase">Total</h2>
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
      <TabsContent value="steelframinng" className="pt-28">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <h2 className="flex justify-center">Total</h2>
            <p>Pesos</p>
            <p>Dolares</p>
            <p>USD</p>
          </div>
          <div>
            <h2 className="flex justify-center">Materiales</h2>
            <div>
              <p>Pesos</p>
              <p>Dolares</p>
              <p>USD</p>
            </div>
          </div>
          <div>
            <h2 className="flex justify-center">Mano de Obra</h2>
            <p>Pesos</p>
            <p>Dolares</p>
            <p>USD</p>
          </div>
          <div>
            <h2 className="flex justify-center">Terminaciones</h2>
            <div>
              <p>Pesos</p>
              <p>Dolares</p>
              <p>USD</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="ladrillo" className="pt-28">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <h2 className="flex justify-center">Total</h2>
            <p>Pesos</p>
            <p>Dolares</p>
            <p>USD</p>
          </div>
          <div>
            <h2 className="flex justify-center">Materiales</h2>
            <div>
              <p>Pesos</p>
              <p>Dolares</p>
              <p>USD</p>
            </div>
          </div>
          <div>
            <h2 className="flex justify-center">Mano de Obra</h2>
            <p>Pesos</p>
            <p>Dolares</p>
            <p>USD</p>
          </div>
          <div>
            <h2 className="flex justify-center">Terminaciones</h2>
            <div>
              <p>Pesos</p>
              <p>Dolares</p>
              <p>USD</p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Popoverdata;
