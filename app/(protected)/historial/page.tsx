import HistoryCard from "@/components/history-card";
import Link from "next/link";

export default function HistoryPage() {
  return (
    <div className="flex flex-col h-screen dark z-40 relative pt-8">
      <main className="flex-1 overflow-auto p-4 text-white">
        <div className="container max-w-3xl space-y-8">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">History of Requests</h1>
              <p className="text-gray-500">A timeline of key requests</p>
            </div>
          </div>
          <div className="grid gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-14">
                <div className="relative w-4 h-4 rounded-full border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950" />
              </div>
              <HistoryCard />
              <div className="space-y-1">
                <h3 className="font-bold">Request #1</h3>
                <p className="text-sm text-gray-500">January 1, 2020</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex items-center h-14 px-4 border-t border-gray-100 dark:border-gray-800"></footer>
    </div>
  );
}
