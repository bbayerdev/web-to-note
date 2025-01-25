import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoaderCircle } from 'lucide-react'

const IcoUser = () => {

    const [img, setImg] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        const dataUser = localStorage.getItem("usuario");
        if (dataUser) {
            const parsedData = JSON.parse(dataUser);
            const imageUrl = parsedData.imageUrl
            const n = parsedData.nome
            setImg(imageUrl)
            setName(n)
        }
    }, [])

    return (
        <Avatar>
            <AvatarImage src={img || `https://avatar.vercel.sh/${name}?size=30`} />
            <AvatarFallback> <LoaderCircle className="animate-spin size-4" /> </AvatarFallback>
        </Avatar>
    )
}

export default IcoUser