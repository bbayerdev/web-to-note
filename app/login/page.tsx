'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeClosed } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { BorderBeam } from "@/components/ui/border-beam"
import { useTheme } from "next-themes";
import Particles from "@/components/ui/particles"

const schema = z.object({
    email: z.string().email('Please enter a valid email address').nonempty('Please enter a valid email address'),
    password: z.string().nonempty('Please enter your password')
})

type FormData = {
    email: string
    password: string
}

export default function Home() {
    const [show, setShow] = useState(false)
    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <main className="flex justify-center items-center h-screen font-[family-name:var(--font-geist-sans)] overflow-hidden">
            <Card className="bg-neutral-900 rounded-xl w-auto h-auto relative p-1 z-10 shadow-2xl">
                <CardHeader>
                    <div>
                        <CardTitle>Hi there, Welcome back!</CardTitle>
                        <CardDescription className="font-[family-name:var(--font-geist-mono)]">Enter your email and password</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label>Email</Label>
                            <Input
                                className="text-muted-foreground w-full rounded-[6px] bg-transparent border text-sm p-2 font-[family-name:var(--font-geist-mono)]"
                                placeholder="Your email goes here"
                                {...register("email")}
                            />

                            {errors.email && <p className="text-xs ml-1 mt-1 text-red-500">{errors.email.message}</p>}
                        </div>
                        <div>
                            <Label>Password</Label>
                            <div className="flex-col">
                                <div className="flex gap-2">
                                    <Input
                                        className="text-muted-foreground w-full rounded-[6px] bg-transparent border text-sm p-2 font-[family-name:var(--font-geist-mono)]"
                                        placeholder="Your secret key"
                                        type={show ? "text" : "password"}
                                        {...register("password")}
                                    />

                                    <Button type="button" onClick={() => setShow(!show)} variant={'secondary'} className="rounded-[6px]">
                                        {show ? <Eye /> : <EyeClosed />}
                                    </Button>
                                </div>
                                {errors.password && <p className="text-xs ml-1 mt-1 text-red-500">{errors.password.message}</p>}
                            </div>

                            <div className="flex justify-end">
                                <Link href='#' className="text-xs mt-1 text-muted-foreground hover:underline hover:text-white">Forgot your password?</Link>
                            </div>
                        </div>

                        <div>
                            <Button type="submit" className="w-full rounded-[6px] mt-2">Login</Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="text-center flex justify-center text-sm gap-1 text-muted-foreground">
                    <Label>Need an account?</Label>
                    <Link className="hover:underline hover:text-white" href={'/signUp'}>Create one now</Link>
                </CardFooter>
                <BorderBeam borderWidth={2} colorFrom="#fafafa" colorTo="#737373" />
            </Card>
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
