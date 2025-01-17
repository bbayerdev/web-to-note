'use client'
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function page() {
    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme])

    const [nome, setNome] = useState("")

    useEffect(() => {
        const dataUser = localStorage.getItem("usuario")
        if (dataUser) {
            const { nome } = JSON.parse(dataUser)
            const primeiroNome = nome.split(" ")[0]
            setNome(primeiroNome)
        }
    }, [])

    return (
        <main className="flex h-screen flex-col justify-center items-center font-[family-name:var(--font-geist-sans)]">
            <section className="space-y-4">
                <h1 className="text-2xl font-bold"> Welcome to To-Note <span className="italic">{nome}</span> ! <br />
                </h1>
                <p className="font-[family-name:var(--font-geist-mono)]"> Your journey to organizing your ideas and notes starts now. </p>

                <h1 className="text-xl font-bold"> What can you do with To-Note? </h1>
                <div className="flex flex-col ml-8 m-4 font-[family-name:var(--font-geist-mono)]">
                    <li>Create, edit, and organize your notes effortlessly.</li>
                    <li> Sync your ideas across all your devices.</li>
                    <li> Access everything that matters quickly and easily.</li>
                </div>

                <h1 className="font-bold">Get started now!</h1>

                <Button variant={"secondary"} className="rounded-[6px]">Go to My Dashboard <Rocket /> </Button>
            </section>
        </main>
    )
}