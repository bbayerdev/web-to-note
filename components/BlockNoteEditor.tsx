// components/BlockNoteEditor.tsx
'use client'
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import { useEffect, useState } from "react"
import axios from "axios"
import { Block } from "@blocknote/core"
import { ChevronRight, Slash } from "lucide-react"
import { Input } from "./ui/input"

interface Note {
  id: string
  title: string
  content: Block[] //para garantir que vai ser um array de blocos
  date: string
  hour: string
  idUser: string
}

const BlockNoteEditor = ({ noteId }: { noteId: string }) => {
  const [note, setNote] = useState<Note | null>(null);
  const editor = useCreateBlockNote();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/note/${noteId}`);
        const fetchedNote = res.data;

        const content = Array.isArray(fetchedNote.content)
          ? fetchedNote.content
          : [{ type: "paragraph", content: "Texto padrão" }];

        setNote({ ...fetchedNote, content });

        editor.replaceBlocks(editor.document, content);
      } catch (error) {
        console.error("Erro ao buscar a nota", error);
      }
    }
    fetchNote();
  }, [noteId, editor])


  const handleUpdateContent = async () => {
    try {
      const document = editor.document
      // mapeia o conteudo do editor para o formato da api
      const updatedContent = document.map((block: Block) => ({
        ...block, // Mantém todas as propriedades originais
      }))
      

      console.log("Enviando para API:", JSON.stringify(updatedContent, null, 2));

      await axios.put(`http://localhost:3001/note/${noteId}`, {
        content: updatedContent,
        date: new Date().toISOString(),
        hour: new Date().toLocaleTimeString(),
      })

      console.log("atualizado!")
    } catch (error) {
      console.error("Erro ao atualizar o conteúdo", error)
    }
  }
  if (!editor) return null

  useEffect(() => {
    if (editor) {
      const interval = setInterval(() => {
        handleUpdateContent();
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [editor])

  return (
    <main>
      <div className="mt-4 px-8">
        <BlockNoteView editor={editor} />
      </div>
    </main>
  )
}
export default BlockNoteEditor;
