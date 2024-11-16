import { Boxes } from "@/components/ui/background-boxes";

const AuthLayout = ({ children }:
    {
        children: React.ReactNode
    }) => {
    return (


        <div className="relative h-screen w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center ">
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

            <Boxes />
            <main className="flex h-92 flex-col items-center justify-center z-50">

                {children}

            </main>
        </div>
    )
}

export default AuthLayout;