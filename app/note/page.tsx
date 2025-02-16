'use client'
import CardButton from "@/components/cardButton"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { Button } from "@/components/ui/button"
import { CirclePlus, Clock, FilePlus2 } from "lucide-react"

export default function NotePage() {

  return (
    <main className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-center">
        <TypingAnimation duration={70} className="mt-8 text-3xl">Every great idea starts with a note. How about writing something?</TypingAnimation>
      </div>

      <section className="flex flex-row justify-between w-full px-32 pt-14 pb-20 gap-20">
        <div>
          <div className="flex gap-1 text-muted-foreground items-center">
            <Clock size={16} strokeWidth={3} /> <span className="font-bold mt-px">Recently viewed</span>
          </div>

          <div className="grid grid-cols-3 gap-10 mt-6 ml-2">
            <CardButton/>

            <Button variant={'secondary'} className="size-40 rounded-3xl bg-neutral-900">

            </Button>

            <Button variant={'secondary'} className="size-40 rounded-3xl bg-neutral-900">

            </Button>

            <Button variant={'secondary'} className="size-40 rounded-3xl bg-neutral-900">

            </Button>

            <Button variant={'secondary'} className="size-40 rounded-3xl bg-neutral-900">

            </Button>

            <Button variant={'secondary'} className="size-40 rounded-3xl bg-neutral-900">

            </Button>

            <Button variant={'secondary'} className="size-40 rounded-3xl bg-neutral-900">

            </Button>

            <Button variant={'secondary'} className="size-40 rounded-3xl bg-neutral-900">

            </Button>
          </div>
        </div>



        <div className="bg-neutral-900 w-1/3 h-2/3 rounded-2xl mt-10">

        </div>
      </section>

    </main>
  )
}
