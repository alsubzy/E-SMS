import type { Metadata } from 'next';
import './globals.css';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import Nav from '@/components/nav';
import Header from '@/components/header';
import { Toaster } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';

export const metadata: Metadata = {
  title: 'ia Academy',
  description: 'A Modern School Management System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="httpshttps://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

function ClientLayout({ children }: { children: React.ReactNode }) {
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
