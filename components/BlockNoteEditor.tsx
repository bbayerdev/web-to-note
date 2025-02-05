// BlockNoteEditor.tsx
'use client'
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

const BlockNoteEditor = () => {
  const editor = useCreateBlockNote();

  if (!editor) return null;

  return <BlockNoteView editor={editor} />;
};

export default BlockNoteEditor;
