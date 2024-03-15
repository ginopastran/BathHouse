"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("b010b629-ab5c-4424-870d-def3f825b6f5");
  }, []);

  return null;
};
