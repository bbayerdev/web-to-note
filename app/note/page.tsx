'use client'

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function Home() {

  const currentDate = new Date().toLocaleDateString()

  return (
    <main className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">

      <div className="px-40 py-14 gap-5 flex flex-col">
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 justify-between">
            <p className=" text-sm text-neutral-600 font-bold font-[family-name:var(--font-geist-mono)]">{currentDate.toString()} // note creation date</p>
            <Button size={"sm"} variant={"ghost"} className="h-min rounded-[6px] hover:bg-green-500/30 text-green-500 hover:text-gre"> <Check /> Save Note</Button>
          </div>
          <h1 className="text-4xl mt-8 font-bold">
            Your-Note // tittle of note <span className="text-neutral-600 text-3xl font-[family-name:var(--font-geist-mono)]">#6 // number of note</span>
          </h1>

        </div>

        <p className="text-xl font-[family-name:var(--font-geist-mono)]">
          Write your note here...
        </p>
      </div>

    </main>
  )
}
