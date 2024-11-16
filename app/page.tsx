import { Gloria_Hallelujah } from "next/font/google";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/Login-button";
const fontGloria = Gloria_Hallelujah({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-r from-teal-400 to-yellow-200">
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
  );
}
