"use client";

import { Gloria_Hallelujah } from "next/font/google";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/Login-button";
const fontGloria = Gloria_Hallelujah({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

import React from "react";
import { Boxes } from "@/components/ui/background-boxes";


const page = () => {
  return (
      <div className="relative h-screen w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center ">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
  
        <Boxes />
        <main className="flex h-92 flex-col items-center justify-center bg-gradient-to-r z-50">
 
        <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-lg">
          Auth 🛡️
        </h1>
        <p
          className={cn(
            "text-white text-lg text-center drop-shadow-lg",
            fontGloria.className
          )}
          >
          Authentication for the Web.
        </p>
        <div>
          <LoginButton>
          <Button variant="secondary" size="lg">
            Sign in{" "}
          </Button>
          </LoginButton>
         </div>
      </div>
          </main>
      </div>
  )
}

export default page