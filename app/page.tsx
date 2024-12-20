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
      <h1 className="text-3xl">page do login/cadastro</h1>
    </main>
  )
}
