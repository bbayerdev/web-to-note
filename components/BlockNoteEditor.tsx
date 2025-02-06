// BlockNoteEditor.tsx
'use client'
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const BlockNoteEditor = () => {
  const editor = useCreateBlockNote();

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


  if (!editor) return null;

  return <BlockNoteView editor={editor} />;
};

export default BlockNoteEditor;
