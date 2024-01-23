import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Popoverdata = () => {
  return (
    <Tabs defaultValue="account" className="w-[100%]">
      <TabsList className="grid">
        <TabsTrigger value="casaforma">CASSAFORMA</TabsTrigger>
        <TabsTrigger value="casaformartecho">CASSAFORMA+ Techo LTN</TabsTrigger>
        <TabsTrigger value="casaformadosplantas">
          DOS PLANTAS Cassaforma + LTN
        </TabsTrigger>
        <div className="grid grid-cols-3">
          <TabsTrigger value="casasip">CASSASIP</TabsTrigger>
          <TabsTrigger value="steelframinng">Steel Framinng</TabsTrigger>
          <TabsTrigger value="ladrillo">Ladrillo</TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="casaforma" className="pt-28">
       <div className="grid grid-cols-2 gap-5">
        <div>
        <h2 className="flex justify-center">Total</h2>
            <p>Pesos</p>
            <p>Dolares</p>
            <p>USD</p>
        </div>
        <div >
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
        <div >
            <h2 className="flex justify-center">Terminaciones</h2>
            <div>

            <p>Pesos</p>
            <p>Dolares</p>
            <p>USD</p>
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
        <div >
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
        <div >
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
        <div >
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
        <div >
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
        <div >
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
        <div >
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
        <div >
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
        <div >
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
        <div >
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
        <div >
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
