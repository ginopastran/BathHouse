"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
const Hero = () => {
  return (
    <div className="text-white z-0  flex flex-col  justify-center w-full">
      <div className="max-w-[800px] mt-[-96px] w-full h-m-screen mx-auto text-center flex flex-col justify-center">
        <div className="flex justify-center items-center pt-24">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
            Precio, Calidad, y el mejor Servicio
          </p>
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500">
          Deja tu proyecto en nuestras manos, te brindamos un hogar.
        </p>
        {/* <div className='pt-6'>
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </LoginButton>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
