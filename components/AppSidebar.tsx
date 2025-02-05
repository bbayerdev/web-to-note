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
import { Bomb, File, FilePlus2, Loader, LogOut, MoreHorizontal, NotebookPen, Telescope } from "lucide-react"
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
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"
import Name from "./Name"
import axios from "axios"
import router from "next/router"
import { useRouter } from "next/navigation"

const handleLogout = async () => {
  await signOut({ redirect: false })
  window.location.href = '/login'
}

interface Note {
  id: string;
  tittle: string;
  body: string;
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

  const updateNotes = (newNote: Note) => {
    setNotes(prevNotes => [...prevNotes, newNote])
  }

  async function newNote(e: React.FormEvent) {
    e.preventDefault()
    if (!idUser) return

    try {
      const res = await axios.post("http://localhost:3001/note", {
        tittle: 'New Note',
        body: [{ type: 'paragraph', children: [{ text: 'New Note' }] }],
        date: date,
        hour: hour,
        idUser: idUser,
      })
      console.log("Nota criada com sucesso", res.data)
      updateNotes(res.data)
      router.push(`/note/${res.data.id}`)
    } catch (error) {
      console.error("Erro ao salvar a nota", error)
    }
  }
  const router = useRouter()

  //async delete note
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)

  const handleNote = (idNote: string) => {
    setActiveNoteId(idNote)
    router.push(`/note/${idNote}`)
  }

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


  return (
    <Sidebar className=" font-[family-name:var(--font-geist-mono)]">
      <SidebarContent className="bg-neutral-900">
        <SidebarGroup className="mt-2">

          <SidebarGroupLabel className="font-[family-name:var(--font-geist-sans)] text-xl gap-2 font-bold">
            <NotebookPen /> <span className="text-neutral-200">
              <Name />
            </span> Notes
          </SidebarGroupLabel>

          <SidebarMenuButton onClick={newNote} className="rounded-[6px] mt-3 bg-green-500/20 hover:bg-green-500/15" asChild>
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
                      <SidebarMenuButton className={`rounded-[6px] ${activeNoteId === note.id ? "bg-muted" : ""
                        }`}
                        onClick={() => handleNote(note.id)}>

                        <File />
                        <span className="text-neutral-600 font-bold">{index + 1}#</span>{" "}
                        <span>{note.tittle}</span>

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
                          <DropdownMenuItem className="rounded-[6px]">
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