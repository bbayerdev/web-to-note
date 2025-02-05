'use client'
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react"


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
  //async get notes by ad by router
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/note/${id}`)
    }
  }, [id])

  //blocknote
  const editor = useCreateBlockNote();

  return (
    <main className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="px-40 py-14 gap-5 flex flex-col">
      <BlockNoteView editor={editor} />
      </div>
    </main>
  )
}
