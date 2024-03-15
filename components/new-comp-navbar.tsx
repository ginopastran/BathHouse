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
          className="absolute"
        />
      </Link>
      <Link href="/">
        <Image
          src="/bathouse-logo-name.png"
          alt="Bathouse-Logo"
          width={224}
          height={224}
          className=" absolute left-36 hidden sm:block top-[3.2rem]"
        />
      </Link>
      <h1 className=" absolute right-36 top-14 uppercase text-3xl font-bold">
        {title}
      </h1>
    </header>
  );
}
