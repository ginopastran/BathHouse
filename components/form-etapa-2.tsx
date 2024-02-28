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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Popoverdata from "@/components/popover-data-form2";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  //forma 2
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

export default function FormEtapa2() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
   //form 2
  "tabique-durlock-pb-pa": undefined,
  "balcon-con-porcelanato": undefined,
  "hormigon-visto": undefined,
  "cantidad-encuentros-PB": 0,
  "cantidad-encuentros-PA": 0,
  "espesor-muro-SIP":"90",
  "tipo-techo":"Chapa",
  //abertura

      /* "puerta-principal-tipo": "Madera",// le agreto tipo de puerta madera o chapa */
      "puerta-principal-cantidad": undefined,
      "puerta-interior": undefined,
      "ventana-habitacion": undefined,
      "puerta-ventana-habitacion": undefined,
      "ventana-bano": undefined,
      "puerta-ventana-living": undefined,
      "puerta-lavanderia": undefined,
      "vidrio-simple-dvh": undefined,
      //electricidad
      "bocas-electricas": undefined,
      //preguntas
      "con-cocina": undefined,
      "con-lavanderia": undefined,
      "banos-visita": undefined,
      banos: undefined,
      "aires-acondicionados": undefined,
      churrasquera: undefined,

      //otros
      "pozo-septico": "SI",
      "cisterna-enterrada": "SI",
      "con-pluviales": "SI",
      agua: "SI",
      cloaca: "SI",
      gas: "SI",
      luz: "SI",
      "pozo-filtrante": "SI",
      "tipo-calefaccion": "Eléctrica",
      "molduras-de-cumbrera": "SI",
      "moldura-de-ventanas": "SI",
      "tipo-cielorraso": "Placa",
      porcelanato: "SI",
      "rayado-o-fino-de-muros": "SI",
      "vereda-vehiculo": "SI",
      "vereda-peatonal-PAR-calle": "SI",
      "cierre-provisorio": "Si",
      "cierre-definitivo": "Si",
      "churrasquera-de-ladrillo-y-o-hogar": "SI",
      pileta: "NO",
      "cuenta-con-proyecto": "SI",
      "pago-aforos": "SI",
    },
  });

  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);

      const postResponse = await axios.post("/api/actualizarExcel2", data);

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
      setIsSubmitComplete(true);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="gap-4 m-4 grid grid-flow-row-dense grid-cols-2 grid-rows-2">
            <FormField
              control={form.control}
              name="tabique-durlock-pb-pa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tabique Durlock PB-PA</FormLabel>
                  <FormControl>
                    <Input placeholder="ml" {...field} />
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
                    <Input placeholder="m2" {...field} />
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
                    <Input placeholder="vertices" {...field} />
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
                    <Input placeholder="vertices" {...field} />
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
                    <Input placeholder="vertices" {...field} />
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
                    <Input placeholder="cantidad" {...field} />
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
                    <Input placeholder="cantidad" {...field} />
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
                    <Input placeholder="cantidad" {...field} />
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
                    <Input placeholder="cantidad" {...field} />
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
                    <Input placeholder="cantidad" {...field} />
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
                    <Input placeholder="cantidad" {...field} />
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
                    <Input placeholder="cantidad" {...field} />
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
                    <Input placeholder="cantidad" {...field} />
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
                    <Input placeholder="cantidad" {...field} />
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
                    <Input placeholder="cantidad" {...field} />
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
                    <Input placeholder="cantidad" {...field} />
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
                    <Input placeholder="cantidad" {...field} />
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
                    <Input placeholder="cantidad" {...field} />
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
                    <Input placeholder="cantidad" {...field} />
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
              name="luz"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Luz</FormLabel>
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
                  <FormLabel>Pozo filtrante</FormLabel>
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
              name="tipo-calefaccion"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de calefacción</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
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
              className="w-[50%]"
              disabled={isSubmitting || isSubmitComplete}
              onClick={() => !isSubmitting && onSubmit}
            >
              {isSubmitting && (
                <ReloadIcon
                  className={`mr-2 h-4 w-4 ${
                    isSubmitting ? "animate-spin" : ""
                  }`}
                />
              )}
              {isSubmitComplete ? "Solicitud Enviada" : "Solicitar Presupuesto"}
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
    </>
  );
}
