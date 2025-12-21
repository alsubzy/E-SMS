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

export type UserProfile = {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
  avatarUrl: string;
  password?: string; // Only for registration, not stored long-term
};

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userProfile: UserProfile | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  signup: (newProfile: UserProfile) => { success: boolean; message: string };
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
  password: 'password'
};

const ALL_USERS_KEY = 'all_users';
const CURRENT_USER_KEY = 'current_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      // Initialize with a default admin user if no users exist
      const allUsersRaw = localStorage.getItem(ALL_USERS_KEY);
      if (!allUsersRaw) {
        localStorage.setItem(ALL_USERS_KEY, JSON.stringify([defaultProfile]));
      }

      const currentUser = localStorage.getItem(CURRENT_USER_KEY);
      if (currentUser) {
        const profile = JSON.parse(currentUser);
        setUserProfile(profile);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, pass: string) => {
    const allUsersRaw = localStorage.getItem(ALL_USERS_KEY);
    const allUsers: UserProfile[] = allUsersRaw ? JSON.parse(allUsersRaw) : [];
    
    const foundUser = allUsers.find(
      (user) => user.email === email && user.password === pass
    );

    if (foundUser) {
      const { password, ...profileToStore } = foundUser;
      setUserProfile(profileToStore);
      setIsAuthenticated(true);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(profileToStore));
      router.push('/');
      return true;
    }
    return false;
  };
  
  const signup = (newProfile: UserProfile) => {
    const allUsersRaw = localStorage.getItem(ALL_USERS_KEY);
    const allUsers: UserProfile[] = allUsersRaw ? JSON.parse(allUsersRaw) : [];

    const existingUser = allUsers.find(
      (user) => user.email === newProfile.email || user.username === newProfile.username
    );

    if (existingUser) {
      return { success: false, message: 'An account with this email or username already exists.' };
    }

    allUsers.push(newProfile);
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(allUsers));
    
    const { password, ...profileToStore } = newProfile;
    setUserProfile(profileToStore);
    setIsAuthenticated(true);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(profileToStore));
    router.push('/');
    return { success: true, message: 'Signup successful!' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    // Clear profile draft on logout
    localStorage.removeItem('admin_profile_draft');
    router.push('/login');
  };

  const updateProfile = useCallback((newProfileData: Omit<UserProfile, 'password'>) => {
    setUserProfile(newProfileData);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newProfileData));

    // Also update the user in the all_users list
    const allUsersRaw = localStorage.getItem(ALL_USERS_KEY);
    let allUsers: UserProfile[] = allUsersRaw ? JSON.parse(allUsersRaw) : [];
    const userIndex = allUsers.findIndex(u => u.email === newProfileData.email);

    if (userIndex !== -1) {
      // Preserve original password when updating
      const originalPassword = allUsers[userIndex].password;
      allUsers[userIndex] = { ...newProfileData, password: originalPassword };
      localStorage.setItem(ALL_USERS_KEY, JSON.stringify(allUsers));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, userProfile, login, logout, signup, updateProfile }}>
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
