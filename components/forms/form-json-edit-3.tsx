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
  "nombre-obra": string;
  ubicacion: string;
  //datos plano municipal
  "per-lote": number; //agregado premium
  "frente-lote": number; //agregado premium
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

  "puerta-principal-cantidad": number;
  "puerta-interior": number;
  "ventana-habitacion": number;
  "puerta-ventana-habitacion": number;
  "ventana-bano": number;
  "puerta-ventana-living": number;
  "puerta-lavanderia": number;
  "vidrio-simple-dvh": string;
  //casasip form 2
  "balcon-con-porcelanato": number;
  "cantidad-encuentros-PB": number;
  "cantidad-encuentros-PA": number;
  "espesor-muro-SIP": string;
  "piso-suspendido-sip": string; //agregado premium
  fecha: string;
}

interface FormEtapa1EditProps {
  data: Datos | null;
}

const formSchema = z.object({
  //datos cliente
  "nombre-completo": z.string().min(3),
  "nombre-obra": z.string().min(3),
  ubicacion: z.string(),
  //datos plano municipal
  "per-lote": z.coerce.number().min(0).nullable(), //agregado premium
  "frente-lote": z.coerce.number().min(0).nullable(), //agregado premium
  "metros-cuadrados-de-planta-baja": z.coerce.number().min(0).nullable(),
  "metros-cuadrados-de-planta-alta": z.coerce.number().min(0).nullable(),
  "superficie-p-rgolas-cubiertas-techado": z.coerce.number().min(0).nullable(),
  "superficie-p-rgolas-semi-cubierta-p-rgola": z.coerce
    .number()
    .min(0)
    .nullable(),
  "superficie-p-rgolas-semi-cochera-cubierta-p-rgola": z.coerce
    .number()
    .min(0)
    .nullable(),
  "sup-alero": z.coerce.number().min(0).nullable(),
  "pb-muros-pb-perimetro": z.coerce.number().min(0).nullable(),
  "pb-muros-pb-interiores-churrasquera-otros": z.coerce
    .number()
    .min(0)
    .nullable(),
  "pa-muros-pa-perimetro": z.coerce.number().min(0).nullable(),
  "pa-muros-pa-interiores": z.coerce.number().min(0).nullable(),
  "altura-de-muro-planta-baja": z.coerce.number().min(0).nullable(),
  "altura-de-muro-planta-alta": z.coerce.number().min(0).nullable(),
  "puerta-principal-cantidad": z.coerce.number().min(0).nullable(),
  "puerta-interior": z.coerce.number().min(0).nullable(),
  "ventana-habitacion": z.coerce.number().min(0).nullable(),
  "puerta-ventana-habitacion": z.coerce.number().min(0).nullable(),
  "ventana-bano": z.coerce.number().min(0).nullable(),
  "puerta-ventana-living": z.coerce.number().min(0).nullable(),
  "puerta-lavanderia": z.coerce.number().min(0).nullable(),
  "vidrio-simple-dvh": z.string(),
  //casasip form 2
  "balcon-con-porcelanato": z.coerce.number().min(0).nullable(),
  "cantidad-encuentros-PB": z.coerce.number().min(0).nullable(),
  "cantidad-encuentros-PA": z.coerce.number().min(0).nullable(),
  "espesor-muro-SIP": z.string(),
  "piso-suspendido-sip": z.string(), //agregado premium
});

function FormJson3Edit({ data }: FormEtapa1EditProps) {
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [informacionGeneral, setInformacionGeneral] = useState(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [datos, setDatos] = useState<Datos | null>(null);
  const [datosOriginales, setDatosOriginales] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
      ? {
          "nombre-completo": data["nombre-completo"],
          "nombre-obra": data["nombre-obra"],
          ubicacion: data["ubicacion"],
          //datos plano municipal
          "per-lote": data["per-lote"], //agregado premium
          "frente-lote": data["frente-lote"], //agregado premium
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
          "pb-muros-pb-perimetro": data["pb-muros-pb-perimetro"], //perimetrales muro pb b20
          "pb-muros-pb-interiores-churrasquera-otros":
            data["pb-muros-pb-interiores-churrasquera-otros"], //interiores muro pb b21
          "pa-muros-pa-perimetro":
            data["pb-muros-pb-interiores-churrasquera-otros"], //muros perimetrales pa b22
          "pa-muros-pa-interiores": data["pa-muros-pa-interiores"], //muros interiores pa b23
          "altura-de-muro-planta-baja": data["altura-de-muro-planta-baja"], //altura de muro pb b24
          "altura-de-muro-planta-alta": data["altura-de-muro-planta-alta"], //altura de muro pa b25

          "puerta-principal-cantidad": data["puerta-principal-cantidad"],
          "puerta-interior": data["puerta-interior"],
          "ventana-habitacion": data["ventana-habitacion"],
          "puerta-ventana-habitacion": data["puerta-ventana-habitacion"],
          "ventana-bano": data["ventana-bano"],
          "puerta-ventana-living": data["puerta-ventana-living"],
          "puerta-lavanderia": data["puerta-lavanderia"],
          "vidrio-simple-dvh": data["vidrio-simple-dvh"],
          //casasip
          "balcon-con-porcelanato": data["balcon-con-porcelanato"],
          "cantidad-encuentros-PB": data["cantidad-encuentros-PB"],
          "cantidad-encuentros-PA": data["cantidad-encuentros-PA"],
          "espesor-muro-SIP": data["espesor-muro-SIP"],
          "piso-suspendido-sip": data["piso-suspendido-sip"],
        }
      : {},
  });

  // Función para manejar el botón de editar
  const handleEditarClick = () => {
    setEditing(true);
  };

  // Función para manejar el botón de guardar
  const handleGuardarClick = async (data: any) => {
    try {
      setIsSubmitting(true);
      const formData = form.getValues(); // Obtener los valores actuales del formulario
      if (data["per-lote"] === undefined) {
        data["per-lote"] = 0;
      }
      if (data["frente-lote"] === null) {
        data["frente-lote"] = 0;
      }
      if (data["metros-cuadrados-de-planta-baja"] === null) {
        data["metros-cuadrados-de-planta-baja"] = 0;
      }
      if (data["metros-cuadrados-de-planta-alta"] === null) {
        data["metros-cuadrados-de-planta-alta"] = 0;
      }
      if (data["superficie-p-rgolas-cubiertas-techado"] === null) {
        data["superficie-p-rgolas-cubiertas-techado"] = 0;
      }
      if (data["superficie-p-rgolas-semi-cubierta-p-rgola"] === null) {
        data["superficie-p-rgolas-semi-cubierta-p-rgola"] = 0;
      }
      if (data["superficie-p-rgolas-semi-cochera-cubierta-p-rgola"] === null) {
        data["superficie-p-rgolas-semi-cochera-cubierta-p-rgola"] = 0;
      }
      if (data["sup-alero"] === null) {
        data["sup-alero"] = 0;
      }
      if (data["pb-muros-pb-perimetro"] === null) {
        data["pb-muros-pb-perimetro"] = 0;
      }
      if (data["pb-muros-pb-interiores-churrasquera-otros"] === null) {
        data["pb-muros-pb-interiores-churrasquera-otros"] = 0;
      }
      if (data["pa-muros-pa-perimetro"] === null) {
        data["pa-muros-pa-perimetro"] = 0;
      }
      if (data["pa-muros-pa-interiores"] === null) {
        data["pa-muros-pa-interiores"] = 0;
      }
      if (data["altura-de-muro-planta-baja"] === null) {
        data["altura-de-muro-planta-baja"] = 0;
      }
      if (data["altura-de-muro-planta-alta"] === null) {
        data["altura-de-muro-planta-alta"] = 0;
      }
      if (data["puerta-principal-cantidad"] === undefined) {
        data["puerta-principal-cantidad"] = 0;
      }
      if (data["puerta-interior"] === null) {
        data["puerta-interior"] = 0;
      }
      if (data["ventana-habitacion"] === null) {
        data["ventana-habitacion"] = 0;
      }
      if (data["puerta-ventana-habitacion"] === null) {
        data["puerta-ventana-habitacion"] = 0;
      }
      if (data["ventana-bano"] === null) {
        data["ventana-bano"] = 0;
      }
      if (data["puerta-ventana-living"] === null) {
        data["puerta-ventana-living"] = 0;
      }
      if (data["puerta-lavanderia"] === null) {
        data["puerta-lavanderia"] = 0;
      }
      if (data["balcon-con-porcelanato"] === null) {
        data["balcon-con-porcelanato"] = 0;
      }
      if (data["cantidad-encuentros-PB"] === null) {
        data["cantidad-encuentros-PB"] = 0;
      }
      if (data["cantidad-encuentros-PA"] === null) {
        data["cantidad-encuentros-PA"] = 0;
      }
      const postResponse = await axios.post("/api/actualizarExcel3", formData); // Enviar los datos del formulario
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

  const onDownload = async () => {
    try {
      setIsDownloading(true);
      // Hacer una solicitud a tu API para obtener los datos de la hoja VIP en formato Excel

      const response = await axios.get("/api/descargarExcel", {
        responseType: "arraybuffer", // Indica que los datos deben ser tratados como un array de bytes
        headers: {
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      // console.log(response.data);

      // Crear un objeto Blob con los datos
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Crear una URL para el Blob
      const url = URL.createObjectURL(blob);

      // Crear un enlace temporal y hacer clic en él para iniciar la descarga
      const link = document.createElement("a");
      link.href = url;
      link.download = "VIP.xlsx";
      link.click();

      // Liberar la URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar la hoja VIP:", error);
    } finally {
      setIsDownloading(false);
    }
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
          <div className="gap-4 m-4 grid grid-flow-row-dense grid-cols-2 grid-rows-2">
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
              name="per-lote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perimetro de lote</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      disabled={!editing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frente-lote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frente de lote</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      disabled={!editing}
                    />
                  </FormControl>
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
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      disabled={!editing}
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
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      disabled={!editing}
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
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      disabled={!editing}
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
                    Superficie Pérgolas semi cubierta(Cochera)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                  <FormLabel>Superficie Alero</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                  <FormLabel>Perimetro muros planta baja</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                  <FormLabel>Muros interiores churrasqueras y otros</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                  <FormLabel>Perimetro de muros Planta Alta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                  <FormLabel>Muros interiores planta alta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                  <FormLabel>Altura de muro planta baja</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                  <FormLabel>Altura de muro planta alta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      disabled={!editing}
                    />
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
                  <FormLabel>Puerta principal cantidad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                  <FormLabel>Ventana habitacion</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                  <FormLabel>Puerta ventana habitacion</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cantidad"
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                <FormItem>
                  <FormLabel>Vidrio simple/DVH</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!editing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Simple">Simple</SelectItem>
                        <SelectItem value="DVH">DVH</SelectItem>
                      </SelectContent>
                    </Select>
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
                  <FormLabel>Balcon con porcelanato</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m2"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      disabled={!editing}
                    />
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
                      placeholder="Vertice"
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
                  <FormLabel>Cantidad de encuentros PB</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Vertice"
                      value={field.value ?? ""}
                      onChange={field.onChange}
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
              name="piso-suspendido-sip"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Piso suspendido SIP</FormLabel>
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
        <div>
          <div className="flex justify-center pb-6 relative">
            <Button
              className="w-[50%]"
              disabled={isDownloading}
              onClick={onDownload}
            >
              {isDownloading && (
                <ReloadIcon
                  className={`mr-2 h-4 w-4 ${
                    isDownloading ? "animate-spin" : ""
                  }`}
                />
              )}
              Descargar Excel VIP
            </Button>
          </div>
        </div>
      </Form>
    </FormWraper>
  );
}

export default FormJson3Edit;
