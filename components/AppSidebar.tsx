'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Bomb, Eye, File, Home, MoreHorizontal, NotebookPen, Telescope, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"

// Menu items.
const items = [
  {
    title: "Alimentação para melhorar o desempenho no treino",
    url: "#",
  },
  {
    title: "Estratégias para aumentar a resistência cardiovascular",
    url: "#",
  },
  {
    title: "Checklist de exercícios para treino de pernas",
    url: "#",
  },
  {
    title: "Monitoramento de evolução: peso e medidas mensais",
    url: "#",
  },
  {
    title: "Plano de treino para ganhar massa muscular",
    url: "#",
  },

]

export function AppSidebar() {
  return (
    <Sidebar className=" font-[family-name:var(--font-geist-mono)]">
      <SidebarContent className="bg-neutral-900">
        <SidebarGroup>
          <SidebarGroupLabel className="font-[family-name:var(--font-geist-sans)] text-xl gap-2 font-bold"> <NotebookPen /> Yuri's Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="rounded-[6px]" asChild>
                    <a href="#">
                      <File />
                      <span>{item.title}</span>
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
    </Sidebar>
  )
}
