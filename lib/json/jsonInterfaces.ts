interface JsonData {
    "nombre-completo": string;
    "nombre-obra": string;
    ubicacion: string;
    "metros-cuadrados-de-planta-baja": number;
    "metros-cuadrados-de-planta-alta": number;
    "superficie-p-rgolas-cubiertas-techado": number;
    "superficie-p-rgolas-semi-cubierta-p-rgola": number;
    "superficie-p-rgolas-semi-cochera-cubierta-p-rgola": number;
    "sup-alero": number;
    "pb-muros-pb-perimetro": number;
    "pb-muros-pb-interiores-churrasquera-otros": number;
    "pa-muros-pa-perimetro": number;
    "pa-muros-pa-interiores": number;
    "altura-de-muro-planta-baja": number;
    "altura-de-muro-planta-alta": number;
    fecha: string;
}

interface JsonData2 {
    "nombre-completo": string;
    ubicacion: string;
    "nombre-obra": string;

    "metros-cuadrados-de-planta-baja": number;
    "metros-cuadrados-de-planta-alta": number;
    "superficie-p-rgolas-cubiertas-techado": number;
    "superficie-p-rgolas-semi-cubierta-p-rgola": number;
    "superficie-p-rgolas-semi-cochera-cubierta-p-rgola": number;
    "sup-alero": number;

    "altura-de-muro-planta-baja": number;
    "altura-de-muro-planta-alta": number;
    "pb-muros-pb-perimetro": number;
    "pb-muros-pb-interiores-churrasquera-otros": number;
    "pa-muros-pa-perimetro": number;
    "pa-muros-pa-interiores": number;
    //forma 2
    "tabique-durlock-pb-pa": number;
    "balcon-con-porcelanato": number;
    "hormigon-visto": number;
    "cantidad-encuentros-PB": number;
    "cantidad-encuentros-PA": number;
    "espesor-muro-SIP": string;
    "tipo-techo": string;
  //abertura

  /*   "puerta-principal-tipo": z.string(),// le agreto tipo de puerta madera o chapa
   */ "puerta-principal-cantidad": number;
    "puerta-interior": number;
    "ventana-habitacion": number;
    "puerta-ventana-habitacion": number;
    "ventana-bano": number;
    "puerta-ventana-living": number;
    "puerta-lavanderia": number;
    "vidrio-simple-dvh": string;
    //electricidad
    "bocas-electricas": number;

    //preguntas
    "con-cocina": number;
    "con-lavanderia": number;
    "banos-visita": number;
    banos: number;
    "aires-acondicionados": number;
    churrasquera: number;

    //otros
    "pozo-septico": string;
    "cisterna-enterrada": string;
    "con-pluviales": string;
    agua: string;
    cloaca: string;
    gas: string;
    luz: string;
    "pozo-filtrante": string;
    "tipo-calefaccion": string;
    "molduras-de-cumbrera": string;
    "moldura-de-ventanas": string;
    "tipo-cielorraso": string;
    porcelanato: string;
    "rayado-o-fino-de-muros": string;
    "vereda-vehiculo": string;
    "vereda-peatonal-PAR-calle": string;
    "cierre-provisorio": string;
    "cierre-definitivo": string;
    "churrasquera-de-ladrillo-y-o-hogar": string;
    pileta: string;
    "cuenta-con-proyecto": string;
    "pago-aforos": string;
    fecha: string;
}

interface JsonData3 {
    "nombre-completo": string;
    "nombre-obra": string;
    ubicacion: string;
    "metros-cuadrados-de-planta-baja": number;
    "metros-cuadrados-de-planta-alta": number;
    "superficie-p-rgolas-cubiertas-techado": number;
    "superficie-p-rgolas-semi-cubierta-p-rgola": number;
    "superficie-p-rgolas-semi-cochera-cubierta-p-rgola": number;
    "sup-alero": number;
    "pb-muros-pb-perimetro": number;
    "pb-muros-pb-interiores-churrasquera-otros": number;
    "pa-muros-pa-perimetro": number;
    "pa-muros-pa-interiores": number;
    "altura-de-muro-planta-baja": number;
    "altura-de-muro-planta-alta": number;
    fecha: string;
}