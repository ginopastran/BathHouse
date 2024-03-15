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
import Popoverdata from "@/components/popover-data";
import { useState } from "react";
import NewCompNavbar from "@/components/new-comp-navbar";
import Link from "next/link";

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
  "sup-alero": z.coerce.number().min(0),
  //cerramiento
  "pb-muros-pb-perimetro": z.coerce.number().min(0),
  "pb-muros-pb-interiores-churrasquera-otros": z.coerce.number().min(0),
  "pa-muros-pa-perimetro": z.coerce.number().min(0),
  "pa-muros-pa-interiores": z.coerce.number().min(0),
  "altura-de-muro-planta-baja": z.coerce.number().min(0),
  "altura-de-muro-planta-alta": z.coerce.number().min(0),
});

export default function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //datos cliente
      "nombre-completo": "",
      "nombre-obra": "",
      ubicacion: "",
      //datos plano municipal
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
    },
  });

  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);

      const postResponse = await axios.post("/api/actualizarExcel", data);

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

  return (
    <>
      <NewCompNavbar title="Presupuesto Básico" />
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
        {isSubmitComplete && (
          <div className="flex justify-center pb-6 relative">
            <Button type="submit" className="w-[50%]" asChild>
              <Link href="/agenda">Agendar Turno</Link>
            </Button>
          </div>
        )}
        {isSubmitComplete && (
          <div className="flex justify-center pb-6 relative">
            <Button type="submit" className="w-[50%]" asChild>
              <Link href="/etapa-2">Presupuesto Avanzado</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
