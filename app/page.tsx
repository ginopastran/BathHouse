import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { useSession } from "next-auth/react";

import React, { useState } from "react";
import axios from "axios";
import Analytics from "../components/Analytics";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Nabvar";
import Newsletter from "../components/Newletter";
import NewNavbar from "@/components/new-navbar";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <div className="mx-6 relative">
      <NewNavbar />

      <Hero />

      <div>
        {/* <Newsletter /> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
