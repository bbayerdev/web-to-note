'use client'
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Block } from "@blocknote/core";

interface Note {
  id: string;
  title: string
  content: Block[]; // Garante que o conteúdo será um array de blocos
  date: string;
  hour: string;
  idUser: string;
}

const BlockNoteEditor = () => {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);

  // Inicializa o editor BlockNote
  const editor = useCreateBlockNote();

  useEffect(() => {
    if (id && editor) {
      const fetchNote = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/note/${id}`);
          const fetchedNote = res.data;

          // Garante que o conteúdo é um array de blocos, caso contrário, cria um bloco padrão
          const content = Array.isArray(fetchedNote.content)
            ? fetchedNote.content
            : [{ type: "paragraph", content: "Texto padrão" }];

          setNote({ ...fetchedNote, content });

          // Define o conteúdo no editor corretamente
          editor.replaceBlocks(editor.document, content);
        } catch (error) {
          console.error("Erro ao buscar a nota", error);
        }
      };

      fetchNote();
    }
  }, [id, editor]);

  if (!editor) return null;

  return (
    <div>
      <h1>Editando Nota: {note?.title || 'Carregando...'}</h1>
      <BlockNoteView editor={editor} />
    </div>
  );
};

export default BlockNoteEditor;
