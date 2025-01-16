'use client'
import { useTheme } from "next-themes";
import Particles from "@/components/ui/particles"
import { useEffect, useState } from "react";

export default function page() {
    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme])

    const [nome, setNome] = useState(""); // Estado para armazenar apenas o nome

    useEffect(() => {
        const dataUser = localStorage.getItem("usuario"); // Recupera o JSON do localStorage
        if (dataUser) {
            const { nome } = JSON.parse(dataUser); // Desestrutura o nome do objeto
            setNome(nome); // Atualiza o estado com o nome
        }
    }, [])

    return (
        <main className="flex h-screen justify-center items-center">
            <h1>
                Congratulations, {nome}! <br />
                Welcome to [Your Platform Name]
            </h1>

            <p>

            </p>

            <Particles
                className="absolute inset-0 z-0"
                quantity={100}
                ease={80}
                color={'#f5f5f5'}
                refresh
            />
        </main>
    )
}