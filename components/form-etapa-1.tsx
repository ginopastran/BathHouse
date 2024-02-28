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
import { useState } from "react";

const formSchema = z.object({
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
  "sup-alero":z.coerce.number().min(0),
  //cerramiento
  "pb-muros-pb-perimetro": z.coerce.number().min(0),
  "pb-muros-pb-interiores-churrasquera-otros": z.coerce.number().min(0),
  "pa-muros-pa-perimetro": z.coerce.number().min(0),
  "pa-muros-pa-interiores": z.coerce.number().min(0),
  "altura-de-muro-planta-baja": z.coerce.number().min(0),
  "altura-de-muro-planta-alta": z.coerce.number().min(0),

  //forma 2
  "tabique-durlock-pb-pa": z.coerce.number().min(0),
  //abertura
  
  "puerta-principal-tipo": z.string(),// le agreto tipo de puerta madera o chapa
  "puerta-principal-cantidad": z.coerce.number().min(0),
  "puerta-interior": z.coerce.number().min(0),
  "ventana-habitacion": z.coerce.number().min(0),
  "puerta-ventana-habitacion": z.coerce.number().min(0),
  "ventana-bano": z.coerce.number().min(0),
  "puerta-ventana-living": z.coerce.number().min(0),
  "puerta-lavanderia": z.coerce.number().min(0),
  "vidrio-simple-dvh":z.string(),
  //electricidad
  "bocas-electricas": z.coerce.number().min(0),
  
  //preguntas
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
  "losa-radiante-electrica": z.string(),
  "losa-radiante-de-agua": z.string(),
  "molduras-de-cumbrera": z.string(),
  "moldura-de-ventanas": z.string(),
  "cielorraso-de-placa-de-yeso": z.string(),
  "cielorraso-de-yeso": z.string(),
  "balcon-con-porcelanato": z.string(),
  "rayado-o-fino-de-muros": z.string(),
  "vereda-vehiculo": z.string(),
  "vereda-peatonal-PAR-calle": z.string(),
  "churrasquera-de-ladrillo-y-o-hogar": z.string(),
  pileta: z.string(),
  "cuenta-con-proyecto": z.string(),
  "pago-aforos": z.string(),
});

function FormEtapa1() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
  //datos cliente
  "nombre-completo": "",
  "nombre-obra":"",
  ubicacion: "",
  //datos plano municipal
  
  "metros-cuadrados-de-planta-baja": 0,
  "metros-cuadrados-de-planta-alta": 0,
  "superficie-p-rgolas-cubiertas-techado": 0,
  "superficie-p-rgolas-semi-cubierta-p-rgola": 0,
  "superficie-p-rgolas-semi-cochera-cubierta-p-rgola": 0,
  "sup-alero":0,
  //cerramiento
  "pb-muros-pb-perimetro": 0,
  "pb-muros-pb-interiores-churrasquera-otros":0,
  "pa-muros-pa-perimetro": 0,
  "pa-muros-pa-interiores": 0,
  "altura-de-muro-planta-baja": 0,
  "altura-de-muro-planta-alta": 0,
  //form 2
  "tabique-durlock-pb-pa": 0,
  "balcon-con-porcelanato": 0,
  "hormigon-visto": 0,
  "cantidad-encuentros-PB": 0,
  "cantidad-encuentros-PA": 0,
  "espesor-muro-SIP":90,
  "tipo-techo":"Chapa",
  //abertura

  "puerta-principal-tipo": "MADERA",// le agreto tipo de puerta madera o chapa
  "puerta-principal-cantidad": undefined,
  "puerta-interior": undefined,
  "ventana-habitacion": undefined,
  "puerta-ventana-habitacion": undefined,
  "ventana-bano": undefined,
  "puerta-ventana-living": undefined,
  "puerta-lavanderia": undefined,
  "vidrio-simple-dvh":undefined,
  //electricidad
  "bocas-electricas": undefined,
  //preguntas
  "aires-acondicionados": undefined,
  churrasquera: undefined,
  
  //otros
  "pozo-septico": "NO", 
  "cisterna-enterrada": "NO",
  "con-pluviales": "NO",
  agua: "NO",
  cloaca: "NO",
  gas: "NO",
  luz: "NO",
  "pozo-filtrante": "NO",
  "losa-radiante-electrica": "NO",
  "losa-radiante-de-agua": "NO",
  "molduras-de-cumbrera": "NO",
  "moldura-de-ventanas": "NO",
  "cielorraso-de-placa-de-yeso": "NO",
  "cielorraso-de-yeso": "NO",
  porcelanato: "NO",
  "rayado-o-fino-de-muros": "NO",
  "vereda-vehiculo": "NO",
  "vereda-peatonal-PAR-calle": "NO",
  "churrasquera-de-ladrillo-y-o-hogar": "NO",
  pileta: "NO",
  "cuenta-con-proyecto": "NO",
  "pago-aforos": "NO",
    },
  });

  const [isSubmitComplete, setIsSubmitComplete] = useState(false);

  const onSubmit = async (data: any) => {
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
  };

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
            name="sup-alero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Superficie de Aleros</FormLabel>
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
                <FormLabel>Muros planta baja Perímetro</FormLabel>
                <FormControl>
                  <Input placeholder="ml" {...field} />
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
                  <Input placeholder="ml" {...field} />
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
                  <Input placeholder="ml" {...field} />
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
                  <Input placeholder="ml" {...field} />
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
                  <Input placeholder="ml" {...field} />
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
                  <Input placeholder="ml" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="churrasquera"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Churrasquera</FormLabel>
                <FormControl>
                  <Input placeholder="Cantidad" type="number" {...field} />
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
                  <Input placeholder="Cantidad" type="number" {...field} />
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
                  <Input placeholder="Cantidad" type="number" {...field} />
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
                  <Input placeholder="Cantidad" type="number" {...field} />
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
                  <Input placeholder="Cantidad" type="number" {...field} />
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
          */} 
        </div>

        <div className="flex justify-center pt-5 pb-6 ">
          <Button type="submit" className="w-[50%]">
            Solicitar Presupuesto
          </Button>
        </div>
      </form>
    </Form>
    <div>
      {isSubmitComplete && (
        <Popover>
          <div className="flex justify-center pb-6">
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
  </>  )
}

export default FormEtapa1;
