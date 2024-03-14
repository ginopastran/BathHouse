"use client";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
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
import Popoverdata from "@/components/popover-data-form3";
import { useState } from "react";

const formSchema = z.object({
  //datos cliente
  "nombre-completo": z.string().min(3),
  "nombre-obra": z.string().min(3),
  ubicacion: z.string(),
  //datos plano municipal
  "per-lote": z.coerce.number().min(0), //agregado premium
  "frente-lote": z.coerce.number().min(0), //agregado premium
  "metros-cuadrados-de-planta-baja": z.coerce.number().min(0),
  "metros-cuadrados-de-planta-alta": z.coerce.number().min(0),
  "superficie-p-rgolas-cubiertas-techado": z.coerce.number().min(0),
  "superficie-p-rgolas-semi-cubierta-p-rgola": z.coerce.number().min(0),
  "superficie-p-rgolas-semi-cochera-cubierta-p-rgola": z.coerce.number().min(0),
  "sup-alero": z.coerce.number().min(0),
  //total
  /* "sup-total":z.coerce.number().min(0),
   "sup-computo":z.coerce.number().min(0), */ //esto queda comentado porque no se sabe si se ingresa o te los da excel como respuesta
  //cerramiento
  "pb-muros-pb-perimetro": z.coerce.number().min(0),
  "pb-muros-pb-interiores-churrasquera-otros": z.coerce.number().min(0),
  "pa-muros-pa-perimetro": z.coerce.number().min(0),
  "pa-muros-pa-interiores": z.coerce.number().min(0),
  "altura-de-muro-planta-baja": z.coerce.number().min(0),
  "altura-de-muro-planta-alta": z.coerce.number().min(0),
  //aberturas form 2
  "puerta-principal-cantidad": z.coerce.number().min(0),
  "puerta-interior": z.coerce.number().min(0),
  "ventana-habitacion": z.coerce.number().min(0),
  "puerta-ventana-habitacion": z.coerce.number().min(0),
  "ventana-bano": z.coerce.number().min(0),
  "puerta-ventana-living": z.coerce.number().min(0),
  "puerta-lavanderia": z.coerce.number().min(0),
  "vidrio-simple-dvh": z.string(),
  //casasip form 2
  "balcon-con-porcelanato": z.coerce.number().min(0),
  "cantidad-encuentros-PB": z.coerce.number().min(0),
  "cantidad-encuentros-PA": z.coerce.number().min(0),
  "espesor-muro-SIP": z.string(),
  "piso-suspendido-sip": z.string(), //agregado premium
});

export default function ProfileFormPremium() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //datos cliente
      "nombre-completo": "",
      "nombre-obra": "",
      ubicacion: "",
      //datos plano municipal
      "per-lote": 0, //agregado premium
      "frente-lote": 0, //agregado premium
      "metros-cuadrados-de-planta-baja": 0,
      "metros-cuadrados-de-planta-alta": 0,
      "superficie-p-rgolas-cubiertas-techado": 0,
      "superficie-p-rgolas-semi-cubierta-p-rgola": 0,
      "superficie-p-rgolas-semi-cochera-cubierta-p-rgola": 0,
      "sup-alero": 0,
      //cerramiento
      "pb-muros-pb-perimetro": 0,
      "pb-muros-pb-interiores-churrasquera-otros": 0,
      "pa-muros-pa-perimetro": 0,
      "pa-muros-pa-interiores": 0,
      "altura-de-muro-planta-baja": 0,
      "altura-de-muro-planta-alta": 0,
      //aberturas
      "puerta-principal-cantidad": undefined,
      "puerta-interior": undefined,
      "ventana-habitacion": undefined,
      "puerta-ventana-habitacion": undefined,
      "ventana-bano": undefined,
      "puerta-ventana-living": undefined,
      "puerta-lavanderia": undefined,
      "vidrio-simple-dvh": undefined,
      //casasip
      "balcon-con-porcelanato": undefined,
      "cantidad-encuentros-PB": 0,
      "cantidad-encuentros-PA": 0,
      "espesor-muro-SIP": "90",
      "piso-suspendido-sip": "SI", //agregado premium
    },
  });

  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);

      const postResponse = await axios.post("/api/actualizarExcel3", data);

      // const fileName = postResponse.data.fileName;

      // const getResponse = await axios.get("/api/actualizarExcel", {
      //   responseType: "blob",
      // });
      // const url = window.URL.createObjectURL(new Blob([getResponse.data]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", fileName);
      // document.body.appendChild(link);
      // link.click();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      setIsSubmitComplete(true);
    }
  };

  const onDownload = async () => {
    try {
      // Hacer una solicitud a tu API para obtener los datos de la hoja VIP en formato Excel
      const response = await axios.get("/api/descargarExcel", {
        responseType: "arraybuffer", // Indica que los datos deben ser tratados como un array de bytes
        headers: {
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

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
    }
  };

  return (
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
                  <Input placeholder="Nombre y Apellido" {...field} />
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
                  <Input placeholder="Nombre de obra" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="Cantidad" {...field} />
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
                  <Input placeholder="Cantidad" {...field} />
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
                  <Input placeholder="Cantidad" {...field} />
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
                  <Input placeholder="Cantidad" {...field} />
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
                  <Input placeholder="Cantidad" {...field} />
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
                  <Input placeholder="Cantidad" {...field} />
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
                  <Input placeholder="Cantidad" {...field} />
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
                  <Input placeholder="m2" {...field} />
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
                  <Input placeholder="Vertice" {...field} />
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
                  <Input placeholder="Vertice" {...field} />
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
          {/* <Button
              type="submit"
              className="w-[50%]"
              disabled={isSubmitting || isSubmitComplete}
              onClick={() => !isSubmitting && onSubmit}
            >
              {isSubmitComplete ? "Solicitud Enviada" : "Solicitar Presupuesto"}
            </Button> */}
          <Button
            type="submit"
            className="w-[50%]"
            disabled={isSubmitting || isSubmitComplete}
            onClick={() => !isSubmitting && onSubmit}
          >
            {isSubmitting && (
              <ReloadIcon
                className={`mr-2 h-4 w-4 ${isSubmitting ? "animate-spin" : ""}`}
              />
            )}
            {isSubmitComplete ? "Solicitud Enviada" : "Solicitar Presupuesto"}
          </Button>
        </div>
      </form>
      <div>
        {isSubmitComplete && (
          <Popover>
            <div className="flex justify-center pb-6 relative">
              <PopoverTrigger className="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-[50%]">
                Mirar el presupuesto
              </PopoverTrigger>
            </div>
            <PopoverContent className=" h-[70vh] w-[80vw]">
              <Popoverdata />
            </PopoverContent>
          </Popover>
        )}
        {!isSubmitComplete && (
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
        )}
      </div>
    </Form>
  );
}
