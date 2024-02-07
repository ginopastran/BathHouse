import React from "react";
import FormEtapa2 from "@/components/form-etapa-2";
import FormEtapa1 from "@/components/form-etapa-1";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Etapa2 = () => {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="pl-6">
            Desea Editar campos del Primer Presupuesto
          </AccordionTrigger>
          <AccordionContent>
            <FormEtapa1 />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <FormEtapa2 />
    </>
  );
};

export default Etapa2;
