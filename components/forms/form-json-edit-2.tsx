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
import Popoverdata from "@/components/popovers/popover-data";
import { useEffect, useState } from "react";

import { getJson } from "@/lib/json/getJson";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CardWraper } from "../auth/card-wrapper";
import { FormWraper } from "./form-wrapper";
import { useToast } from "../ui/use-toast";
import { BsCheckCircle } from "react-icons/bs";
import Link from "next/link";

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
  //forma 2
  "tabique-durlock-pb-pa": number;
  "balcon-con-porcelanato": number;
  "hormigon-visto": number;
  "cantidad-encuentros-PB": number;
  "cantidad-encuentros-PA": number;
  "espesor-muro-SIP": string;
  "tipo-techo": string;
  //abertura

  /*   "puerta-principal-tipo": z.string(),// le agreto tipo de puerta madera o chapa
   */ "puerta-principal-cantidad": number;
  "puerta-interior": number;
  "ventana-habitacion": number;
  "puerta-ventana-habitacion": number;
  "ventana-bano": number;
  "puerta-ventana-living": number;
  "puerta-lavanderia": number;
  "vidrio-simple-dvh": string;
  //electricidad
  "bocas-electricas": number;

  //preguntas
  "con-cocina": number;
  "con-lavanderia": number;
  "banos-visita": number;
  banos: number;
  "aires-acondicionados": number;
  churrasquera: number;

  //otros
  "pozo-septico": string;
  "cisterna-enterrada": string;
  "con-pluviales": string;
  agua: string;
  cloaca: string;
  gas: string;
  luz: string;
  "pozo-filtrante": string;
  "tipo-calefaccion": string;
  "molduras-de-cumbrera": string;
  "moldura-de-ventanas": string;
  "tipo-cielorraso": string;
  porcelanato: string;
  "rayado-o-fino-de-muros": string;
  "vereda-vehiculo": string;
  "vereda-peatonal-PAR-calle": string;
  "cierre-provisorio": string;
  "cierre-definitivo": string;
  "churrasquera-de-ladrillo-y-o-hogar": string;
  pileta: string;
  "cuenta-con-proyecto": string;
  "pago-aforos": string;
}

interface FormEtapa1EditProps {
  data: Datos | null;
}

const formSchema = z.object({
  "nombre-completo": z.string().min(3),
  "nombre-obra": z.string().min(3),
  ubicacion: z.string(),
  "metros-cuadrados-de-planta-baja": z.coerce.number().min(0),
  "metros-cuadrados-de-planta-alta": z.coerce.number().min(0),
  "superficie-p-rgolas-cubiertas-techado": z.coerce.number().min(0),
  "superficie-p-rgolas-semi-cubierta-p-rgola": z.coerce.number().min(0),
  "superficie-p-rgolas-semi-cochera-cubierta-p-rgola": z.coerce.number().min(0),
  "sup-alero": z.coerce.number().min(0),
  "pb-muros-pb-perimetro": z.coerce.number().min(0),
  "pb-muros-pb-interiores-churrasquera-otros": z.coerce.number().min(0),
  "pa-muros-pa-perimetro": z.coerce.number().min(0),
  "pa-muros-pa-interiores": z.coerce.number().min(0),
  "altura-de-muro-planta-baja": z.coerce.number().min(0),
  "altura-de-muro-planta-alta": z.coerce.number().min(0),
  "tabique-durlock-pb-pa": z.coerce.number().min(0),
  "balcon-con-porcelanato": z.coerce.number().min(0),
  "hormigon-visto": z.coerce.number().min(0),
  "cantidad-encuentros-PB": z.coerce.number().min(0),
  "cantidad-encuentros-PA": z.coerce.number().min(0),
  "espesor-muro-SIP": z.string(),
  "tipo-techo": z.string(),
  //abertura

  /*   "puerta-principal-tipo": z.string(),// le agreto tipo de puerta madera o chapa
   */ "puerta-principal-cantidad": z.coerce.number().min(0),
  "puerta-interior": z.coerce.number().min(0),
  "ventana-habitacion": z.coerce.number().min(0),
  "puerta-ventana-habitacion": z.coerce.number().min(0),
  "ventana-bano": z.coerce.number().min(0),
  "puerta-ventana-living": z.coerce.number().min(0),
  "puerta-lavanderia": z.coerce.number().min(0),
  "vidrio-simple-dvh": z.string(),
  //electricidad
  "bocas-electricas": z.coerce.number().min(0),

  //preguntas
  "con-cocina": z.coerce.number().min(0),
  "con-lavanderia": z.coerce.number().min(0),
  "banos-visita": z.coerce.number().min(0),
  banos: z.coerce.number().min(0),
  "aires-acondicionados": z.coerce.number().min(0),
  churrasquera: z.coerce.number().min(0),

  //otros
  "pozo-septico": z.string(),
  "cisterna-enterrada": z.string(),
  "con-pluviales": z.string(),
  agua: z.string(),
  cloaca: z.string(),
  gas: z.string(),
  luz: z.string(),
  "pozo-filtrante": z.string(),
  "tipo-calefaccion": z.string(),
  "molduras-de-cumbrera": z.string(),
  "moldura-de-ventanas": z.string(),
  "tipo-cielorraso": z.string(),
  porcelanato: z.string(),
  "rayado-o-fino-de-muros": z.string(),
  "vereda-vehiculo": z.string(),
  "vereda-peatonal-PAR-calle": z.string(),
  "cierre-provisorio": z.string(),
  "cierre-definitivo": z.string(),
  "churrasquera-de-ladrillo-y-o-hogar": z.string(),
  pileta: z.string(),
  "cuenta-con-proyecto": z.string(),
  "pago-aforos": z.string(),
});

function FormJson2Edit({ data }: FormEtapa1EditProps) {
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
          "nombre-completo": data["nombre-completo"],
          "nombre-obra": data["nombre-obra"],
          ubicacion: data["ubicacion"],
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
          "pb-muros-pb-perimetro": data["pb-muros-pb-perimetro"],
          "pb-muros-pb-interiores-churrasquera-otros":
            data["pb-muros-pb-interiores-churrasquera-otros"],
          "pa-muros-pa-perimetro": data["pa-muros-pa-perimetro"],
          "pa-muros-pa-interiores": data["pa-muros-pa-interiores"],
          "altura-de-muro-planta-baja": data["altura-de-muro-planta-baja"],
          "altura-de-muro-planta-alta": data["altura-de-muro-planta-alta"],

          //form 2
          "tabique-durlock-pb-pa": data["tabique-durlock-pb-pa"],
          "balcon-con-porcelanato": data["balcon-con-porcelanato"],
          "hormigon-visto": data["hormigon-visto"],
          "cantidad-encuentros-PB": data["cantidad-encuentros-PB"],
          "cantidad-encuentros-PA": data["cantidad-encuentros-PA"],
          "espesor-muro-SIP": data["espesor-muro-SIP"],
          "tipo-techo": data["tipo-techo"],
          //abertura

          /* "puerta-principal-tipo": "Madera",// le agreto tipo de puerta madera o chapa */
          "puerta-principal-cantidad": data["puerta-principal-cantidad"],
          "puerta-interior": data["puerta-interior"],
          "ventana-habitacion": data["ventana-habitacion"],
          "puerta-ventana-habitacion": data["puerta-ventana-habitacion"],
          "ventana-bano": data["ventana-bano"],
          "puerta-ventana-living": data["puerta-ventana-living"],
          "puerta-lavanderia": data["puerta-lavanderia"],
          "vidrio-simple-dvh": data["vidrio-simple-dvh"],
          //electricidad
          "bocas-electricas": data["bocas-electricas"],
          //preguntas
          "con-cocina": data["con-cocina"],
          "con-lavanderia": data["con-lavanderia"],
          "banos-visita": data["banos-visita"],
          banos: data["banos"],
          "aires-acondicionados": data["aires-acondicionados"],
          churrasquera: data["churrasquera"],

          //otros
          "pozo-septico": data["pozo-septico"],
          "cisterna-enterrada": data["cisterna-enterrada"],
          "con-pluviales": data["con-pluviales"],
          agua: data["agua"],
          cloaca: data["cloaca"],
          gas: data["gas"],
          luz: data["luz"],
          "pozo-filtrante": data["pozo-filtrante"],
          "tipo-calefaccion": data["tipo-calefaccion"],
          "molduras-de-cumbrera": data["molduras-de-cumbrera"],
          "moldura-de-ventanas": data["moldura-de-ventanas"],
          "tipo-cielorraso": data["tipo-cielorraso"],
          porcelanato: data["porcelanato"],
          "rayado-o-fino-de-muros": data["rayado-o-fino-de-muros"],
          "vereda-vehiculo": data["vereda-vehiculo"],
          "vereda-peatonal-PAR-calle": data["vereda-peatonal-PAR-calle"],
          "cierre-provisorio": data["cierre-provisorio"],
          "cierre-definitivo": data["cierre-definitivo"],
          "churrasquera-de-ladrillo-y-o-hogar":
            data["churrasquera-de-ladrillo-y-o-hogar"],
          pileta: data["pileta"],
          "cuenta-con-proyecto": data["cuenta-con-proyecto"],
          "pago-aforos": data["pago-aforos"],
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
      const postResponse = await axios.post(
        "/api/actualizarExcel2Historial",
        formData
      ); // Enviar los datos del formulario
      setTimeout(() => {
        setIsSubmitComplete(true);
      }, 4000);
      // Agregar superposición de página bloqueada
      const overlay = document.createElement("div");
      overlay.className = "page-overlay";
      document.body.appendChild(overlay);
      // Mostrar tarjeta de completado
      toast({
        title: "El presupuesto se editó correctamente",
        description: "La página se recargará en 5 segundos.",
        duration: 5000,
        className: "bg-emerald-700 ",
      });
      // Esperar 5 segundos antes de recargar la página
      setTimeout(() => {
        window.location.reload();
      }, 5000);
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="gap-4 m-4 grid grid-flow-row-dense grid-cols-2 grid-rows-2 sm:grid-cols-4 sm:grid-rows-4">
            <FormField
              control={form.control}
              name="nombre-completo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre y Apellido"
                      {...field}
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
                  <FormLabel>Nombre de Obra</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de obra" {...field} disabled />
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
                    <Input placeholder="m2" {...field} disabled={!editing} />
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
                    <Input placeholder="m2" {...field} disabled={!editing} />
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
                    <Input placeholder="m2" {...field} disabled={!editing} />
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
                    <Input placeholder="m2" {...field} disabled={!editing} />
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
                    Superficie Pérgolas semi cubierta(Cochera)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="m2" {...field} disabled={!editing} />
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
                    <Input placeholder="m2" {...field} disabled={!editing} />
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
                  <FormLabel>Altura de muro planta baja</FormLabel>
                  <FormControl>
                    <Input placeholder="m2" {...field} disabled={!editing} />
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
                    <Input placeholder="m2" {...field} disabled={!editing} />
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
                    <Input placeholder="ml" {...field} disabled={!editing} />
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
                  <FormLabel>Muros interiores, churrasquera y otros </FormLabel>
                  <FormControl>
                    <Input placeholder="ml" {...field} disabled={!editing} />
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
                    <Input placeholder="ml" {...field} disabled={!editing} />
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
                    <Input placeholder="ml" {...field} disabled={!editing} />
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
                    <Input placeholder="ml" {...field} disabled={!editing} />
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
                  <FormLabel>Altura de Muro Planta baja</FormLabel>
                  <FormControl>
                    <Input placeholder="ml" {...field} disabled={!editing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tabique-durlock-pb-pa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tabique Durlock PB-PA</FormLabel>
                  <FormControl>
                    <Input placeholder="ml" {...field} disabled={!editing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balcon-con-porcelanato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Balcon con porcelanato? </FormLabel>
                  <FormControl>
                    <Input placeholder="m2" {...field} disabled={!editing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hormigon-visto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hormigón Visto</FormLabel>
                  <FormControl>
                    <Input placeholder="m2" {...field} disabled={!editing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cantidad-encuentros-PB"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad de encuentros PB</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="vertices"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cantidad-encuentros-PA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad de encuentros PA</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="vertices"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cantidad-encuentros-PA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad de encuentros PA</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="vertices"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="espesor-muro-SIP"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Cierre Provisorio</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="90" />
                        </FormControl>
                        <FormLabel className="font-normal">90</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="70" />
                        </FormControl>
                        <FormLabel className="font-normal">70</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipo-techo"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de techo SIP</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Chapa" />
                        </FormControl>
                        <FormLabel className="font-normal">Chapa</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Sip" />
                        </FormControl>
                        <FormLabel className="font-normal">Sip</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="puerta-principal-cantidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puerta principal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="puerta-interior"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puerta interior</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ventana-habitacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ventana habitación</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="puerta-ventana-habitacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puerta ventana habitación</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ventana-bano"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ventana baño</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="puerta-ventana-living"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puerta ventana living</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="puerta-lavanderia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puerta lavanderia</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vidrio-simple-dvh"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Vidrio simple o DVH</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Vidrio" />
                        </FormControl>
                        <FormLabel className="font-normal">Vidrio</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="DVH" />
                        </FormControl>
                        <FormLabel className="font-normal">DVH</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bocas-electricas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad de bocas eléctricas y tableros</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="con-cocina"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Con cocina?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="con-lavanderia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Con lavanderia?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="banos-visita"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Baños de visita?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="banos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Cantidad de Baños?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="gap-4 m-4 grid grid-flow-row-dense grid-cols-2 grid-rows-2">
            <FormField
              control={form.control}
              name="aires-acondicionados"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Aires acondicionados?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      {...field}
                      disabled={!editing}
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
                      placeholder="cantidad"
                      {...field}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="gap-4 m-4 grid grid-flow-row-dense grid-cols-2 grid-rows-2">
            <FormField
              control={form.control}
              name="pozo-septico"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Pozo séptico</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
                  <FormLabel>Cisterna enterrada</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
                  <FormLabel>Con pluviales</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
              name="agua"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Agua</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
                      disabled={!editing}
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
                      disabled={!editing}
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
              name="luz"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Luz</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
                  <FormLabel>Pozo filtrante</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
              name="tipo-calefaccion"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de calefacción</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Eléctrica" />
                        </FormControl>
                        <FormLabel className="font-normal">Eléctrica</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Agua" />
                        </FormControl>
                        <FormLabel className="font-normal">Agua</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">NO</FormLabel>
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
                  <FormLabel>Pozo filtrante</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
                  <FormLabel>Pozo filtrante</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
              name="tipo-cielorraso"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de Cielorraso</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Placa" />
                        </FormControl>
                        <FormLabel className="font-normal">Placa</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Yeso" />
                        </FormControl>
                        <FormLabel className="font-normal">Yeso</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">NO</FormLabel>
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
                      disabled={!editing}
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
                  <FormLabel>Rayado fino de muros</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
                  <FormLabel>Vereda Vehicular y peatonar per. calle</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
              name="vereda-peatonal-PAR-calle"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Vereda peatonal PAR calle</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
              name="cierre-provisorio"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Cierre Provisorio</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
              name="cierre-definitivo"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Cierre Definitivo</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
                  <FormLabel>Churrasquera de ladrillo y/o hogar</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
              name="pileta"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Pileta</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
                  <FormLabel>Parrilla</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
              name="pago-aforos"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Parrilla</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!editing}
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
          </div>
        </form>
      </Form>
    </FormWraper>
  );
}

export default FormJson2Edit;
