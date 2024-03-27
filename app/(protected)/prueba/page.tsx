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
   */  "nombre-obra": z.string().min(3),
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
  const esquemaFormulario: z.Schema<FormularioPresupuestoPremiumData> = z.object({
    
});
