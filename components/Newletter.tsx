"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center w-full text-white my-4">
      <div className="max-w-[1240px] my-4 mx-6 grid lg:grid-cols-1">
        <div className="lg:col-span-3 ">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-center">
            Enviar recomendaciones
          </h1>
          <p className="lg:px-16">
            Es posible que encuentre inconvenientes en el uso. Puede adjuntar
            inconveniente con foto y su comentario estamos trabajando para
            mejorar esta primera versión. Muchas gracias By Ciclo
          </p>
        </div>
        <div className="  my-1">
          <div className="flex flex-col  sm:flex-row items-center justify-center w-full">
            <div className="flex flex-col w-full max-w-sm items-center gap-3">
              <Label htmlFor="picture">Ingrese captura</Label>
              <Input id="picture" type="file" />
              <Textarea placeholder="Type your message here." />
              <button
                className=" bg-emerald-400 text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3"
                onClick={async () => {
                  const res = await fetch("/app/api/resend/resend", {
                    method: "POST",
                  });
                  const data = await res.json();
                  console.log(data);
                }}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
