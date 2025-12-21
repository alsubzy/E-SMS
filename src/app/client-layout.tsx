'use client';

import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import Nav from '@/components/nav';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <Nav />
      </Sidebar>
      <main className="flex flex-1 flex-col bg-white">
        <Header />
        <div className="flex-1 overflow-y-auto p-4 md:p-8">{children}</div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
