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
    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme])

    const [nome, setNome] = useState("")

    useEffect(() => {
        const dataUser = localStorage.getItem("usuario");
        if (dataUser) {
            // Fazendo o parsing correto do JSON
            const parsedData = JSON.parse(dataUser);
            // Pegando apenas o nome
            const nome = parsedData.nome;
            setNome(nome); // Atualizando o estado com o nome
        }
    }, [])

    console.log(nome)

    const confettiRef = useRef<ConfettiRef>(null);

    return (
        <main className="flex h-screen flex-col justify-center items-center font-[family-name:var(--font-geist-sans)]">
            <section className="space-y-4 z-10">

                <h1 className="text-3xl font-bold"> Welcome to To-Note
                    <span className="ml-2">
                        {nome}
                    </span> !
                </h1>
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