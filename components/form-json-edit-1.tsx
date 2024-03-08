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

import { getJson } from "@/lib/json/getJson";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CardWraper } from "./auth/card-wrapper";
import { FormWraper } from "./form-wrapper";
import { useToast } from "./ui/use-toast";
import { BsCheckCircle } from "react-icons/bs";

interface Datos {
  //datos cliente
  "nombre-completo": string;
  ubicacion: string;
  "nombre-obra": string;

  "metros-cuadrados-de-planta-baja": number;
  "metros-cuadrados-de-planta-alta": number;
  "superficie-p-rgolas-cubiertas-techado": number;
  "superficie-p-rgolas-semi-cubierta-p-rgola": number;
  "superficie-p-rgolas-semi-cochera-cubierta-p-rgola": number;
  "sup-alero": number;

  "altura-de-muro-planta-baja": number;
  "altura-de-muro-planta-alta": number;
  "pb-muros-pb-perimetro": number;
  "pb-muros-pb-interiores-churrasquera-otros": number;
  "pa-muros-pa-perimetro": number;
  "pa-muros-pa-interiores": number;

  /*  codigo comentado no utilizado en la etapa 1
  "tabique-durlock-pb-pa": number;
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
  "cuenta-con-proyecto": string; */
}

interface FormEtapa1EditProps {
  data: Datos | null;
}

const formSchema = z.object({
  /*   "nombre-completo": z.string().min(3),
  ubicacion: z.string(),
  "metros-cuadrados-de-planta-baja": z.coerce.number().min(0),
  "metros-cuadrados-de-planta-alta": z.coerce.number().min(0),
  "superficie-p-rgolas-cubiertas-techado": z.coerce.number().min(0),
  "superficie-p-rgolas-semi-cubierta-p-rgola": z.coerce.number().min(0),
  "superficie-p-rgolas-cochera-semi-cubierta-p-rgola": z.coerce.number().min(0),
  "altura-de-muro-planta-baja": z.coerce.number().min(0),
  "altura-de-muro-planta-alta": z.coerce.number().min(0),
  "tabique-durlock-pb-pa": z.coerce.number().min(0),
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
  "cuenta-con-proyecto": z.string(), */
  //datos cliente
  "nombre-completo": z.string().min(3),
  "nombre-obra": z.string().min(3),
  ubicacion: z.string(),
  //datos plano municipal

  "metros-cuadrados-de-planta-baja": z.coerce.number().min(0),
  "metros-cuadrados-de-planta-alta": z.coerce.number().min(0),
  "superficie-p-rgolas-cubiertas-techado": z.coerce.number().min(0),
  "superficie-p-rgolas-semi-cubierta-p-rgola": z.coerce.number().min(0),
  "superficie-p-rgolas-semi-cochera-cubierta-p-rgola": z.coerce.number().min(0),
  "sup-alero": z.coerce.number().min(0),
  //cerramiento
  "pb-muros-pb-perimetro": z.coerce.number().min(0),
  "pb-muros-pb-interiores-churrasquera-otros": z.coerce.number().min(0),
  "pa-muros-pa-perimetro": z.coerce.number().min(0),
  "pa-muros-pa-interiores": z.coerce.number().min(0),
  "altura-de-muro-planta-baja": z.coerce.number().min(0),
  "altura-de-muro-planta-alta": z.coerce.number().min(0),
});

function FormJson1Edit({ data }: FormEtapa1EditProps) {
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [informacionGeneral, setInformacionGeneral] = useState(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [datos, setDatos] = useState<Datos | null>(null);
  const [datosOriginales, setDatosOriginales] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
      ? {
          /*  "nombre-completo": data["nombre-completo"],
          ubicacion: data["ubicacion"],
          "metros-cuadrados-de-planta-baja":
            data["metros-cuadrados-de-planta-baja"],
          "metros-cuadrados-de-planta-alta":
            data["metros-cuadrados-de-planta-alta"],
          "superficie-p-rgolas-cubiertas-techado":
            data["superficie-p-rgolas-cubiertas-techado"],
          "superficie-p-rgolas-semi-cubierta-p-rgola":
            data["superficie-p-rgolas-semi-cubierta-p-rgola"],
          "superficie-p-rgolas-cochera-semi-cubierta-p-rgola":
            data["superficie-p-rgolas-cochera-semi-cubierta-p-rgola"],
          "altura-de-muro-planta-baja": data["altura-de-muro-planta-baja"],
          "altura-de-muro-planta-alta": data["altura-de-muro-planta-alta"],
          "tabique-durlock-pb-pa": data["tabique-durlock-pb-pa"],
          churrasquera: data["churrasquera"],
          "aires-acondicionados": data["aires-acondicionados"],
          "pozo-filtrante": data["pozo-filtrante"],
          "cisterna-enterrada": data["cisterna-enterrada"],
          "con-pluviales": data["con-pluviales"],
          agua: data["agua"],
          cloaca: data["cloaca"],
          gas: data["gas"],
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
          "cuenta-con-proyecto": data["cuenta-con-proyecto"], */
          //datos cliente
          "nombre-completo": data["nombre-completo"],
          "nombre-obra": data["nombre-obra"],
          ubicacion: data["ubicacion"],
          //datos plano municipal

          "metros-cuadrados-de-planta-baja":
            data["metros-cuadrados-de-planta-baja"],
          "metros-cuadrados-de-planta-alta":
            data["metros-cuadrados-de-planta-alta"],
          "superficie-p-rgolas-cubiertas-techado":
            data["superficie-p-rgolas-cubiertas-techado"],
          "superficie-p-rgolas-semi-cubierta-p-rgola":
            data["superficie-p-rgolas-semi-cubierta-p-rgola"],
          "superficie-p-rgolas-semi-cochera-cubierta-p-rgola":
            data["superficie-p-rgolas-semi-cochera-cubierta-p-rgola"],
          "sup-alero": data["sup-alero"],
          //cerramiento
          "pb-muros-pb-perimetro": data["pb-muros-pb-perimetro"],
          "pb-muros-pb-interiores-churrasquera-otros":
            data["pb-muros-pb-interiores-churrasquera-otros"],
          "pa-muros-pa-perimetro": data["pa-muros-pa-perimetro"],
          "pa-muros-pa-interiores": data["pa-muros-pa-interiores"],
          "altura-de-muro-planta-baja": data["altura-de-muro-planta-baja"],
          "altura-de-muro-planta-alta": data["altura-de-muro-planta-alta"],
        }
      : {},
  });

  // Función para manejar el botón de editar
  const handleEditarClick = () => {
    setEditing(true);
  };

  // Función para manejar el botón de guardar
  const handleGuardarClick = async () => {
    try {
      setIsSubmitting(true);
      const formData = form.getValues(); // Obtener los valores actuales del formulario
      const postResponse = await axios.post("/api/actualizarExcel", formData); // Enviar los datos del formulario

      setIsSubmitComplete(true);

      toast({
        title: "El presupuesto se editó correctamente",
        duration: 3000,
        className: "bg-emerald-700 ",
      });
      // Esperar 3 segundos antes de recargar la página
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
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

  const onSubmit = async (formdata: any) => {
    try {
      const postResponse = await axios.post("/api/actualizarJson", formdata);
      setIsSubmitComplete(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWraper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleGuardarClick)}>
          <div className="gap-4 m-4 grid grid-flow-row-dense grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-3">
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
              name="nombre-obra"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Obra</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      /*    onChange={(e) =>
                        handleInputChange("nombre-completo", e.target.value)
                      } */
                      disabled
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
                       */
                    }}
                    defaultValue={
                      data && typeof data["ubicacion"] === "string"
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
              name="superficie-p-rgolas-semi-cochera-cubierta-p-rgola"
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sup-alero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Superficie de Aleros</FormLabel>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pb-muros-pb-perimetro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Muros planta baja Perímetro</FormLabel>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pb-muros-pb-interiores-churrasquera-otros"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Muros interiores, churrasquera y otros</FormLabel>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pa-muros-pa-perimetro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Muro Planta Alta Perímetro</FormLabel>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pa-muros-pa-interiores"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Muro Planta Alta interiores</FormLabel>
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
                  <FormLabel>Muro Planta Alta interiores</FormLabel>
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
                  <FormLabel>Muro Planta Alta interiores</FormLabel>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center pt-5 pb-6 ">
            {!isSubmitComplete && (
              <Button
                type="button"
                className="w-[50%]"
                disabled={isSubmitting}
                onClick={editing ? handleGuardarClick : handleEditarClick}
              >
                {isSubmitting ? (
                  <ReloadIcon
                    className={`mr-2 h-4 w-4 ${
                      isSubmitting ? "animate-spin" : ""
                    }`}
                  />
                ) : editing ? (
                  "Guardar"
                ) : (
                  "Editar"
                )}
              </Button>
            )}

            {isSubmitComplete && (
              <Popover>
                <div className="flex justify-center pb-6 w-full">
                  <PopoverTrigger className="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-[50%]">
                    Mirar el presupuesto
                  </PopoverTrigger>
                </div>
                <PopoverContent className=" h-[70vh] w-[80vw]">
                  <Popoverdata />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </form>
      </Form>
    </FormWraper>
  );
}

export default FormJson1Edit;
{
  /* <div className="gap-4 grid mx-4   grid-flow-row-dense grid-cols-2 grid-rows-3 xl:grid-cols-3 2xl:grid-cols-3 ">
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
  name="cisterna-enterrada"
  render={({ field }) => (
    <FormItem className="space-y-3">
      <FormLabel>Cisterna Enterrada</FormLabel>
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
  name="pozo-filtrante"
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
  name="con-pluviales"
  render={({ field }) => (
    <FormItem className="space-y-3">
      <FormLabel>Con Pluviales</FormLabel>
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
</div> */
}
