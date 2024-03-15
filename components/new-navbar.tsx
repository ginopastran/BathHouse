"use client";

import { Navbar, NavbarContent } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export default function NewNavbar() {
  return (
    <header className=" py-[3rem] px-[9rem] flex items-center gap-3">
      <Image
        src="/bathouse-logo.png"
        alt="Bathouse-Logo"
        width={90}
        height={90}
        className="pb-3 "
      />
      <Image
        src="/bathouse-logo-name.png"
        alt="Bathouse-Logo"
        width={224}
        height={224}
        className=" absolute left-56 hidden sm:block"
      />
    </header>
  );
}
