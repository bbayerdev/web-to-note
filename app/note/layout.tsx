'use client'
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import IcoUser from "@/components/IcoUser";
import { useEffect } from "react";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //se o user nao tiver logado ele redireciona
  useEffect(() => {
    const teste_logado = localStorage.getItem('usuario')

    if (!teste_logado) {
      window.location.href = '/login'
    }
  }, [])

  return (
    <div>
      <NextTopLoader color="#3b82f6" initialPosition={0.3} height={2} showSpinner={false} />
      <SidebarProvider>
        <AppSidebar />

        <div className="fixed top-4 right-4 z-50">
          <IcoUser />
        </div>

        <div className="flex flex-1 flex-col h-screen">
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
