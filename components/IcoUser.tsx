'use client'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoaderCircle, LogOut, User } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'

const IcoUser = () => {
    const [img, setImg] = useState<string | null>(null)
    const [name, setName] = useState<string | null>(null)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true) // para nao dar erro de hidratacao
        const dataUser = localStorage.getItem("usuario")
        if (dataUser) {
            const parsedData = JSON.parse(dataUser)
            setImg(parsedData.imageUrl)
            setName(parsedData.nome)
        }
    }, [])

    const handleLogout = async () => {
        await signOut({ redirect: false })
        window.location.href = '/login'
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="rounded-full focus-visible:ring-0 focus-visible:ring-offset-0" size={'icon'} variant={'ghost'}>
                    <Avatar className="size-8">
                        <AvatarImage src={img || `https://avatar.vercel.sh/${name}?size=30`} />
                        <AvatarFallback> <LoaderCircle className="animate-spin size-4" /> </AvatarFallback>
                    </Avatar>
                </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="mr-5 rounded-[6px] bg-neutral-900 font-[family-name:var(--font-geist-sans)]">
                <DropdownMenuLabel>My accont</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='rounded-[6px]'> <User /> Profile</DropdownMenuItem>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className='rounded-[6px] text-red-500'> <LogOut />Log out</DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="font-[family-name:var(--font-geist-sans)] rounded-[20px]" >
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Logging out will end your session, and you will need to log in again to access your account of <span className="italic">To-Note</span>.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-[6px]">Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout} className="rounded-[6px] hover:bg-red-500">
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default IcoUser
