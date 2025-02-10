'use client'
import { useState, useEffect } from 'react';
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import IcoUser from "@/components/IcoUser";
import NextTopLoader from "nextjs-toploader";
import { Loader } from 'lucide-react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [children]);

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
          {isLoading ? (
            <div className='flex justify-center items-center h-screen'>
              <Loader className='animate-spin'/>
            </div>
          ) : (
            children
          )}
        </div>
      </SidebarProvider>
    </div>
  );
}
