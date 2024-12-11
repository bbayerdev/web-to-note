'use client'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const currentDate = new Date().toLocaleDateString()
  const [value, setValue] = useState("To-Note // your tittle")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lastTextareaRef = useRef<HTMLTextAreaElement>(null)

  const handleFocus = () => {
    if (textareaRef.current) {
      textareaRef.current.select() // Seleciona o texto
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target
    target.style.height = "auto" // Redefine a altura
    target.style.height = `${target.scrollHeight}px` // Ajusta para o conteúdo
    setValue(target.value)
  }

  useEffect(() => {
    if (lastTextareaRef.current) {
      lastTextareaRef.current.focus()
    }
  }, [])

  return (
    <main className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="px-40 py-14 gap-5 flex flex-col">
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 justify-between">
            <p className="text-sm text-neutral-600 font-bold font-[family-name:var(--font-geist-mono)]">
              {currentDate}
            </p>
            <Button
              size="sm"
              variant="ghost"
              className="h-min rounded-[6px] hover:bg-green-500/30 text-green-500 hover:text-gre"
            >
              <Check /> Save Note
            </Button>
          </div>
          <div className="flex flex-col py-5">
            <Textarea
              ref={textareaRef}
              value={value}
              onInput={handleInput}
              onFocus={handleFocus}
              className="text-4xl font-bold border-none focus:outline-none focus:ring-0 w-full resize-none"
            />

            <Textarea
              ref={lastTextareaRef} // Referência para o último Textarea
              placeholder="Write your note here..."
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = "auto"
                target.style.height = `${target.scrollHeight}px`
              }}
              className="text-xl font-bold border-none focus:outline-none focus:ring-0 w-full resize-none font-[family-name:var(--font-geist-mono)]"
            />

          </div>
        </div>
      </div>
    </main>
  )
}
