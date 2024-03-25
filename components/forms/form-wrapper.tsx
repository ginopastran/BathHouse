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

export const FormWraper = ({ children }: CardWraperProps) => {
  return (
    <Card className=" w-[100%] shadow-md">
      <CardContent>{children}</CardContent>
    </Card>
  );
};
