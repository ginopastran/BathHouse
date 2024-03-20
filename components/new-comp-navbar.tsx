"use client";

import { Navbar, NavbarContent } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NewCompNavbarProps {
  title: string;
}

export default function NewCompNavbar({ title }: NewCompNavbarProps) {
  return (
    <header className="py-[2rem] px-[4rem] flex items-center gap-3 pb-[7rem]">
      <Link href="/">
        <Image
          src="/bathouse-logo.png"
          alt="Bathouse-Logo"
          width={90}
          height={90}
          className="absolute hidden sm:block"
        />
        <Image
          src="/bathouse-logo.png"
          alt="Bathouse-Logo"
          width={90}
          height={90}
          className="absolute block sm:hidden left-2"
        />
      </Link>
      <Link href="/">
        <Image
          src="/bathouse-logo-name.png"
          alt="Bathouse-Logo"
          width={224}
          height={224}
          className=" absolute left-36 hidden lg:block top-[3.2rem]"
        />
      </Link>
      <h1 className=" absolute top-12 right-14 sm:right-36 sm:top-14 uppercase text-xl sm:text-3xl font-bold">
        {title}
      </h1>
    </header>
  );
}
