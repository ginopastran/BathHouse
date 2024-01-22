"use client";

import React, { useState } from "react";
import axios from "axios";


const FormularioPage: React.FC = () => {

  return (
    <div className="  flex    p-4 gap-5">
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
  );
};

export default FormularioPage;
