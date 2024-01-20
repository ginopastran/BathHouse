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
    cellValueH26: any;
    cellValueH27: any;
  } | null>(null);

  useEffect(() => {
    const fetchCellValues = async () => {
      const response = await axios.get("/api/actualizarExcel");
      setCellValues(response.data);
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
              <Button variant="outline">Ver</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-full flex flex-col">
              <TabsTrigger value="casaforma">CASSAFORMA</TabsTrigger>
              <TabsTrigger value="casaformartecho">
                CASSAFORMA+ Techo LTN
              </TabsTrigger>
              <TabsTrigger value="casaformadosplantas">
                DOS PLANTAS Cassaforma + LTN
              </TabsTrigger>
              <TabsTrigger value="casasip">CASSASIP</TabsTrigger>
              <TabsTrigger value="steelframinng">Steel Framinng</TabsTrigger>
              <TabsTrigger value="ladrillo">Ladrillo</TabsTrigger>
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
                {cellValues?.cellValueH26.result}
              </p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">Dolares:</h3>
              <p className="flex justify-center flex-grow">
                {cellValues?.cellValueH27.result}
              </p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">USD:</h3>
              <p className="flex justify-center flex-grow">74.232.421</p>
            </div>
          </div>
          <div>
            <h2 className="flex justify-center font-bold uppercase">
              Materiales
            </h2>
            <div className="flex">
              <h3 className=" font-semibold w-1">Pesos:</h3>
              <p className="flex justify-center flex-grow">74.232.421</p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">Dolares:</h3>
              <p className="flex justify-center flex-grow">74.232.421</p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">USD:</h3>
              <p className="flex justify-center flex-grow">74.232.421</p>
            </div>
          </div>
          <div>
            <h2 className="flex justify-center font-bold uppercase">
              Mano de Obra
            </h2>
            <div className="flex">
              <h3 className=" font-semibold w-1">Pesos:</h3>
              <p className="flex justify-center flex-grow">74.232.421</p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">Dolares:</h3>
              <p className="flex justify-center flex-grow">74.232.421</p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">USD:</h3>
              <p className="flex justify-center flex-grow">74.232.421</p>
            </div>
          </div>
          <div>
            <h2 className="flex justify-center font-bold uppercase">
              Terminaciones
            </h2>
            <div className="flex">
              <h3 className=" font-semibold w-1">Pesos:</h3>
              <p className="flex justify-center flex-grow">74.232.421</p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">Dolares:</h3>
              <p className="flex justify-center flex-grow">74.232.421</p>
            </div>

            <div className="flex">
              <h3 className=" font-semibold w-1">USD:</h3>
              <p className="flex justify-center flex-grow">74.232.421</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="casaformartecho" className="pt-28">
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
      <TabsContent value="casaformadosplantas" className="pt-28">
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
      <TabsContent value="casasip" className="pt-28">
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
