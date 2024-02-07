'use client'
import React from 'react';
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
    <div className='text-white z-0 absolute flex flex-col top-36 md:top-60 xl:top-64 justify-center w-full'>
      <div className='max-w-[800px] mt-[-96px] w-full h-m-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          BATHOUSE 🔐 Auth
        </p>
        <h1
          className={cn(
            "text-[#00df9a] font-bold p-2 drop-shadow-md",
            font.className
          )}
        >
Hacemos tu casa        
</h1>
        <div className='flex justify-center items-center md:pt-32 pt-20 xl:pt-56'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Precio, Calidad, y el mejor Servicio
          </p>
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Deja tu proyecto en nuestras manos, te brindamos un hogar.</p>
        <div>
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;