'use client'
import { useTheme } from "next-themes";
import Particles from "@/components/ui/particles"
import { useEffect, useState } from "react";

export default function page() {
    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);

    return (
        <main className="flex h-screen justify-center items-center">
            <h1>
                "Congratulations, [User's Name]!" <br />
                Welcome to [Your Platform Name]
            </h1>
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