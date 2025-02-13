'use client'
import { useParams } from "next/navigation"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"
import dynamic from "next/dynamic"
import { ScrollProgress } from "@/components/magicui/scroll-progress"
const BlockNoteEditor = dynamic(() => import('../../../components/BlockNoteEditor'), { ssr: false }) // importa o blocknote dinamicamente

export default function NotePage() {
  const { id } = useParams()
  const noteId = Array.isArray(id) ? id[0] : id ?? ''

  return (
    <main className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">
      <ScrollProgress/>
      <div className="px-10 pt-5 flex flex-col">
        {id && <BlockNoteEditor noteId={noteId} />}
      </div>
    </main>
  );
}
