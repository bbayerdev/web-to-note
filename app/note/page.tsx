'use client'
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { CircleAlert, CirclePlus, Clock } from "lucide-react"
import NoteCard from "@/components/noteCard"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Note {
  id: string;
  title: string;
  date: string;
  hour: string;
  idUser: string;
}

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
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  //async que puxa os notes do user
  useEffect(() => {
    if (!idUser) return;
  
    const fetchNotas = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3001/usuario/${idUser}/notes`);
        const formattedNotes = res.data.map((note: Note) => ({
          ...note,
          date: new Date(note.date).toLocaleDateString('en-US', {
            year: 'numeric', month: '2-digit', day: '2-digit'
          }),
          hour: new Date(note.date).toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', hour12: false
          })
        }));
        setNotes(formattedNotes);
      } catch {
      } finally {
        setLoading(false);
      }
    }
    fetchNotas();
    const interval = setInterval(fetchNotas, 1200);
    return () => clearInterval(interval);
  }, [idUser]);
  

  return (
    <main className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">

      <div className="flex justify-center">

        <TypingAnimation duration={70} className="mt-8 text-3xl">Every great idea starts with a note. How about writing something?</TypingAnimation>
      </div>

      <section className="flex flex-row w-full px-32 pt-20 pb-20 gap-20">
        <div>
          <div className="flex gap-1 text-muted-foreground items-center">
            {notes.length === 0 ? (
              <>
                <CircleAlert size={16} strokeWidth={3} /> <span className="font-bold mt-px">You don't have any notes! Create one in the sidebar in less than 5 seconds now!</span>
              </>
            ) : (
              <>
                <Clock size={16} strokeWidth={3} /> <span className="font-bold mt-px">Recently viewed</span>
              </>
            )}

          </div>

          <div className="grid grid-cols-3 gap-10 mt-6 ml-2">
            {notes.map(note => (
              <NoteCard
                key={note.id}
                date={note.date}
                hour={note.hour}
                title={note.title}
              />
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
