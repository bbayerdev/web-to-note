import { CirclePlus } from 'lucide-react'
import React from 'react'

const CardButton = () => {
    return (
        <button className="size-40 rounded-3xl bg-green-500/10 hover:bg-green-500/15 flex flex-col justify-between p-6">
            <div>
                <CirclePlus size={36} color="#22c55e" />
            </div>
            <div className="flex flex-col text-left">
                <span className="font-bold text-xl">Create</span>

                <span className="">New Note</span>
            </div>
        </button>
    )
}

export default CardButton