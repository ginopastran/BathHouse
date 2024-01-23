'use client'
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
import Popoverdata from "@/components/popoverdata";

const formSchema = z.object({
  "perimetro-lote": z.coerce.number().min(0),
  "frente-lote": z.coerce.number().min(0),
  "sup-aleros": z.coerce.number().min(0),
  "muros-PB-perimetro": z.coerce.number().min(0),
  "muros-PB-interiores-churrasquera-otros": z.coerce.number().min(0),
  "muros-steel-concrete-PA-perimetro": z.coerce.number().min(0),
  "muros-steel-concrete-PA-interiores": z.coerce.number().min(0),
  "balcon-con-porcelanato": z.coerce.number().min(0),
  "hormigon-visto": z.coerce.number().min(0),
  "puerta-principal": z.coerce.number().min(0),
  "puertas": z.coerce.number().min(0),
  "ventanas": z.coerce.number().min(0),
  "puerta-ventana": z.coerce.number().min(0),
  "cantidad-bocas-electricas-tablero": z.coerce.number().min(0),
  "cocina": z.coerce.number().min(0),
  "lavanderia": z.coerce.number().min(0),
  "banos-visita": z.coerce.number().min(0),
  "banos": z.coerce.number().min(0),
  "cierre-provisorio": z.string(),
  "cierre-definitivo": z.string(),
});


export default function FormEtapa2() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
   defaultValues: {
     "perimetro-lote": undefined,
     "frente-lote": undefined,
      "sup-aleros": undefined,
      "muros-PB-perimetro": undefined,
      "muros-PB-interiores-churrasquera-otros": undefined,
      "muros-steel-concrete-PA-perimetro": undefined,
      "muros-steel-concrete-PA-interiores": undefined,
      "balcon-con-porcelanato": undefined,
      "hormigon-visto": undefined,
      "puerta-principal": undefined,
      "puertas": undefined,
      "ventanas": undefined,
      "puerta-ventana": undefined,
      "cantidad-bocas-electricas-tablero": undefined,
      "cocina": undefined,
      "lavanderia": undefined,
      "banos-visita": undefined,
      "banos": undefined,
      "cierre-provisorio": "NO",
      "cierre-definitivo": "NO",
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
            name="perimetro-lote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perímetro del lote</FormLabel>
                <FormControl>
                  <Input placeholder="ml" {...field} />
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
                <FormLabel>Frente del Lote </FormLabel>
                <FormControl>
                  <Input placeholder="ml" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sup-aleros"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sup. Aleros</FormLabel>
                <FormControl>
                  <Input placeholder="m2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="muros-PB-perimetro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Muros PB perímetro</FormLabel>
                <FormControl>
                  <Input placeholder="ml" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="muros-PB-interiores-churrasquera-otros"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Muros PB interiores + Churrasquera + Otros</FormLabel>
                <FormControl>
                  <Input placeholder="ml" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="muros-steel-concrete-PA-perimetro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Muros Steel Concrete PA perimetro</FormLabel>
                <FormControl>
                  <Input placeholder="ml" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="muros-steel-concrete-PA-interiores"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Muros Steel Concrete PA interiores</FormLabel>
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
                <FormLabel>¿Balcon con porcelanato?</FormLabel>
                <FormControl>
                  <Input placeholder="ml" {...field} />
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
                  <Input placeholder="ml" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="puerta-principal"
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
            name="puertas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Puertas</FormLabel>
                <FormControl>
                  <Input placeholder="cantidad" {...field} />
                </FormControl>
                <FormDescription>
                    (incluye puerta de entrada principal)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ventanas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ventanas</FormLabel>
                <FormControl>
                  <Input placeholder="cantidad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="puerta-ventana"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Puerta Ventana</FormLabel>
                <FormControl>
                  <Input placeholder="cantidad" {...field} />
                </FormControl>
        
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cantidad-bocas-electricas-tablero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad de bocas eléctricas y tablero</FormLabel>
                <FormControl>
                  <Input placeholder="cantidad" {...field} />
                </FormControl>
        
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cocina"
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Con Cocina?</FormLabel>
                <FormControl>
                  <Input placeholder="cantidad" {...field} />
                </FormControl>
        
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lavanderia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Con Lavanderia?</FormLabel>
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
                <FormLabel>Cierre definitivo</FormLabel>
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
