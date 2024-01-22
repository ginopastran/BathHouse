"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const provinciasArgentina = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

const FormularioPage: React.FC = () => {
  const [perimetro, setPerimetro] = useState<number>();
  const [ubicacionObra, setUbicacionObra] = useState<string>("Buenos Aires"); // Valor predeterminado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/actualizarExcel", { perimetro, ubicacionObra });

      const response = await axios.get("/api/actualizarExcel", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "BATHOUSE-Enero-2024.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full h-screen  p-4">
      <a
        href="/otro"
        className=" bg-white px-3 py-2 text-black rounded-lg text-sm font-medium"
      >
        Presupuesto 1
      </a>
    </div>
  );
};

export default FormularioPage;
