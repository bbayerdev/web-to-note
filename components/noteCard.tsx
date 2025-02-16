import { File } from 'lucide-react'
import React from 'react'

type note ={
    date: string
    hour: string
    title: string
}

const NoteCard = ({title, date, hour}: note) => {
    return (
        <button className="size-40 rounded-3xl bg-neutral-900 flex flex-col justify-between p-5 hover:bg-neutral-900/80">
            <div className='flex justify-between'>
                <File size={30} />   <span className="text-xs font-bold text-muted-foreground">{hour}</span>
            </div>
            <div className="flex flex-col text-left gap-2">
                <span className="font-bold text-sm">{title}</span>

                <div className='flex gap-2'>
                    <span className="text-xs font-bold text-muted-foreground">{date}</span>

                </div>
            </div>
        </button>
    )
}

export default NoteCard