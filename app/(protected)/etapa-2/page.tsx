"use client";

import React, { useState, useEffect } from "react";
import FormEtapa2 from "@/components/form-etapa-2";
import FormEtapa1Edit from "@/components/form-etapa-edit-1";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { auth } from "@/auth";
import readJsonFromS3 from "@/lib/json/readJsonFromS3";
import { Loader2 } from "lucide-react";
import AWS from "aws-sdk";
import { useSession } from "next-auth/react";
import { FormError } from "@/components/form-error";
import { BsExclamationTriangle } from "react-icons/bs";
import getLastJsonFile from "@/lib/json/getLastJsonFile";
import axios from "axios";
import NewCompNavbar from "@/components/new-comp-navbar";

export default function Etapa2() {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | string>(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/conseguirJson");
        const data = response.data;
        console.log(data.jsonData);

        if (data.error) {
          throw new Error(data.message);
        }

        setJsonData(data.jsonData);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className=" h-20 w-20 animate-spin" />
      </div>
    );
  }

  if (!jsonData) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-destructive/30 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-500">
        <div className="flex flex-col items-center justify-center sm:flex-row gap-4">
          <p className=" text-medium">
            Para hacer el formulario 2 primero hay que hacer el formulario 1
          </p>
          <BsExclamationTriangle className=" h-10 w-10" />
        </div>
      </div>
    ); // Muestra un mensaje de error si no hay datos o si hubo un error
  }

  return (
    <div className="relative">
      <NewCompNavbar title="Presupuesto Avanzado" />

      <Accordion
        type="single"
        collapsible
        className="flex items-center justify-center w-full "
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="pl-6">
            ¿Desea Editar campos del Primer Presupuesto?
          </AccordionTrigger>
          <AccordionContent>
            <FormEtapa1Edit data={jsonData} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <FormEtapa2 />
    </div>
  );
}
