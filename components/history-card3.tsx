import { Button } from "@nextui-org/react";
import { useState } from "react";
import { EditJsonButton } from "./edit-json-button";
import { BudgetHistoryButton } from "./budget-history-button";

interface HistoryCardProps {
  requestNumber: string;
  date: string;
  jsonData3: JsonData3;
}

function HistoryCard3({ requestNumber, date, jsonData3 }: HistoryCardProps) {
  const [selectedJson, setSelectedJson] = useState<JsonData | null>(null);

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
              Presupuesto Básico
            </span>
          </h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 flex-col sm:flex-row">
        <BudgetHistoryButton xlsxName={requestNumber}>
          <Button
            variant="bordered"
            className="border-orange-700 w-full text-sm"
          >
            Presupuesto
          </Button>
        </BudgetHistoryButton>
        <EditJsonButton jsonData={jsonData3}>
          <Button
            variant="bordered"
            className="border-orange-700 w-full text-sm"
          >
            Editar
          </Button>
        </EditJsonButton>
      </div>
    </div>
  );
}

export default HistoryCard3;
