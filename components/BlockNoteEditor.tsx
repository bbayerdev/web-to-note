// components/BlockNoteEditor.tsx
'use client'
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useEffect, useState } from "react";
import axios from "axios";
import { Block } from "@blocknote/core";

interface Note {
  id: string;
  content: Block[]; // Garante que o conteúdo será um array de blocos
  date: string;
  hour: string;
  idUser: string;
}

const BlockNoteEditor = ({ noteId }: { noteId: string }) => {
  const [note, setNote] = useState<Note | null>(null);
  const editor = useCreateBlockNote();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/note/${noteId}`);
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
  }, [noteId, editor]);

  const handleUpdateContent = async () => {
    try {
      // Obtendo o conteúdo do editor de forma compatível com o BlockNote
      const document = editor.document

      // Mapeia o conteúdo do editor para o formato esperado pelo backend
      const updatedContent = document.map((block: Block) => ({
        type: block.type,
        content: block.content,
      }));

      // Envia os dados para o backend
      await axios.put(`http://localhost:3001/note/${noteId}`, {
        content: updatedContent,
        date: new Date().toISOString(),
        hour: new Date().toLocaleTimeString(),
      });

      console.log("Conteúdo atualizado!");
    } catch (error) {
      console.error("Erro ao atualizar o conteúdo", error);
    }
  };

  if (!editor) return null;

  return (
    <div>
         <button className="bg-white" onClick={handleUpdateContent}>Salvar</button>
      <h1>Editando Nota: {note?.id || 'Carregando...'}</h1>
      <BlockNoteView editor={editor} />
   
    </div>
  );
};

export default BlockNoteEditor;
