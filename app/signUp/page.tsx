'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeClosed, Info, Loader, UserPen } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { BorderBeam } from "@/components/ui/border-beam"
import { useTheme } from "next-themes";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from "next/navigation"
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern"
import { cn } from "@/lib/utils"

const schema = z
    .object({
        email: z
            .string()
            .email('Invalid email')
            .nonempty('Email required'),
        name: z
            .string()
            .nonempty('Name is required')
            .min(4, 'Min 4 characters'),
        password: z
            .string()
            .min(8, 'Min 8 characters')
            .regex(/[A-Z]/, 'Must include uppercase')
            .regex(/[0-9]/, 'Must include number')
            .regex(/[@$!%*?&#]/, 'Must include special char')
            .nonempty('Password required'),
        confirmPass: z.string().nonempty('Confirm password'),
    })
    .refine((data) => data.password === data.confirmPass, {
        message: 'Passwords mismatch',
        path: ['confirmPass'], // Aponta o erro para o campo `confirmPass`
    });

type FormData = {
    email: string
    name: string
    password: string
    confirmPass: string
}

export default function Home() {
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);

    useEffect(() => {
        localStorage.clear()
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    // async login
    const [loading, setLoading] = useState(false)
    async function signUp(data: FormData) {
        setLoading(true)
        try {
            const res = await axios.post("http://localhost:3001/usuario", {
                nome: data.name,
                email: data.email,
                senha: data.confirmPass
            })

            if (res.status === 201) {
                const usuario = res.data
                //salva o usuário no localStorage
                localStorage.setItem("usuario", JSON.stringify(usuario))
                console.log(usuario)
                toast({
                    title: "Login Successful!",
                    description: "You will be redirected in 2 seconds",
                    className: 'bg-green-500 border-none rounded-[20px]',
                    duration: 2000,
                })

                setTimeout(() => {
                    router.push("/signUp/congratulations");
                }, 2000)
            }

        }
        catch (error: any) {
            if (error.response?.status === 400) {
                toast({
                    title: "Email Already in Use",
                    description: "Please check your password",
                    className: 'bg-red-500 border-none rounded-[20px]',
                    duration: 5000,
                })
                setLoading(false)
            }
        }
    }
    const router = useRouter()

    const onSubmit = async (data: FormData) => {
        await signUp(data)
    }

    return (
        <main className="flex justify-center items-center h-screen font-[family-name:var(--font-geist-sans)] overflow-hidden">
            <Card className="bg-neutral-900 rounded-[20px] w-auto h-auto relative z-10 shadow-2xl">
                <CardHeader>
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <CardTitle className="text-3xl">Hello!</CardTitle>

                            <TooltipProvider>
                                <Link href={'/'}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <img src="/icoBranco.ico" alt="icon to-note" className="size-7 pointer-events-none" />
                                        </TooltipTrigger>
                                        <TooltipContent className="rounded-[6px]" side="right">
                                            <p>What is To-Note? <br /> Click here to learn more!</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </Link>
                            </TooltipProvider>
                        </div>
                        <CardTitle className="text-xl">Sign up to start using To-Note now</CardTitle>
                        <CardDescription className="font-[family-name:var(--font-geist-mono)]">Fill out the form below to create your account</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label>Email</Label>
                            <Input
                                className="text-muted-foreground w-full rounded-[6px] bg-transparent border text-sm p-2 font-[family-name:var(--font-geist-mono)]"
                                placeholder="Your best email goes here"
                                {...register("email")}
                            />

                            {errors.email && <p className="text-xs ml-1 mt-1 text-red-500">{errors.email.message}</p>}
                        </div>

                        <div>
                            <Label>Name</Label>
                            <Input
                                className="text-muted-foreground w-full rounded-[6px] bg-transparent border text-sm p-2 font-[family-name:var(--font-geist-mono)]"
                                placeholder="What should we call you?"
                                {...register("name")}
                            />

                            {errors.name && <p className="text-xs ml-1 mt-1 text-red-500">{errors.name.message}</p>}
                        </div>

                        <div>
                            <div className="flex items-center gap-2 pb-1">
                                <Label>Password</Label>
                                <HoverCard>
                                    <HoverCardTrigger className="cursor-pointer">
                                        <Info strokeWidth={'2'} className="size-3" />
                                    </HoverCardTrigger>
                                    <HoverCardContent className="rounded-[6px] text-sm">
                                        - Min 8 characters <br />
                                        - Must include uppercase <br />
                                        - Must include number <br />
                                        - Must include special char <br />
                                    </HoverCardContent>
                                </HoverCard>
                            </div>

                            <div className="flex-col">
                                <div className="flex gap-2">
                                    <Input
                                        className="text-muted-foreground w-full rounded-[6px] bg-transparent border text-sm p-2 font-[family-name:var(--font-geist-mono)]"
                                        placeholder="Pick a secret password"
                                        type={show ? "text" : "password"}
                                        {...register("password")}
                                    />

                                    <Button type="button" onClick={() => setShow(!show)} variant={'secondary'} className="rounded-[6px]">
                                        {show ? <Eye /> : <EyeClosed />}
                                    </Button>
                                </div>
                                {errors.password && <p className="text-xs ml-1 mt-1 text-red-500">{errors.password.message}</p>}
                            </div>
                        </div>

                        <div>
                            <Label>Confirm password</Label>
                            <div className="flex-col">
                                <div className="flex gap-2">
                                    <Input
                                        className="text-muted-foreground w-full rounded-[6px] bg-transparent border text-sm p-2 font-[family-name:var(--font-geist-mono)]"
                                        placeholder="Confirm your secret password"
                                        type={show2 ? "text" : "password"}
                                        {...register("confirmPass")}
                                    />

                                    <Button type="button" onClick={() => setShow2(!show2)} variant={'secondary'} className="rounded-[6px]">
                                        {show2 ? <Eye /> : <EyeClosed />}
                                    </Button>
                                </div>
                                {errors.confirmPass && <p className="text-xs ml-1 mt-1 text-red-500">{errors.confirmPass.message}</p>}
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">

                            {loading ? (
                                <Button className="w-full rounded-[6px] mt-4" disabled>
                                    <Loader className="animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full rounded-[6px] mt-4"> <UserPen /> Sign up </Button>
                            )}

                        </div>
                    </form>
                </CardContent>
                <CardFooter className="text-center flex justify-center text-sm gap-1 text-muted-foreground">
                    <Label>Already have an account?</Label>
                    <Link className="hover:underline hover:text-white" href={'/login'}>Login now</Link>
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
    )
}
