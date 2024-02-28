import { Button } from "@nextui-org/react";

interface HistoryCardProps {
  requestNumber: string;
  date: string;
}

function HistoryCard({ requestNumber, date }: HistoryCardProps) {
  return (
    <div className="flex items-center justify-between space-x-4  w-full px-3 py-2 rounded-2xl border-2 border-blue-950">
      <div className="space-y-1 flex items-center justify-center">
        <div className="w-14">
          <div className="relative w-4 h-4 rounded-full border border-gray-200 bg-white dark:border-slate-700 dark:bg-blue-950" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold">{requestNumber}</h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <Button variant="bordered" className="border-blue-950">
          Editar
        </Button>
      </div>
    </div>
  );
}

export default HistoryCard;
