// NotePage.tsx
'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import dynamic from "next/dynamic";

// Importa o componente BlockNoteEditor de forma dinâmica
const BlockNoteEditor = dynamic(() => import('../../../components/BlockNoteEditor'), { ssr: false });

export default function NotePage() {
  const [idUser, setIdUser] = useState<string | undefined>();
  const { id } = useParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataUser = localStorage.getItem("usuario");
      if (dataUser) {
        const parsedData = JSON.parse(dataUser);
        const id = parsedData.id;
        setIdUser(id);
      }

      if (id) {
        axios.get(`http://localhost:3001/note/${id}`);
      }
    }
  }, [id]);

  return (
    <main className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="px-40 py-14 gap-5 flex flex-col">
        <BlockNoteEditor />
      </div>
    </main>
  );
}
