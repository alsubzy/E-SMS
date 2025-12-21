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
      <div className="flex min-h-screen">
        <Sidebar className="border-r">
          <Nav />
        </Sidebar>
        <main className="flex-1 flex flex-col bg-secondary">
          <Header />
          <div className="flex-1 overflow-y-auto p-4 md:p-8">{children}</div>
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
