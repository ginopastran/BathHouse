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
import Popoverdata from "@/components/popoverdata";

const formSchema = z.object({
  "nombre-completo": z.string().min(3),
  ubicacion: z.string(),
  "metros-cuadrados-de-planta-baja": z.coerce.number().min(0),
  "metros-cuadrados-de-planta-alta": z.coerce.number().min(0),
  "superficie-p-rgolas-cubiertas-techado": z.coerce.number().min(0),
  "superficie-p-rgolas-semi-cubierta-p-rgola": z.coerce.number().min(0),
  "altura-de-muro-planta-baja": z.coerce.number().min(0),
  "altura-de-muro-planta-alta": z.coerce.number().min(0),
  churrasquera: z.coerce.number().min(0),
  "aires-acondicionados": z.coerce.number().min(0),
  "pozo-filtrante": z.coerce.number().min(0),
  "cisterna-enterrada": z.coerce.number().min(0),
  "con-pluviales": z.coerce.number().min(0),
  agua: z.string(),
  cloaca: z.string(),
  gas: z.string(),
  "pozo-filtrante-bool": z.string(),
  "losa-radiante-de-agua": z.string(),
  "losa-radiante-electrica": z.string(),
  "molduras-de-cumbrera": z.string(),
  "moldura-de-ventanas": z.string(),
  "cielorraso-de-placa-de-yeso": z.string(),
  "cielorraso-de-yeso": z.string(),
  porcelanato: z.string(),
  "rayado-o-fino-de-muros": z.string(),
  "vereda-vehiculo": z.string(),
  "churrasquera-de-ladrillo-y-o-hogar": z.string(),
  "cuenta-con-arquitecto": z.string(),
  "cuenta-con-proyecto": z.string(),
});
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "nombre-completo": "",
      ubicacion: "",
      "metros-cuadrados-de-planta-baja": undefined,
      "metros-cuadrados-de-planta-alta": undefined,
      "superficie-p-rgolas-cubiertas-techado": undefined,
      "superficie-p-rgolas-semi-cubierta-p-rgola": undefined,
      "altura-de-muro-planta-baja": undefined,
      "altura-de-muro-planta-alta": undefined,
      churrasquera: undefined,
      "aires-acondicionados": undefined,
      "pozo-filtrante": undefined,
      "cisterna-enterrada": undefined,
      "con-pluviales": undefined,
      agua: "NO",
      cloaca: "NO",
      gas: "NO",
      "pozo-filtrante-bool": "NO",
      "losa-radiante-de-agua": "NO",
      "losa-radiante-electrica": "NO",
      "molduras-de-cumbrera": "NO",
      "moldura-de-ventanas": "NO",
      "cielorraso-de-placa-de-yeso": "NO",
      "cielorraso-de-yeso": "NO",
      porcelanato: "NO",
      "rayado-o-fino-de-muros": "NO",
      "vereda-vehiculo": "NO",
      "churrasquera-de-ladrillo-y-o-hogar": "NO",
      "cuenta-con-arquitecto": "NO",
      "cuenta-con-proyecto": "NO",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const postResponse = await axios.post("/api/actualizarExcel", data);

      const fileName = postResponse.data.fileName;

      const getResponse = await axios.get("/api/actualizarExcel", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([getResponse.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
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
                  <Input placeholder="m2" type="number" {...field} />
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
                  <Input placeholder="m2" type="number" {...field} />
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
                  <Input placeholder="m2" type="number" {...field} />
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
                  <Input placeholder="m2" type="number" {...field} />
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
                  <Input placeholder="m" type="number" {...field} />
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
                  <Input placeholder="m" type="number" {...field} />
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
        </div>

        <div className="flex justify-center pt-5 pb-6 ">
          <Button type="submit" className="w-[50%]">
            Solicitar de Presupuesto
          </Button>

        </div>
      </form>
    </Form>
    <div>

    <Popover>
      <div className="flex justify-center pb-6">

    <PopoverTrigger className="  rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-[50%]">Mirar el presupuesto</PopoverTrigger>
      </div>
    <PopoverContent className="h-[800px] w-screen">
      <Popoverdata />
    </PopoverContent>
  </Popover>
    </div>
    </>
  );
}
