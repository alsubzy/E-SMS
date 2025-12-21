'use client';

import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import ClientLayout from '@/app/client-layout';

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      const isAuthPage = pathname === '/login' || pathname === '/signup';

      if (!isAuthenticated && !isAuthPage) {
        router.replace('/login');
      } else if (isAuthenticated && isAuthPage) {
        router.replace('/');
      }
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading) {
    // You can show a global loading spinner here
    return <div>Loading...</div>;
  }
  
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  // If not authenticated and not on an auth page, router will redirect, so we can return null or a loader.
  if (!isAuthenticated && !isAuthPage) {
      return null;
  }

  // If authenticated and on an auth page, router will redirect, so we can return null or a loader.
  if(isAuthenticated && isAuthPage) {
      return null;
  }

  // If on an auth page, just render the children without the main layout
  if(isAuthPage){
    return <main className="bg-gray-100">{children}</main>
  }
  
  // If authenticated and not on the login page, render the main layout
  return <ClientLayout>{children}</ClientLayout>;
}
