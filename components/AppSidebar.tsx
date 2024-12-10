'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { File, NotebookPen } from "lucide-react"

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
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <File />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
