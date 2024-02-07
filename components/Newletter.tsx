import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"


const Newsletter = () => {
  return (
    <div className="w-full py-16 text-white ">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-1">
        <div className="lg:col-span-3 my-4">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-center">
            Enviar recomendaciones
          </h1>
          <p className="lg:px-16">
            Es posible que encuentre inconvenientes en el uso. Puede adjuntar
            inconveniente con foto y su comentario estamos trabajando para
            mejorar esta primera versión. Muchas gracias By Ciclo
          </p>
        </div>
        <div className="my-4">
          <div className="flex flex-col sm:flex-row items-center justify-center w-full">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Ingrese captura</Label>
              <Input id="picture" type="file" />
              <Textarea placeholder="Type your message here." />
            <button className=" bg-[#00df9a] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3">
              Enviar
            </button>
            </div>
          </div>
          <p className="text-center">
            We care bout the protection of your data. Read our{" "}
            <span className="text-[#00df9a]">Privacy Policy.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
