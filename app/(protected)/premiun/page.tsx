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
import { useState } from "react";
import PopoverdataPremium from "@/components/popovers/popover-premium";
import NewCompNavbar from "@/components/new-comp-navbar";

const formSchema = z.object({
  //datos cliente
  /*   "nombre-completo": z.string().min(3),
   */ "nombre-obra": z.string().min(3),
  ubicacion: z.string(),
  //datos plano municipal
  /* "per-lote": z.coerce.number().min(0).nullable(), //agregado premium
  "frente-lote": z.coerce.number().min(0).nullable(), //agregado premium */
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
  //total
  /* "sup-total":z.coerce.number().min(0),
   "sup-computo":z.coerce.number().min(0), */ //esto queda comentado porque no se sabe si se ingresa o te los da excel como respuesta
  //cerramiento
  "pb-muros-pb-perimetro": z.coerce.number().min(0).nullable(),
  "pb-muros-pb-interiores-churrasquera-otros": z.coerce
    .number()
    .min(0)
    .nullable(),
  "pa-muros-pa-perimetro": z.coerce.number().min(0).nullable(),
  "pa-muros-pa-interiores": z.coerce.number().min(0).nullable(),
  "altura-de-muro-planta-baja": z.coerce.number().min(0).nullable(),
  "altura-de-muro-planta-alta": z.coerce.number().min(0).nullable(),
  //agregado 14/03
  /* "altura-PB-muro-interno-2": z.coerce.number().min(0).nullable(), //altura de muro pa b81
  "altura-PA-muro-interno-2": z.coerce.number().min(0).nullable(), //altura de muro pa b82
  "PA-muro-perimetrales-3": z.coerce.number().min(0).nullable(), //altura de muro pa b83
  "altura-PA-muro-perimetrales-3": z.coerce.number().min(0).nullable(), //altura de muro pa b83
  "PB-muro-perimetrales-3": z.coerce.number().min(0).nullable(), //altura de muro pa b83
  "altura-PB-muro-perimetrales-3": z.coerce.number().min(0).nullable(), //altura de muro pa b83 */
  //aberturas
  //aberturas form 2
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

const partes = ["primera", "segunda", "tercera"];
export default function ProfileFormPremium() {
  const [parteActual, setParteActual] = useState("primera"); // Estado para controlar la parte actual del formulario
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //datos cliente
      /*       "nombre-completo": "",*/
      "nombre-obra": "",
      ubicacion: "",
      //datos plano municipal
      /*"per-lote": null, //agregado premium
      "frente-lote": null, //agregado premium */
      "metros-cuadrados-de-planta-baja": null,
      "metros-cuadrados-de-planta-alta": null,
      "superficie-p-rgolas-cubiertas-techado": null,
      "superficie-p-rgolas-semi-cubierta-p-rgola": null,
      "superficie-p-rgolas-semi-cochera-cubierta-p-rgola": null,
      "sup-alero": null,
      //cerramiento
      "pb-muros-pb-perimetro": null, //perimetrales muro pb b20
      "pb-muros-pb-interiores-churrasquera-otros": null, //interiores muro pb b21
      "pa-muros-pa-perimetro": null, //muros perimetrales pa b22
      "pa-muros-pa-interiores": null, //muros interiores pa b23
      "altura-de-muro-planta-baja": null, //altura de muro pb b24
      "altura-de-muro-planta-alta": null, //altura de muro pa b25
      //agregado 14/03
      /* "altura-PB-muro-interno-2": null, //altura de muro pa b81
      "altura-PA-muro-interno-2": null, //altura de muro pa b82
      "PA-muro-perimetrales-3": null, //altura de muro pa b83
      "altura-PA-muro-perimetrales-3": null, //altura de muro pa b83
      "PB-muro-perimetrales-3": null, //altura de muro pa b83
      "altura-PB-muro-perimetrales-3": null, //altura de muro pa b83 */
      //aberturas
      "puerta-principal-cantidad": null,
      "puerta-interior": null,
      "ventana-habitacion": null,
      "puerta-ventana-habitacion": null,
      "ventana-bano": null,
      "puerta-ventana-living": null,
      "puerta-lavanderia": null,
      "vidrio-simple-dvh": undefined,
      //casasip
      "balcon-con-porcelanato": null,
      "cantidad-encuentros-PB": null,
      "cantidad-encuentros-PA": null,
      "espesor-muro-SIP": "90",
      "piso-suspendido-sip": "SI", //agregado premium
    },
  });

  const handleNext = () => {
    const currentIndex = partes.indexOf(parteActual);
    if (currentIndex < partes.length - 1) {
      setParteActual(partes[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = partes.indexOf(parteActual);
    if (currentIndex > 0) {
      setParteActual(partes[currentIndex - 1]);
    }
  };

  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // Ajustar los valores de los campos que estén undefined a 0
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
      //agregado 14/03
      /* if (data["altura-PB-muro-interno-2"] === null) {
        data["altura-PB-muro-interno-2"] = 0;
      }
      if (data["altura-PA-muro-interno-2"] === null) {
        data["altura-PA-muro-interno-2"] = 0;
      }
      if (data["PA-muro-perimetrales-3"] === null) {
        data["PA-muro-perimetrales-3"] = 0;
      }
      if (data["altura-PA-muro-perimetrales-3"] === null) {
        data["altura-PA-muro-perimetrales-3"] = 0;
      }
      if (data["PB-muro-perimetrales-3"] === null) {
        data["PB-muro-perimetrales-3"] = 0;
      }
      if (data["altura-PB-muro-perimetrales-3"] === null) {
        data["altura-PB-muro-perimetrales-3"] = 0;
      }*/
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
      // Hacer una solicitud a tu API para enviar los datos del formulario

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

  return (
    <>
      <NewCompNavbar title="Presupuesto Premium" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
          <div>
            {parteActual === "primera" && (
              <div className="">
                <div className="gap-4 m-4 grid grid-flow-row-dense grid-cols-2 grid-rows-2">
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
                          <SelectItem value="Buenos Aires">
                            Buenos Aires
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                
                  />
                </div>
                <div className="flex  justify-center items-center ">
                      
                    <button className="flex justify-center bg-orange-600  p-2 sm:p-3 rounded-lg uppercase lg:text-2xl sm:text-xl text-md font-bold w-2/6" onClick={handleNext}>Siguiente</button>
                </div>
              </div>
            )}
            {parteActual === "segunda" && (
              <div className="">
                <div className="gap-4 m-4 grid grid-flow-row-dense grid-cols-2 grid-rows-2">

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
                      <FormLabel>
                        Superficie Pérgolas cubiertas (techado)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m2"
                          value={field.value ?? ""}
                          onChange={field.onChange}
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  
                </div>
                <div className="flex items-center content-center justify-around">

                <button onClick={handlePrevious} className="flex justify-center bg-orange-600  p-2 sm:p-3 rounded-lg uppercase lg:text-2xl sm:text-xl text-md font-bold w-2/6">Anterior</button>
                <button onClick= {handleNext} className="flex justify-center bg-orange-600  p-2 sm:p-3 rounded-lg uppercase lg:text-2xl sm:text-xl text-md font-bold w-2/6">Siguiente</button>
                </div>
              </div>
            )}
            {parteActual === "tercera" && (
              <div className="">
                <div className="gap-4 m-4 grid grid-flow-row-dense grid-cols-2 grid-rows-2">
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
                      <FormLabel>
                        Muros interiores churrasqueras y otros
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m2"
                          value={field.value ?? ""}
                          onChange={field.onChange}
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* agregado 14/03 */}
                {/*      <FormField
              control={form.control}
              name="altura-PB-muro-interno-2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura de muro interno PB</FormLabel>
                  <FormControl>
                    <Input placeholder="m2" value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="altura-PA-muro-interno-2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura de muro interno PA</FormLabel>
                  <FormControl>
                    <Input placeholder="m2" value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PA-muro-perimetrales-3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura de muro perimetrales PA</FormLabel>
                  <FormControl>
                    <Input placeholder="m2" value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="altura-PA-muro-perimetrales-3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura de muro perimetrales PA</FormLabel>
                  <FormControl>
                    <Input placeholder="m2" value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PB-muro-perimetrales-3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura de muro perimetrales PB</FormLabel>
                  <FormControl>
                    <Input placeholder="m2" value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="altura-PB-muro-perimetrales-3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura de muro perimetrales PB</FormLabel>
                  <FormControl>
                    <Input placeholder="m2" value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
                <div className="flex justify-center items-center">
                {!isSubmitComplete && (
                <button onClick={handlePrevious} className="bg-orange-600 w-1/3 p-2 sm:p-3 rounded-lg uppercase lg:text-2xl sm:text-xl text-md font-bold">Anterior</button>
                )}

                </div>
              </div>
            )}
          </div>
          {!isSubmitComplete && (
            <div>

          {parteActual !== "primera" && parteActual !== "segunda" && (
            <div className="flex justify-center pt-5 pb-6 ">
              <Button
                type="submit"
                className="bg-orange-600 w-[%50] text-white p-2 sm:p-3 rounded-lg uppercase lg:text-2xl sm:text-xl text-md font-bold"
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
        )}|
            </div>
        )}

        </form>

        <div>
          {isSubmitComplete && (
            <Popover>
              <div className="flex justify-center pb-6 relative">
              <PopoverTrigger className="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-white hover:bg-orange-400/90 h-10 w-[50%]">
                  

                  Mirar el presupuesto
                  
                </PopoverTrigger>
              </div>
              <PopoverContent className=" h-[70vh] w-[80vw]">
                <PopoverdataPremium />
              </PopoverContent>
            </Popover>
          )}
          {isSubmitComplete && (
            <div className="flex justify-center pb-6 relative">
              <Button
                className="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-white hover:bg-orange-400/90 h-10 w-[50%]"
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
    </>
  );
}
