'use client'
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import Confetti, { ConfettiRef } from "@/components/ui/confetti";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRef } from "react";

export default function page() {
    useEffect(() => {
        const teste_logado = localStorage.getItem('usuario')

        if (!teste_logado) {
            window.location.href = '/login'
        }
    }, [])

    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme])

    const [nome, setNome] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            const dataUser = localStorage.getItem("usuario")
            if (dataUser) {
                const parsedData = JSON.parse(dataUser)
                const nome = parsedData.nome.split(" ")[0]
                setNome(nome)
            }
            setLoading(false)
        }, 300)

        return () => clearTimeout(timer)
    }, [])

    const confettiRef = useRef<ConfettiRef>(null);

    return (
        <main className="flex h-screen flex-col justify-center items-center font-[family-name:var(--font-geist-sans)]">
            <section className="space-y-4 z-10">
                <div className="flex flex-row w-full">
                    <h1 className="text-3xl font-bold flex flex-row justify-center items-center"> Welcome to To-Note

                        {loading ?
                            (
                                <>
                                    <Skeleton className="h-7 w-28 ml-2 rounded-[4px]" />
                                </>
                            ) : (
                                <>
                                    <span className="ml-2"></span>
                                    {nome}!
                                </>
                            )
                        }

                    </h1>
                </div>


                <p className="font-[family-name:var(--font-geist-mono)]"> Your journey to organizing your ideas and notes starts now. </p>

                <h1 className="text-2xl font-bold"> What can you do with To-Note? </h1>
                <div className="flex flex-col ml-8 m-4 font-[family-name:var(--font-geist-mono)]">
                    <li>Create, edit, and organize your notes effortlessly.</li>
                    <li> Sync your ideas across all your devices.</li>
                    <li> Access everything that matters quickly and easily.</li>
                </div>

                <h1 className="font-bold">Get started now!</h1>

                <div>
                    <Link href={'/note'} className="mt-4">  <InteractiveHoverButton className="rounded-[6px]"> Go to My Dashboard </InteractiveHoverButton> </Link>

                </div>

            </section>
            <Confetti
                ref={confettiRef}
                className="absolute left-0 top-0 z-0 size-full"
                onMouseEnter={() => {
                    confettiRef.current?.fire({});
                }}
            />

            <AnimatedGridPattern
                numSquares={60}
                maxOpacity={0.2}
                duration={2}
                repeatDelay={0.5}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                )}
            />
        </main >
    )
}