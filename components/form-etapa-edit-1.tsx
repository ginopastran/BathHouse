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
import { useEffect, useState } from "react";

import data from "@/public/Asset/edit.json";

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

function FormEtapa1Edit() {
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  // manejo de datos json para editar formulario uno
  const informacionGeneral = data;

  // Estado para manejar la edición
  const [editing, setEditing] = useState<boolean>(false);

  // Estado para almacenar todos los datos
  const [datos, setDatos] = useState({
    ...informacionGeneral,
  });

  // Estado para almacenar los datos originales
  const [datosOriginales, setDatosOriginales] = useState<any>({
    ...informacionGeneral,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "nombre-completo": data["nombre_completo"],
      ubicacion: "",
      "metros-cuadrados-de-planta-baja": datos.metros_cuadrados_planta_baja,
      "metros-cuadrados-de-planta-alta": datos.metros_cuadrados_planta_baja,
      "superficie-p-rgolas-cubiertas-techado": datos.superficie_pergolas_cubiertas_techado,
      "superficie-p-rgolas-semi-cubierta-p-rgola": datos.superficie_pergolas_semi_cubierta_pergola,
      "altura-de-muro-planta-baja": datos.altura_de_muro_planta_baja,
      "altura-de-muro-planta-alta": datos.altura_de_muro_planta_alta,
      churrasquera: datos.churrasquera,
      "aires-acondicionados": datos.churrasquera,
      "pozo-filtrante": datos.pozo_filtrante,
      "cisterna-enterrada": datos.cisterna_enterrada,
      "con-pluviales": datos.con_pluviales,
      agua: datos.agua,
      cloaca: datos.cloaca,
      gas: datos.gas,
      "pozo-filtrante-bool": datos.pozo_filtrante_bool,
      "losa-radiante-de-agua": datos.losa_radiante_de_agua,
      "losa-radiante-electrica": datos.losa_radiante_electrica,
      "molduras-de-cumbrera": datos.molduras_de_cumbrera,
      "moldura-de-ventanas": datos.moldura_de_ventanas,
      "cielorraso-de-placa-de-yeso": datos.cielorraso_de_placa_de_yeso,
      "cielorraso-de-yeso": datos.cielorraso_de_yeso,
      porcelanato: datos.porcelanato,
      "rayado-o-fino-de-muros": datos.rayado_o_fino_de_muros,
      "vereda-vehiculo": datos.vereda_vehiculo,
      "churrasquera-de-ladrillo-y-o-hogar": datos.churrasquera_de_ladrillo_y_o_hogar,
      "cuenta-con-arquitecto": datos.cuenta_con_arquitecto,
      "cuenta-con-proyecto": datos.cuenta_con_proyecto,
    },
  });

  

  // Función para manejar el botón de editar
  const handleEditarClick = () => {
    setEditing(true);
  };

  // Función para manejar el botón de guardar
  const handleGuardarClick = () => {
    // Realizar las acciones necesarias para guardar los datos, como enviar una solicitud a la API, etc.
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
    setDatos((prevDatos) => ({ ...prevDatos, [key]: value }));
  };

  // Función para manejar el envío del formulario
  const onSubmit = (data: any) => {
    // Realizar las acciones necesarias al enviar el formulario
    console.log(data);
  };
  /*   const onSubmit = async (data: any) => {
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
  }; */
  // Convertir valores numéricos a números

  console.log(datos.cisterna_enterrada);

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
                    <Input
                      placeholder=""
                      {...field}
                      onChange={(e) =>
                        handleInputChange("nombre_completo", e.target.value)
                      }
                      disabled={!editing}
                    />
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
                    onValueChange={(value) => {
                      handleInputChange("ubicacion", value);
                      field.onChange(value);
                    }}
                    defaultValue={
                      typeof datos["ubicacion"] === "string"
                        ? datos["ubicacion"]
                        : ""
                    }
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
                    <Input
                      placeholder="m2"
                      {...field}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsedValue = parseFloat(inputValue);
                        handleInputChange(
                          "metros_cuadrados_de_planta_baja",
                          isNaN(parsedValue) ? "" : parsedValue
                        );
                      }}
                      disabled={!editing}
                      type="number"
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
                      type="number"
                      {...field}
                      onChange={(e) =>
                        handleInputChange(
                          "metros_cuadrados_de_planta_alta",
                          e.target.value
                        )
                      }
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
                      {...field}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsedValue = parseFloat(inputValue);
                        handleInputChange(
                          "superficie_pergolas_cubiertas_techado",
                          isNaN(parsedValue) ? "" : parsedValue
                        );
                      }}
                      disabled={!editing}
                      type="number"
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
                      {...field}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsedValue = parseFloat(inputValue);
                        handleInputChange(
                          "superficie_pergolas_semi_cubierta_pergola",
                          isNaN(parsedValue) ? "" : parsedValue
                        );
                      }}
                      disabled={!editing}
                      type="number"
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
                    placeholder="m"
                    {...field}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const parsedValue = parseFloat(inputValue);
                      handleInputChange(
                        "altura_de_muro_planta_baja",
                        isNaN(parsedValue) ? "" : parsedValue
                      );
                    }}
                    disabled={!editing}
                    type="number"
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
                    placeholder="m"
                    {...field}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const parsedValue = parseFloat(inputValue);
                      handleInputChange(
                        "altura_de_muro_planta_alta",
                        isNaN(parsedValue) ? "" : parsedValue
                      );
                    }}
                    disabled={!editing}
                    type="number"
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
                    placeholder="m"
                    {...field}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const parsedValue = parseFloat(inputValue);
                      handleInputChange(
                        "churrasquera",
                        isNaN(parsedValue) ? "" : parsedValue
                      );
                    }}
                    disabled={!editing}
                    type="number"
                  />
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
                  <Input
                    placeholder="m"
                    {...field}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const parsedValue = parseFloat(inputValue);
                      handleInputChange(
                        "aires_acondicionados",
                        isNaN(parsedValue) ? "" : parsedValue
                      );
                    }}
                    disabled={!editing}
                    type="number"
                  />
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
                  <Input
                    placeholder="m"
                    {...field}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const parsedValue = parseFloat(inputValue);
                      handleInputChange(
                        "pozo_filtrante",
                        isNaN(parsedValue) ? "" : parsedValue
                      );
                    }}
                    disabled={!editing}
                    type="number"
                  />
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
                    <Input placeholder="Cantidad" type="number" {...field}  onChange={(e) => {
                      const inputValue = e.target.value;
                      const parsedValue = parseFloat(inputValue);
                      handleInputChange(
                        "cisterna-enterrada",
                        isNaN(parsedValue) ? "" : parsedValue
                      );
                    }}
                    disabled={!editing}
                    />
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
                    <Input placeholder="Cantidad" type="number" {...field}  onChange={(e) => {
                      const inputValue = e.target.value;
                      const parsedValue = parseFloat(inputValue);
                      handleInputChange(
                        "cisterna-enterrada",
                        isNaN(parsedValue) ? "" : parsedValue
                      );
                    }}
                    disabled={!editing}/>
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
            <Button
              type="submit"
              className="w-[50%] "
              onClick={editing ? handleGuardarClick : handleEditarClick}
            >
              {editing ? "Guardar" : "Editar"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default FormEtapa1Edit;
