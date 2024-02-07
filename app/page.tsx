import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import React, { useState } from "react";
import axios from "axios";
import Analytics from '../components/Analytics';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Nabvar';
import Newsletter from '../components/Newletter';

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <div>
    <main className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 to-blue-800">
    
      <div className=" space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔐 Auth
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <div>
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
      </main>
            <div>
    <Navbar />
    <Hero />
    <div className=" flex p-4 gap-5">
      <a
        href="/otro"
        className=" bg-white px-3 py-2 text-black rounded-lg text-sm font-medium"
      >
        Presupuesto 1
      </a>
      <a
        href="/etapa-2"
        className=" bg-white px-3 py-2 text-black rounded-lg text-sm font-medium"
      >
        Presupuesto 2
      </a>
    </div>
    <Analytics />
    <Newsletter />
    <Cards />
    <Footer />
      </div>


  </div>


  );
}
