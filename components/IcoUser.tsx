import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from './ui/skeleton'
import { Loader, LoaderCircle } from 'lucide-react'

const IcoUser = () => {

    const [nome, setNome] = useState('')
    useEffect(() => {
        const dataUser = localStorage.getItem("usuario");
        if (dataUser) {
            const parsedData = JSON.parse(dataUser);
            const nome = parsedData.nome
            setNome(nome)
        }
    }, [])

    return (
        <Avatar>
            <AvatarImage src={`https://avatar.vercel.sh/${nome}?size=30`} />
            <AvatarFallback> <LoaderCircle className="animate-spin size-4" /> </AvatarFallback>
        </Avatar>
    )
}

export default IcoUser