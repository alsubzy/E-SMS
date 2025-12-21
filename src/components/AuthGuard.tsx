'use client';

import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      const isLoginPage = pathname === '/login';

      if (!isAuthenticated && !isLoginPage) {
        router.replace('/login');
      } else if (isAuthenticated && isLoginPage) {
        router.replace('/');
      }
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  const isLoginPage = pathname === '/login';
  if(!isAuthenticated && !isLoginPage) {
      return null;
  }

  if(isAuthenticated && isLoginPage) {
      return null;
  }

  if(isLoginPage){
    return <main className="bg-gray-100">{children}</main>
  }

  return <>{children}</>;
}
