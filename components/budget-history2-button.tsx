"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import FormEtapa1Edit from "./form-etapa-edit-1";
import FormJson1Edit from "./form-json-edit-1";
import HistoryDialog from "./history-dialog";
import HistoryDialog2 from "./history-dialog2";

interface EditJsonButtonProps {
  children: React.ReactNode;
  xlsxName: string;
}

export const BudgetHistoryButton2 = ({
  children,
  xlsxName,
}: EditJsonButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none h-auto">
        <HistoryDialog2 xlsxName={xlsxName} />
      </DialogContent>
    </Dialog>
  );
};
