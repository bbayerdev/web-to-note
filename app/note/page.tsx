'use client'

import { TypingAnimation } from "@/components/magicui/typing-animation"

export default function NotePage() {

  return (
    <main className="flex flex-col h-screen items-center font-[family-name:var(--font-geist-sans)]">
      <TypingAnimation duration={70} className="mt-8 text-3xl">Every great idea starts with a note. How about writing something?</TypingAnimation>
      <div>
        
      </div>
    </main>
  )
}
