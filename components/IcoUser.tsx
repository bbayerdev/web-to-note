import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const IcoUser = () => {
    return (
        <Avatar>
            <AvatarImage src="/xines.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}

export default IcoUser