"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import FormEtapa1Edit from "./form-etapa-edit-1";
import FormJson1Edit from "./form-json-edit-1";

interface JsonData {
  "nombre-completo": string;
  "nombre-obra": string;
  ubicacion: string;
  "metros-cuadrados-de-planta-baja": number;
  "metros-cuadrados-de-planta-alta": number;
  "superficie-p-rgolas-cubiertas-techado": number;
  "superficie-p-rgolas-semi-cubierta-p-rgola": number;
  "superficie-p-rgolas-semi-cochera-cubierta-p-rgola": number;
  "sup-alero": number;
  "pb-muros-pb-perimetro": number;
  "pb-muros-pb-interiores-churrasquera-otros": number;
  "pa-muros-pa-perimetro": number;
  "pa-muros-pa-interiores": number;
  "altura-de-muro-planta-baja": number;
  "altura-de-muro-planta-alta": number;
  fecha: string;
}

interface EditJsonButtonProps {
  children: React.ReactNode;
  jsonData: JsonData | null;
}

export const EditJsonButton = ({ children, jsonData }: EditJsonButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none h-full">
        <FormJson1Edit data={jsonData} />
      </DialogContent>
    </Dialog>
  );
};
