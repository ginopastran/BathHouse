"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface CardWraperProps {
  children: React.ReactNode;
}

export const HistoryCardWraper = ({ children }: CardWraperProps) => {
  return (
    <Card className=" h-[80vh] w-full shadow-md">
      <CardContent>{children}</CardContent>
    </Card>
  );
};
