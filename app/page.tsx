"use client";

import React, { useState } from "react";
import axios from "axios";
import Analytics from '../components/Analytics';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Nabvar';
import Newsletter from '../components/Newletter';


const FormularioPage: React.FC = () => {

  return (
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


  );
};

export default FormularioPage;
