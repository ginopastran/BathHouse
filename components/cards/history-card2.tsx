import { Button } from "@nextui-org/react";
import { useState } from "react";
import { EditJsonButton } from "../buttons/edit-json-button";
import { BudgetHistoryButton } from "../buttons/budget-history-button";
import { EditJson2Button } from "../buttons/edit-json2-button";
import { BudgetHistoryButton2 } from "../buttons/budget-history2-button";

interface HistoryCardProps {
  requestNumber: string;
  date: string;
  jsonData2: JsonData2;
}

function HistoryCard2({ requestNumber, date, jsonData2 }: HistoryCardProps) {
  const [selectedJson, setSelectedJson] = useState<JsonData2 | null>(null);

  return (
    <div className="flex items-center justify-between space-x-4  w-full px-3 py-2 rounded-2xl border-2 border-orange-700">
      <div className="space-y-1 flex items-center justify-center">
        <div className="w-14">
          <div className="relative w-4 h-4 rounded-full border border-gray-200 bg-white dark:border-orange-800 dark:bg-orange-700" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold">
            {requestNumber}
            <span className="ml-2 text-sm font-medium text-white/60">
              {" "}
              Presupuesto Avanzado
            </span>
          </h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 flex-col sm:flex-row">
        <BudgetHistoryButton2 xlsxName={requestNumber}>
          <Button
            variant="bordered"
            className="border-orange-700 w-full text-sm"
          >
            Presupuesto
          </Button>
        </BudgetHistoryButton2>
        <EditJson2Button jsonData={jsonData2}>
          <Button
            variant="bordered"
            className="border-orange-700 w-full text-sm"
          >
            Editar
          </Button>
        </EditJson2Button>
      </div>
    </div>
  );
}

export default HistoryCard2;
