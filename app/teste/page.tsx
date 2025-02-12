'use client'
import { useParams } from "next/navigation"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"
import dynamic from "next/dynamic"
const BlockNoteEditor = dynamic(() => import('../../components/BlockNoteEditor'), { ssr: false }) // importa o blocknote dinamicamente

export default function NotePage() {

  return (
    <main className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="px-10 pt-5 flex flex-col">
        <BlockNoteEditor noteId="" />
      </div>
    </main>
  );
}
