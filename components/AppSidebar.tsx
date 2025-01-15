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


// Menu items.
const items = [
  {
    title: "Alimentação para melhorar o desempenho no treino",
    url: "#",
    number: 1
  },
  {
    title: "Estratégias para aumentar a resistência cardiovascular",
    url: "#",
    number: 2
  },
  {
    title: "Checklist de exercícios para treino de pernas",
    url: "#",
    number: 3
  },
  {
    title: "Monitoramento de evolução: peso e medidas mensais",
    url: "#",
    number: 4
  },
  {
    title: "Plano de treino para ganhar massa muscular",
    url: "#",
    number: 5
  },

]

export function AppSidebar() {
  return (
    <Sidebar className=" font-[family-name:var(--font-geist-mono)]">
      <SidebarContent className="bg-neutral-900">
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="font-[family-name:var(--font-geist-sans)] text-xl gap-2 font-bold">
            <NotebookPen /> <span className="text-neutral-200">Yuri's</span> Notes
          </SidebarGroupLabel>

          <SidebarMenuButton className="rounded-[6px] mt-3 bg-green-500/20 hover:bg-green-500/15" asChild>
            <a href="/">
              <FilePlus2 strokeWidth={3} color="#22c55e" />
              <span className="text-green-500 font-bold">Create new note</span>
            </a>
          </SidebarMenuButton>

          <SidebarGroupContent>

            <SidebarMenu className="mt-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="rounded-[6px]" asChild>
                    <a href="#">
                      <File />
                      <span className="text-neutral-600 font-bold">{item.number}#</span> <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction className="rounded-[6px]">
                        <MoreHorizontal />
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="font-[family-name:var(--font-geist-sans)] rounded-[6px]" side="right" align="start">
                      <DropdownMenuItem className="rounded-[6px]">
                        <span>View Note</span> <Telescope />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="group rounded-[6px] hover:text-red-500">
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
            <Button variant={'ghost'} size={'icon'} className="rounded-[6px] hover:bg-red-500/10"> <LogOut color="#ef4444" /> </Button>
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
              <AlertDialogAction className="rounded-[6px] hover:bg-red-500">
                <Link href={'/login'}>Continue</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  )
}