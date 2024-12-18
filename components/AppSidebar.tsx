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
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Definindo a interface para a estrutura de uma nota
interface Items {
  id: string; // Mudamos para string, pois o id está vindo como uma string
  tittle: string;
}

export function AppSidebar() {

   // Tipando corretamente o estado notes como um array de Items
   const [notes, setNotes] = useState<Items[]>([]); // Para armazenar as notas
   const [loading, setLoading] = useState(true); // Para indicar se os dados estão carregando
   const [error, setError] = useState<string | null>(null); // Para capturar erros

   useEffect(() => {
     // Função assíncrona para buscar as notas
     const fetchNotes = async () => {
       try {
         const response = await axios.get('http://localhost:3001/note'); // Substitua <porta> pela porta correta
         setNotes(response.data); // Atualiza o estado com as notas recebidas

         console.log("Dados recebidos:", response.data);
       } catch (err) {
         setError('Erro ao carregar as notas.'); // Caso haja erro
       } finally {
         setLoading(false); // Ao terminar, definimos o loading como false
       }
     };

     fetchNotes(); // Chama a função para buscar as notas
   }, []); // O array vazio significa que o efeito será executado apenas uma vez, após o componente ser montado

   if (loading) return <div>Carregando...</div>; // Exibe uma mensagem enquanto os dados estão sendo carregados
   if (error) return <div>{error}</div>; // Exibe o erro, se houver

  return (
    <Sidebar className=" font-[family-name:var(--font-geist-mono)]">
      <SidebarContent className="bg-neutral-900">
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="font-[family-name:var(--font-geist-sans)] text-xl gap-2 font-bold"> <NotebookPen /> Yuri's Notes</SidebarGroupLabel>

          <SidebarMenuButton className="rounded-[6px] mt-3 bg-green-500/20 hover:bg-green-500/15" asChild>
            <a href="/">
              <FilePlus2 strokeWidth={3} color="#22c55e" />
              <span className="text-green-500 font-bold">Create new note</span>
            </a>
          </SidebarMenuButton>

          <SidebarGroupContent>

            <SidebarMenu className="mt-3">

              {notes.map((item, index) => ( // Mudamos de items para notes
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton className="rounded-[6px]" asChild>
                    <a href="#">
                      <File />
                      <span className="text-neutral-600 font-bold">{index + 1}#</span> {/* Adiciona o número de cada item */}
                      <span>{item.tittle}</span>
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
          <AlertDialogContent className="font-[family-name:var(--font-geist-sans)]" >
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
              <AlertDialogDescription>
                Logging out will end your session, and you will need to log in again to access your account of <span className="italic">To-Note</span>.
              </AlertDialogDescription>

            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-[6px]">Cancel</AlertDialogCancel>
              <AlertDialogAction className="rounded-[6px] hover:bg-red-500">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  )
}
