'use client'
import { useState, useEffect } from 'react';
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import IcoUser from "@/components/IcoUser";
import NextTopLoader from "nextjs-toploader";
import { House, Loader, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

        <div className="fixed top-2 right-4 z-50">
          <IcoUser />
        </div>

        <div className="flex flex-1 flex-col h-screen">
          <div>
            <SidebarTrigger />
            <Link href={'/note'}>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-[6px] ml-2 mt-2">
                <House />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className='flex justify-center items-center h-screen'>
              <Loader className='animate-spin' />
            </div>
          ) : (
            children
          )}
        </div>
      </SidebarProvider>
    </div>
  );
}
