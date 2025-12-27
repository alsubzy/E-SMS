'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, role?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshAccessToken = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/refresh', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setAccessToken(data.accessToken);
        setUser(data.user);
        return data.accessToken;
      } else {
        setUser(null);
        setAccessToken(null);
      }
    } catch (error) {
      console.error('Failed to refresh token', error);
      setUser(null);
      setAccessToken(null);
    }
    return null;
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      setAccessToken(data.accessToken);
      router.push('/dashboard');
    } else {
      const error = await res.json();
      throw new Error(error.error || 'Login failed');
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setAccessToken(null);
    router.push('/login');
  };

  const register = async (email: string, password: string, name: string, role?: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Registration failed');
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = await refreshAccessToken();
      if (token) {
        // Fetch user info if needed, or decode from token
        // For simplicity, we assume refresh returns user or we decode it
      }
      setLoading(false);
    };
    initAuth();
  }, [refreshAccessToken]);

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      loading,
      isAuthenticated: !!accessToken,
      isLoading: loading,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};