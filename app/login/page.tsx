'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function Home() {
    return (
        <main className="flex justify-center items-center h-screen font-[family-name:var(--font-geist-sans)]">

            <Card className="bg-neutral-900 rounded-[6px]">
                <CardHeader>
                    <div>
                        <CardTitle>Hi there, Welcome back!</CardTitle>
                        <CardDescription className="font-[family-name:var(--font-geist-mono)]">Enter your email and password</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <div>
                        <Label>Email</Label>
                        <Input
                            className="w-full rounded-[6px] bg-transparent border text-sm p-2 font-[family-name:var(--font-geist-mono)]"
                            placeholder="Your email goes here"
                        />
                    </div>

                    <div>
                        <Label>Password</Label>
                        <Input
                            className="w-full rounded-[6px] bg-transparent border text-sm p-2 font-[family-name:var(--font-geist-mono)]"
                            placeholder="Your secret key"
                        />
                        <div className="flex justify-end">
                            <Link href='#' className="text-xs mt-1 text-muted-foreground hover:underline hover:text-white">Forgot your password?</Link>
                        </div>
                    </div>

                    <div>
                        <Button className="w-full rounded-[6px] h-8 mt-2 hover:bg-green-500">Login</Button>
                    </div>
                </CardContent>
                <CardFooter className="text-center flex justify-center text-sm gap-1 text-muted-foreground">
                    <Label>Need an account?</Label>
                    <Link className="hover:underline hover:text-white" href={'/signUp'}>Create one now</Link>
                </CardFooter>
            </Card>

        </main>
    )
}
