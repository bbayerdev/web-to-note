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
import { Bomb, File, FilePlus2, LogOut, MoreHorizontal, NotebookPen, Telescope } from "lucide-react"
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

  //async que puxa os notes do user
  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/usuario/${idUser}/notes`)
        setNotes(res.data)
        console.log(notes)
      }
      catch {

      }
    }
    fetchNotas()
  }, [idUser])


  return (
    <Sidebar className=" font-[family-name:var(--font-geist-mono)]">
      <SidebarContent className="bg-neutral-900">
        <SidebarGroup className="mt-2">

          <SidebarGroupLabel className="font-[family-name:var(--font-geist-sans)] text-xl gap-2 font-bold">
            <NotebookPen /> <span className="text-neutral-200">
              <Name />
            </span> Notes
          </SidebarGroupLabel>

          <SidebarMenuButton className="rounded-[6px] mt-3 bg-green-500/20 hover:bg-green-500/15" asChild>
            <a href="/">
              <FilePlus2 strokeWidth={3} color="#22c55e" />
              <span className="text-green-500 font-bold">Create new note</span>
            </a>
          </SidebarMenuButton>

          <SidebarGroupContent>
            <SidebarMenu className="mt-3">
              {notes.map((note, index) => (
                <SidebarMenuItem key={note.id}>
                  <SidebarMenuButton className="rounded-[6px]" asChild>
                    <a href="#">
                      <File />
                      <span className="text-neutral-600 font-bold">{index + 1}#</span>{" "}
                      <span>{note.tittle}</span>
                    </a>
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
                      <DropdownMenuItem className="group rounded-[6px] text-red-500">
                        <span>Delete Project</span> <Bomb />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

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