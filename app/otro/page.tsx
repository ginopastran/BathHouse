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

/* const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
}); */
const items = [
  {
    id: "SI",
    label: "SI",
  },
  {
    id: "NO",
    label: "NO",
  },
];

export default function ProfileForm() {
  // 1. Define your form.
  const form = useForm({
    defaultValues: {
      "nombre-completo": "",
      "ubicacion": "",
      "metros-cuadrados-de-planta-baja": "",
      "metros-cuadrados-de-planta-alta": "",
      "superficie-p-rgolas-cubiertas-techado": "",
      "superficie-p-rgolas-semi-cubierta-p-rgola": "",
      "superficie-cochera-semi-cubierta-p-rgola": "", 
      "altura-de-muro-planta-baja": "",
      "altura-de-muro-planta-alta": "",
      "tabique-durlock-pb-pa": "",
      "churrasquera": "",
      "cant-banos": "",
      "aires-acondicionados": "",
      "pozo-filtrante": "",
      "cisterna-enterrada": "",
      "con-pluviales": "",
      "agua": "",
      "cloaca": "",
      "gas": "",
      "luz": "",
      "pozo-filtrante-bool": "",
      "losa-radiante-de-agua": "",
      "losa-radiante-electrica": "",
      "molduras-de-cumbrera": "",
      "moldura-de-ventanas": "",
      "cielorraso-de-placa-de-yeso": "",
      "cielorraso-de-yeso": "",
      "porcelanato": "",
      "rayado-o-fino-de-muros": "",
      "vereda-vehiculo": "",
      "churrasquera-de-ladrillo-y-o-hogar": "",
      "cierre-provisorio": "",
      "cuenta-con-arquitecto": "",
      "cuenta-con-proyecto": "",
    },
  });

  // 2. Define a submit handler.
      const onSubmit = async (data: any) => {
        try {
          // Enviar datos al servidor
          await axios.post("/api/actualizarExcel", data);
    
          const response = await axios.get("/api/actualizarExcel", {
            responseType: "blob",
          });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "BATHOUSE-Enero-2024.xlsx");
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
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
              {/*          <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              {/*   <FormDescription>
                You can manage email addresses in your{" "}
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metros-cuadrados-de-planta-baja"
          type="number"
          required
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metros cuadrados de planta baja</FormLabel>
              <FormControl>
                <Input placeholder="m2" {...field} />
              </FormControl>
              {/*          <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metros-cuadrados-de-planta-alta"
          type="number"
          required
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metros cuadrados de planta alta</FormLabel>
              <FormControl>
                <Input placeholder="m2" {...field} />
              </FormControl>
              {/*          <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="superficie-p-rgolas-cubiertas-techado"
          type="number"
          required
          render={({ field }) => (
            <FormItem>
              <FormLabel>Superficie Pérgolas cubiertas (techado)</FormLabel>
              <FormControl>
                <Input placeholder="m2" {...field} />
              </FormControl>
              {/*          <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="superficie-p-rgolas-semi-cubierta-p-rgola"
          type="number"
          required
          render={({ field }) => (
            <FormItem>
              <FormLabel>Superficie Pérgolas semi cubierta (pérgola)</FormLabel>
              <FormControl>
                <Input placeholder="m2" {...field} />
              </FormControl>
              {/*          <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="superficie-cochera-semi-cubierta-p-rgola"
          type="number"
          required
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sup cochera semi cubierta(pergola)</FormLabel>
              <FormControl>
                <Input placeholder="m2" {...field} />
              </FormControl>
              {/*          <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="altura-de-muro-planta-baja"
          type="number"
          required
          render={({ field }) => (
            <FormItem>
              <FormLabel>Altura de muro planta baja</FormLabel>
              <FormControl>
                <Input placeholder="ml" {...field} />
              </FormControl>
              {/*          <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="altura-de-muro-planta-alta"
          type="number"
          required
          render={({ field }) => (
            <FormItem>
              <FormLabel>Altura de muro planta alta</FormLabel>
              <FormControl>
                <Input placeholder="ml" {...field} />
              </FormControl>
              {/*          <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tabique-durlock-pb-pa"
          type="number"
          required
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tabiques Durlock PB-PA</FormLabel>
              <FormControl>
                <Input placeholder="ml" {...field} />
              </FormControl>
              {/*          <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="churrasquera"
          type="number"
          required
          render={({ field }) => (
            <FormItem>
              <FormLabel>Churrasquera</FormLabel>
              <FormControl>
                <Input placeholder="Cantidad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cant-banos"
          type="number"
          required
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad de baños</FormLabel>
              <FormControl>
                <Input placeholder="Cantidad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aires-acondicionados"
          type="number"
          required
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aires Acondicionados</FormLabel>
              <FormControl>
                <Input placeholder="Cantidad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pozo-filtrante"
          type="number"
          required
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pozo Filtrante</FormLabel>
              <FormControl>
                <Input placeholder="Cantidad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cisterna-enterrada"
          type="number"
          required
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cisterna Enterrada</FormLabel>
              <FormControl>
                <Input placeholder="Cantidad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="con-pluviales"
          type="number"
          required
          render={({ field }) => (
            <FormItem>
              <FormLabel>Con Pluviales</FormLabel>
              <FormControl>
                <Input placeholder="Cantidad" {...field} />
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
                    <FormLabel className="font-normal">
                      Si
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="NO" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                <FormLabel>Vereda vehicular y peatonal peperndic. a la calle</FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                <FormLabel>Cierre provisorio</FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                        Si
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        No
                        </FormLabel>
                    </FormItem>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            </div>

        <div className="flex justify-center pt-5 pb-6 ">
        <Button type="submit" className="w-[50%]">Solicitar de Presupuesto</Button>
        </div>
      </form>
    </Form>
  );
}
