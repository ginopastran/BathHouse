"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import FormJson2Edit from "./form-json-edit-2";
import FormJson3Edit from "./form-json-edit-3";

interface EditJsonButtonProps {
  children: React.ReactNode;
  jsonData: JsonData3 | null;
}

export const EditJson3Button = ({
  children,
  jsonData,
}: EditJsonButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 bg-transparent sm:min-w-[60rem] min-w-[20rem]  border-none max-h-screen md:h-auto ">
        <FormJson3Edit data={jsonData} />
      </DialogContent>
    </Dialog>
  );
};
