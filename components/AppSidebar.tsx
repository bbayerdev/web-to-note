'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Bomb, File, FilePlus2, Loader, LogOut, MoreHorizontal, NotebookPen, Pencil, Telescope } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { signOut } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import Name from "./Name"
import axios from "axios"
import { useRouter } from "next/navigation"

const handleLogout = async () => {
  await signOut({ redirect: false })
  window.location.href = '/login'
}

interface Note {
  id: string;
  title: string;
  date: string;
  hour: string;
  idUser: string;
}

export function AppSidebar() {

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
    const fetchNotas = async () => {
      if (!idUser) return
      setLoading(true)
      try {
        const res = await axios.get(`http://localhost:3001/usuario/${idUser}/notes`)
        setNotes(res.data)
      }
      catch {
      }
      finally {
        setLoading(false)
      }
    }
    fetchNotas()
  }, [idUser])

  // async new note
  const now = new Date()
  const date = now.toLocaleDateString("en-US")
  const hour = now.toTimeString().slice(0, 5)
  const defaultContent = [
    { type: "heading", level: 1, content: "Untitled Note" },
    { type: "paragraph", content: "" },
  ]

  const updateNotes = (newNote: Note) => {
    setNotes(prevNotes => [...prevNotes, newNote])
  }

  async function newNote(e: React.FormEvent) {
    e.preventDefault()
    if (!idUser) return

    try {
      const res = await axios.post(`http://localhost:3001/usuario/${idUser}/notes`, {
        title: 'New note',
        content: defaultContent,
        date: date,
        hour: hour,
      })
      console.log("Nota criada com sucesso", res.data)
      updateNotes(res.data)
      setActiveNoteId(res.data.id)
      router.push(`/note/${res.data.id}`)
    } catch (error) {
      console.error("Erro ao salvar a nota", error)
    }
  }
  const router = useRouter()
  //efeito note watch
  const [activeNoteId, setActiveNoteId] = useState<string | null>(
    () => typeof window !== "undefined" ? localStorage.getItem("activeNoteId") : null
  )

  useEffect(() => {
    if (activeNoteId) {
      localStorage.setItem("activeNoteId", activeNoteId);
    }
  }, [activeNoteId])

  const handleNote = (idNote: string) => {
    setActiveNoteId(idNote)
    router.push(`/note/${idNote}`)
  }

  //async delete note
  async function deleteNote(id: string) {
    try {
      const res = await axios.delete(`http://localhost:3001/note/${id}`)
      if (id === activeNoteId) {
        setActiveNoteId(null)
        router.push("/note")
      }
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
    }
    catch {
    }
  }

  //async edit name note
  const [editingId, setEditingId] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleEdit = (id: string) => {
    setEditingId(id);
  }

  const [editableTitles, setEditableTitles] = useState<{ [key: string]: string }>({});
  const handleTitleChange = (id: string, newTitle: string) => {
    setEditableTitles(prevTitles => ({ ...prevTitles, [id]: newTitle }));
  }

  const updateTitle = async (id: string) => {
    if (!editableTitles[id]) return;

    try {
      await axios.put(`http://localhost:3001/note/title/${id}`, {
        title: editableTitles[id],
      });

      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === id ? { ...note, title: editableTitles[id] } : note
        )
      )
    } catch (error) {
      console.error("Erro ao atualizar o título", error);
    } finally {
      setEditingId(null); // Sai do modo de edição ao terminar
    }
  }


  return (
    <Sidebar className=" font-[family-name:var(--font-geist-mono)]">
      <SidebarContent className="bg-neutral-900">
        <SidebarGroup className="mt-2">

          <SidebarGroupLabel className="font-[family-name:var(--font-geist-sans)] text-xl gap-2 font-bold">
            <NotebookPen /> <span className="text-neutral-200">
              <Name />
            </span> Notes
          </SidebarGroupLabel>

          <SidebarMenuButton onClick={newNote} className="rounded-[6px] mt-3 bg-green-500/10 hover:bg-green-500/15" asChild>
            <a href="/note">
              <FilePlus2 strokeWidth={3} color="#22c55e" />
              <span className="text-green-500 font-bold">Create new note</span>
            </a>
          </SidebarMenuButton>

          <SidebarGroupContent>
            {!loading && notes.length === 0 && (
              <>
                <div className="flex justify-center items-center mt-4 ml-2">
                  <p>You don't have any notes created yet. Create a new one to get started!</p>
                </div>
              </>
            )}

            {loading ? (
              <>
                <div className="flex justify-center items-center">
                  <Loader className="animate-spin size-4 mt-5" />
                </div>
              </>
            ) : (
              <>
                <SidebarMenu className="mt-3">
                  {notes.map((note, index) => (
                    <SidebarMenuItem key={note.id}>
                      <SidebarMenuButton className={`rounded-[6px] ${activeNoteId === note.id ? "bg-muted" : ""}`} onClick={() => handleNote(note.id)}>

                        {editingId === note.id ? (
                          <>
                            <File />
                            <span className="text-neutral-600 font-bold">{index + 1}#</span>{" "}
                            <input
                              ref={inputRef} // Passa a ref para o input
                              type="text"
                              value={editableTitles[note.id] ?? note.title}
                              onChange={(e) => handleTitleChange(note.id, e.target.value)}
                              onBlur={() => updateTitle(note.id)}
                              onKeyDown={(e) => e.key === "Enter" && updateTitle(note.id)}
                              className="bg-transparent outline-none border-b border-neutral-500 w-full"
                              onFocus={(e) => e.target.select()}
                            />
                          </>
                        ) : (
                          <>
                            <File />
                            <span className="text-neutral-600 font-bold">{index + 1}#</span>{" "}
                            <span>{note.title}</span>
                          </>
                        )}

                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction className="rounded-[6px]">
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="font-[family-name:var(--font-geist-sans)] rounded-[6px]"
                          side="right"
                          align="start"
                        >
                          <DropdownMenuItem className="rounded-[6px]" onClick={() => handleEdit(note.id)}>
                            <span>Edit name</span> <Pencil />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-[6px]" onClick={() => handleNote(note.id)}>
                            <span>View Note</span> <Telescope />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="group rounded-[6px] text-red-500" onClick={() => deleteNote(note.id)}>
                            <span>Delete Project</span> <Bomb />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </>
            )}

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-neutral-900 flex items-end justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild >
            <Button
              variant={'ghost'}
              size={'icon'}
              className="rounded-[6px] hover:bg-red-500/10"
            >
              <LogOut color="#ef4444" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="font-[family-name:var(--font-geist-sans)] rounded-[20px]" >
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
              <AlertDialogDescription>
                Logging out will end your session, and you will need to log in again to access your account of <span className="italic">To-Note</span>.
              </AlertDialogDescription>

            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-[6px]">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout} className="rounded-[6px] hover:bg-red-500">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  )
}