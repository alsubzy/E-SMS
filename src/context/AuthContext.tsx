'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';

type UserProfile = {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
  avatarUrl: string;
};

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userProfile: UserProfile | null;
  login: () => void;
  logout: () => void;
  updateProfile: (newProfile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultProfile: UserProfile = {
  fullName: 'Priscilla Lily',
  username: 'priscilla',
  email: 'admin@example.com',
  phone: '',
  bio: '',
  avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
};

const PROFILE_KEY = 'user_profile';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem('isAuthenticated');
      const storedProfile = localStorage.getItem(PROFILE_KEY);

      if (storedAuth) {
        const authStatus = JSON.parse(storedAuth);
        setIsAuthenticated(authStatus);
        if (authStatus) {
          setUserProfile(storedProfile ? JSON.parse(storedProfile) : defaultProfile);
        }
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = () => {
    const profile = defaultProfile;
    setIsAuthenticated(true);
    setUserProfile(profile);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    router.push('/');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem(PROFILE_KEY);
    // Clear profile draft on logout
    localStorage.removeItem('admin_profile_draft');
    router.push('/login');
  };

  const updateProfile = useCallback((newProfile: UserProfile) => {
    setUserProfile(newProfile);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, userProfile, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
