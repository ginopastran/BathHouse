"use client";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Popoverdata from "@/components/popover-data";
import { useEffect, useState } from "react";

import data from "@/public/Asset/edit.json";
import { getJson } from "@/lib/getJson";

interface Datos {
  "nombre-completo": string;
  ubicacion: string;
  "metros-cuadrados-de-planta-baja": number;
  "metros-cuadrados-de-planta-alta": number;
  "superficie-p-rgolas-cubiertas-techado": number;
  "superficie-p-rgolas-semi-cubierta-p-rgola": number;
  "superficie-p-rgolas-cochera-semi-cubierta-p-rgola": undefined,
  "altura-de-muro-planta-baja": number;
  "altura-de-muro-planta-alta": number;
  "tabique-durlok-pb-pa": number;
  "aires-acondicionados": number;
  churrasquera: number;
  "pozo-septico": string;
  "cisterna-enterrada": string;
  "con-pluviales": string;
  agua: string;
  cloaca: string;
  gas: string;
  luz: string;
  "pozo-filtrante": string;
  "losa-radiante-electrica": string;
  "losa-radiante-de-agua": string;
  "molduras-de-cumbrera": string;
  "moldura-de-ventanas": string;
  "cielorraso-de-placa-de-yeso": string;
  "cielorraso-de-yeso": string;
  porcelanato: string;
  "rayado-o-fino-de-muros": string;
  "vereda-vehiculo": string;
  "vereda-peatonal-paralela-calle": string;
  "churrasquera-de-ladrillo-y-o-hogar": string;
  pileta: string;
  "cuenta-con-arquitecto": string;
  "cuenta-con-proyecto": string;
}

interface FormEtapa1EditProps {
  data: Datos;
}

const formSchema = z.object({
  "nombre-completo": z.string().min(3),
  ubicacion: z.string(),
  "metros-cuadrados-de-planta-baja": z.coerce.number().min(0),
  "metros-cuadrados-de-planta-alta": z.coerce.number().min(0),
  "superficie-p-rgolas-cubiertas-techado": z.coerce.number().min(0),
  "superficie-p-rgolas-semi-cubierta-p-rgola": z.coerce.number().min(0),
  "altura-de-muro-planta-baja": z.coerce.number().min(0),
  "altura-de-muro-planta-alta": z.coerce.number().min(0),
  "tabique-durlok-pb-pa": z.coerce.number().min(0),
  churrasquera: z.coerce.number().min(0),
  "aires-acondicionados": z.coerce.number().min(0),
  "pozo-septico": z.string(),
  "cisterna-enterrada": z.string(),
  "con-pluviales": z.string(),
  agua: z.string(),
  cloaca: z.string(),
  gas: z.string(),
  luz: z.string(),
  "pozo-filtrante": z.string(),
  "losa-radiante-de-agua": z.string(),
  "losa-radiante-electrica": z.string(),
  "molduras-de-cumbrera": z.string(),
  "moldura-de-ventanas": z.string(),
  "cielorraso-de-placa-de-yeso": z.string(),
  "cielorraso-de-yeso": z.string(),
  porcelanato: z.string(),
  "rayado-o-fino-de-muros": z.string(),
  "vereda-vehiculo": z.string(),
  "vereda-peatonal-paralela-calle": z.string(),
  "churrasquera-de-ladrillo-y-o-hogar": z.string(),
  pileta: z.string(),
  "cuenta-con-arquitecto": z.string(),
  "cuenta-con-proyecto": z.string(),
});

function FormEtapa1Edit({ data }: FormEtapa1EditProps) {
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [informacionGeneral, setInformacionGeneral] = useState(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [datos, setDatos] = useState<Datos | null>(null);
  const [datosOriginales, setDatosOriginales] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
      ? {
          "nombre-completo": data["nombre-completo"],
          ubicacion: data["ubicacion"],
          "metros-cuadrados-de-planta-baja":
            data["metros-cuadrados-de-planta-baja"],
          "metros-cuadrados-de-planta-alta":
            data["metros-cuadrados-de-planta-alta"],
          "superficie-p-rgolas-cubiertas-techado":
            data["superficie-p-rgolas-cubiertas-techado"],
          "superficie-p-rgolas-semi-cubierta-p-rgola":
            data["superficie-p-rgolas-semi-cubierta-p-rgola"],
          "altura-de-muro-planta-baja": data["altura-de-muro-planta-baja"],
          "altura-de-muro-planta-alta": data["altura-de-muro-planta-alta"],
          /* "tabique-durlok-pb-pa": data["tabique-durlok-pb-pa"], // cuando sacar comentario */
          churrasquera: data["churrasquera"],
          "aires-acondicionados": data["aires-acondicionados"],
          "pozo-filtrante": data["pozo-filtrante"],
          "cisterna-enterrada": data["cisterna-enterrada"],
          "con-pluviales": data["con-pluviales"],
          agua: data["agua"],
          cloaca: data["cloaca"],
          gas: data["gas"],
          "pozo-filtrante": data["pozo-filtrante"],
          "losa-radiante-de-agua": data["losa-radiante-de-agua"],
          "losa-radiante-electrica": data["losa-radiante-electrica"],
          "molduras-de-cumbrera": data["molduras-de-cumbrera"],
          "moldura-de-ventanas": data["moldura-de-ventanas"],
          "cielorraso-de-placa-de-yeso": data["cielorraso-de-placa-de-yeso"],
          "cielorraso-de-yeso": data["cielorraso-de-yeso"],
          porcelanato: data["porcelanato"],
          "rayado-o-fino-de-muros": data["rayado-o-fino-de-muros"],
          "vereda-vehiculo": data["vereda-vehiculo"],
          "churrasquera-de-ladrillo-y-o-hogar":
            data["churrasquera-de-ladrillo-y-o-hogar"],
          "cuenta-con-arquitecto": data["cuenta-con-arquitecto"],
          "cuenta-con-proyecto": data["cuenta-con-proyecto"],
        }
      : {},
  });

  // Función para manejar el botón de editar
  const handleEditarClick = () => {
    setEditing(true);
  };

  // Función para manejar el botón de guardar
  const handleGuardarClick = () => {
    // Realizar las acciones necesarias para guardar los datos, como enviar una solicitud a la API, etc.
    setEditing(false);
  };

  // useEffect para restaurar datos cuando no está editando
  useEffect(() => {
    if (!editing) {
      setDatos({ ...datosOriginales });
    }
  }, [editing, datosOriginales]);

  // Función para manejar cambios en los campos de entrada
  const handleInputChange = (key: string, value: any) => {
    setDatos((prevDatos) => {
      if (prevDatos) {
        return { ...prevDatos, [key]: value };
      }
      return null;
    });
  };

  // Función para manejar el envío del formulario
  const onSubmit = (data: any) => {
    // Realizar las acciones necesarias al enviar el formulario
    console.log(data);
  };
  /*   const onSubmit = async (data: any) => {
    try {
      const postResponse = await axios.post("/api/actualizarExcel", data);

      const fileName = postResponse.data.fileName;

      const getResponse = await axios.get("/api/actualizarExcel", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([getResponse.data]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", fileName);
      // document.body.appendChild(link);
      // link.click();

      setIsSubmitComplete(true);
    } catch (error) {
      console.log(error);
    }
  }; */
  // Convertir valores numéricos a números

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="gap-4 m-4 grid grid-flow-row-dense grid-cols-2 grid-rows-2">
            <FormField
              control={form.control}
              name="nombre-completo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                   /*    onChange={(e) =>
                        handleInputChange("nombre-completo", e.target.value)
                      } */
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ubicacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicacion</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      handleInputChange("ubicacion", value);
/*                       field.onChange(value);
 */                    }}
                    defaultValue={
                      typeof data["ubicacion"] === "string"
                        ? data["ubicacion"]
                        : ""
                    }
                    disabled={!editing}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione Provincia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Mendoza">Mendoza</SelectItem>
                      <SelectItem value="Chaco">Chaco</SelectItem>
                      <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metros-cuadrados-de-planta-baja"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metros cuadrados de planta baja</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      {...field}
             /*          onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsedValue = parseFloat(inputValue);
                        handleInputChange(
                          "metros-cuadrados-de-planta-baja",
                          isNaN(parsedValue) ? "" : parsedValue
                        );
                      }} */
                      disabled={!editing}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metros-cuadrados-de-planta-alta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metros cuadrados de planta alta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      type="number"
                      {...field}
                     /*  onChange={(e) =>
                        handleInputChange(
                          "metros_cuadrados_de_planta_alta",
                          e.target.value
                        )
                      } */
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="superficie-p-rgolas-cubiertas-techado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Superficie Pérgolas cubiertas (techado)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      {...field}
                     /*  onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsedValue = parseFloat(inputValue);
                        handleInputChange(
                          "superficie_pergolas_cubiertas_techado",
                          isNaN(parsedValue) ? "" : parsedValue
                        );
                      }} */
                      disabled={!editing}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="superficie-p-rgolas-semi-cubierta-p-rgola"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Superficie Pérgolas semi cubierta (pérgola)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      {...field}
                      /* onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsedValue = parseFloat(inputValue);
                        handleInputChange(
                          "superficie_pergolas_semi_cubierta_pergola",
                          isNaN(parsedValue) ? "" : parsedValue
                        );
                      }} */
                      disabled={!editing}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="altura-de-muro-planta-baja"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura de muro planta baja</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m"
                      {...field}
                  /*     onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsedValue = parseFloat(inputValue);
                        handleInputChange(
                          "altura_de_muro_planta_baja",
                          isNaN(parsedValue) ? "" : parsedValue
                        );
                      }} */
                      disabled={!editing}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="altura-de-muro-planta-alta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura de muro planta alta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m"
                      {...field}
                     /*  onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsedValue = parseFloat(inputValue);
                        handleInputChange(
                          "altura_de_muro_planta_alta",
                          isNaN(parsedValue) ? "" : parsedValue
                        );
                      }} */
                      disabled={!editing}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="churrasquera"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Churrasquera</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m"
                      {...field}
                  /*     onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsedValue = parseFloat(inputValue);
                        handleInputChange(
                          "churrasquera",
                          isNaN(parsedValue) ? "" : parsedValue
                        );
                      }} */
                      disabled={!editing}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aires-acondicionados"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aires Acondicionados</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m"
                      {...field}
                     /*  onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsedValue = parseFloat(inputValue);
                        handleInputChange(
                          "aires_acondicionados",
                          isNaN(parsedValue) ? "" : parsedValue
                        );
                      }} */
                      disabled={!editing}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pozo-filtrante"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pozo Filtrante</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m"
                      {...field}
                   /*    onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsedValue = parseFloat(inputValue);
                        handleInputChange(
                          "pozo_filtrante",
                          isNaN(parsedValue) ? "" : parsedValue
                        );
                      }} */
                      disabled={!editing}
                      type="number"
                    />
                  </FormControl>  
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cisterna-enterrada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cisterna Enterrada</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cantidad"
                      type="number"
                      {...field}
                 /*      onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsedValue = parseFloat(inputValue);
                        handleInputChange(
                          "cisterna-enterrada",
                          isNaN(parsedValue) ? "" : parsedValue
                        );
                      }} */
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="con-pluviales"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Con Pluviales</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cantidad"
                      type="number"
                      {...field}
                  /*     onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsedValue = parseFloat(inputValue);
                        handleInputChange(
                          "cisterna-enterrada",
                          isNaN(parsedValue) ? "" : parsedValue
                        );
                      }} */
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="gap-4 grid mx-4   grid-flow-row-dense grid-cols-2 grid-rows-3 xl:grid-cols-3 2xl:grid-cols-3 ">
            <FormField
              control={form.control}
              name="agua"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Agua</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cloaca"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Cloaca</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gas"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gas</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pozo-filtrante-bool"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Pozo Filtrante</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="losa-radiante-de-agua"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Losa Radiante de Agua</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="losa-radiante-electrica"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Losa Radiante Eléctrica</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="molduras-de-cumbrera"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Molduras de Cumbrera</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="moldura-de-ventanas"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Moldura de Ventanas</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cielorraso-de-placa-de-yeso"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Cielorraso de Placa de Yeso</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cielorraso-de-yeso"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Cielorraso de Yeso</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="porcelanato"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Porcelanato</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rayado-o-fino-de-muros"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Rayado o Fino de Muros</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vereda-vehiculo"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Vereda vehicular y peatonal peperndic. a la calle
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="churrasquera-de-ladrillo-y-o-hogar"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Churrasquera de ladrillo y/o Hogar</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cuenta-con-arquitecto"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>¿Cuenta con arquitecto?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cuenta-con-proyecto"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>¿Cuenta con proyecto?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SI" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center pt-5 pb-6 ">
            <Button
              type="submit"
              className="w-[50%] "
              onClick={editing ? handleGuardarClick : handleEditarClick}
            >
              {editing ? "Guardar" : "Editar"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default FormEtapa1Edit;
