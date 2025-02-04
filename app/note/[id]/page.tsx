'use client'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { Check } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function NotePage() {

  const [idUser, setIdUser] = useState<string | undefined>()
  useEffect(() => {
    const dataUser = localStorage.getItem("usuario")
    if (dataUser) {
      const parsedData = JSON.parse(dataUser)
      const id = parsedData.id
      setIdUser(id)
    }
  }, [])

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lastTextareaRef = useRef<HTMLTextAreaElement>(null)

  const handleFocus = () => {
    if (textareaRef.current) {
      textareaRef.current.select()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target
    target.style.height = "auto"
    target.style.height = `${target.scrollHeight}px`
    setTitle(target.value)
  }

  useEffect(() => {
    if (lastTextareaRef.current) {
      lastTextareaRef.current.focus()
    }
  }, [])

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  //async get notes by ad by router
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/note/${id}`)
        .then(response => {
          setTitle(response.data.tittle || 'New Note'),
          setBody(response.data.body || '')
        })
        .catch(error => console.error("Erro ao buscar nota:", error));
    }
  }, [id])

  return (
    <main className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="px-40 py-14 gap-5 flex flex-col">
        <form className="flex flex-col gap-2">
          <div className="flex gap-3 justify-between">
            <p className="text-sm text-neutral-600 font-bold font-[family-name:var(--font-geist-mono)]">
           
            </p>
            <Button
              type="submit"
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
              value={title}
              onInput={handleInput}
              onFocus={handleFocus}
              className="text-4xl font-bold border-none focus:outline-none focus:ring-0 w-full resize-none"
            />

            <Textarea
              ref={lastTextareaRef}
              placeholder="Write your note here..."
              value={body}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = "auto"
                target.style.height = `${target.scrollHeight}px`
                setBody(target.value)
              }}
              className="text-xl font-bold border-none focus:outline-none focus:ring-0 w-full resize-none font-[family-name:var(--font-geist-mono)]"
            />
          </div>
        </form>
      </div>
    </main>
  )
}
