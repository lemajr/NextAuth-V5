import { Boxes } from "@/components/ui/background-boxes";
import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="h-screen w-full flex flex-col gap-y-11 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c2e59c] to-[#64b3f4]">


            <div className="relative h-screen w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center ">
                <div className="absolute inset-0  w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

                <Boxes />
                <main className="flex flex-col items-center justify-center z-50">
                        <div className="py-3">
                    <Navbar />

                        </div>
                    {children}

                </main>
            </div>
        </div>
    )
}

export default ProtectedLayout;