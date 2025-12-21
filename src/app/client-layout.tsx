'use client';

import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import Nav from '@/components/nav';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/login';

  if (isLogin) {
    return <main className="bg-gray-100">{children}</main>;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <Nav />
      </Sidebar>
      <main className="flex flex-1 flex-col bg-[#F7F8FC]">
        <Header />
        <div className="flex-1 overflow-y-auto p-4 md:p-8">{children}</div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
