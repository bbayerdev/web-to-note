'use client'

import { TypingAnimation } from "@/components/magicui/typing-animation"
import { Button } from "@/components/ui/button"
import { FilePlus2 } from "lucide-react"

export default function NotePage() {

  return (
    <main className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-center">
        <TypingAnimation duration={70} className="mt-8 text-3xl">Every great idea starts with a note. How about writing something?</TypingAnimation>
      </div>

      <section className="flex flex-row w-full h-full px-20 pt-10 pb-20 gap-20">
        <Button variant={'secondary'} className="w-full h-1/2 rounded-2xl bg-neutral-900">
      
        </Button>
        <div className="bg-neutral-900 w-full h-full rounded-2xl">

        </div>
      </section>

    </main>
  )
}
