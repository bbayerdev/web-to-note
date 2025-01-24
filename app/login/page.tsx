'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeClosed, Loader, UserPen } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { BorderBeam } from "@/components/ui/border-beam"
import { useTheme } from "next-themes";
import axios from 'axios'
import { toast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern"
import { Separator } from "@/components/ui/separator"
import GoogleLoginButton from "./GoogleLoginButton"
import { SessionProvider } from "next-auth/react"

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
    const [loading, setLoading] = useState<boolean>(false)
    async function loginUser(data: FormData) {
        setLoading(true)
        try {
            const res = await axios.post("http://localhost:3001/login", {
                email: data.email,
                senha: data.password
            });

            if (res.status === 200) {
                const usuario = res.data.usuario
                //salva o usuário no localStorage
                localStorage.setItem("usuario", JSON.stringify(usuario))
                console.log(usuario);

                toast({
                    title: "You're logged in!",
                    description: "You will be redirected shortly",
                    className: 'bg-green-500 border-none rounded-[20px]',
                    duration: 2000,
                })

                setTimeout(() => {
                    router.push("/note");
                }, 1000)
            }
        }
        catch (error: any) {
            if (error.response?.status === 401) {
                toast({
                    title: "Invalid credentials!",
                    description: "Please check your password",
                    className: 'bg-red-500 border-none rounded-[20px]',
                    duration: 5000,
                })
            }
            else if (error.response?.status === 404) {
                toast({
                    title: "User not found!",
                    description: "Please check your email or sign up for an account",
                    className: 'bg-red-500 border-none rounded-[20px]',
                    duration: 5000,
                })
            }
            setLoading(false)
        }
    }
    const router = useRouter()

    const onSubmit = async (data: FormData) => {
        await loginUser(data);
    }

    return (
        <SessionProvider>
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
                                <div className="flex gap-2 items-center">

                                    {loading ? (
                                        <Button className="w-full rounded-[6px] mt-4" disabled>
                                            <Loader className="animate-spin" />
                                            Please wait
                                        </Button>
                                    ) : (
                                        <Button type="submit" className="w-full rounded-[6px] mt-4"> Login</Button>
                                    )}

                                </div>
                            </div>
                            <div className="justify-center items-center gap-2 flex w-full">
                                <Separator orientation="horizontal" className="w-20" />
                                <p className="text-xs text-muted-foreground">Or log in with</p>
                                <Separator orientation="horizontal" className="w-20" />
                            </div>
                        </form>
                        <div className="mt-2">
                            <GoogleLoginButton />
                        </div>

                    </CardContent>
                    <CardFooter className="text-center flex justify-center text-sm gap-1 text-muted-foreground">
                        <Label>Need an account?</Label>
                        <Link className="hover:underline hover:text-white" href={'/signUp'}>Create one now</Link>
                    </CardFooter>
                    <BorderBeam borderWidth={2} colorFrom="#fafafa" colorTo="#737373" />
                </Card>
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
                <Toaster />
            </main>
        </SessionProvider>
    )
}
