'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeClosed } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { BorderBeam } from "@/components/ui/border-beam"
import { useTheme } from "next-themes";
import Particles from "@/components/ui/particles"
import axios from 'axios'
import { toast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster"

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
    const { resolvedTheme } = useTheme()
    const [color, setColor] = useState("#ffffff")
    const passwordRef = useRef<HTMLInputElement>(null)

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


    useEffect(() => {
        localStorage.clear()
    }, [])

    // async login
    const [error, setError] = useState<boolean>(false)
    async function loginUser(data: FormData) {

        try {
            const res = await axios.post("http://localhost:3001/login", {
                email: data.email,
                senha: data.password
            });

            if (res.status === 200) {
                const usuario = res.data.usuario
                console.log(usuario);

                toast({
                    title: "Login realizado!",
                    description: "Você será redirecionado em 2 segundos.",
                    className: 'bg-green-500 border-none rounded-[6px]',
                    duration: 2000,
                })

                setTimeout(() => {
                    router.push("/note");
                }, 2000)
            }
        }
        catch (error: any) {
            if (error.response?.status === 401) {
                toast({
                    title: "Invalid credentials!",
                    description: "Please check your password.",
                    className: 'bg-red-500 border-none rounded-[6px]',
                    duration: 5000,
                })
            }
            else if (error.response?.status === 404) {
                toast({
                    title: "User not found!",
                    description: "Please check your email or sign up for an account.",
                    className: 'bg-red-500 border-none rounded-[6px]',
                    duration: 5000,
                })
            }
        }
    }
    const router = useRouter()

    const onSubmit = async (data: FormData) => {
        await loginUser(data);
    }

    return (
        <main className="flex justify-center items-center h-screen font-[family-name:var(--font-geist-sans)] overflow-hidden">
            <Card className="bg-neutral-900 rounded-[20px] w-auto h-auto relative z-10 shadow-2xl">
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
                                        className="text-muted-foreground w-full rounded-[6px] bg-transparent text-sm border p-2 font-[family-name:var(--font-geist-mono)]"
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
                        <div>
                            <Button type="submit" variant={'secondary'} className="w-full rounded-[6px] mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Login with Google
                            </Button>
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
            <Toaster />
        </main>
    )
}
