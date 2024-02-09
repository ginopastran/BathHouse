import { Poppins } from "next/font/google";

import React, { useState } from "react";
import axios from "axios";
import Analytics from "../components/Analytics";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Nabvar";
import Newsletter from "../components/Newletter";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <><header className="relative text-gray-400 body-font w-full">
      <div className="relative w-full md:h-screen h-[100vmin]">
        <img
          src="Asset/bathouse-header.jpeg" alt="background image"
          className="absolute md:inset-0 md:h-screen h-[100vmin] w-100% md:overflow-hidden " />


        <Hero />

      </div>
    </header><div>

        <Newsletter />
        <Footer />
      </div></>
  );
}

