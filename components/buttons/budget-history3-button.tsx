"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import HistoryDialog3 from "../dialogs/history-dialog3";

interface EditJsonButtonProps {
  children: React.ReactNode;
  xlsxName: string;
}

export const BudgetHistoryButton3 = ({
  children,
  xlsxName,
}: EditJsonButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none h-auto">
        <HistoryDialog3 xlsxName={xlsxName} />
      </DialogContent>
    </Dialog>
  );
};
