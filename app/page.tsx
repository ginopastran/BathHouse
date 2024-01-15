"use client";

import React, { useState } from "react";
import axios from "axios";

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
      // Enviar datos al servidor
      await axios.post("/api/actualizarExcel", { perimetro, ubicacionObra });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full h-screen bg-white">
      <h1 className=" text-black">Formulario</h1>
      <form onSubmit={handleSubmit} className=" text-black">
        <label className=" text-black">
          Perímetro de la casa:
          <input
            type="number"
            value={perimetro}
            onChange={(e) => setPerimetro(Number(e.target.value))}
          />
        </label>

        <label>
          Ubicación de la obra:
          <select
            value={ubicacionObra}
            onChange={(e) => setUbicacionObra(e.target.value)}
          >
            {provinciasArgentina.map((provincia) => (
              <option key={provincia} value={provincia}>
                {provincia}
              </option>
            ))}
          </select>
        </label>

        <div>
          <button
            type="submit"
            className="px-3 py-2 bg-teal-500 rounded-xl text-white"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioPage;
