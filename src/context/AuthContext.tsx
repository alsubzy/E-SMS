
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
const CURRENT_USER_EMAIL_KEY = 'current_user_email';
const LAST_REGISTERED_USER_KEY = 'last_registered_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  const loadUserByEmail = (email: string) => {
    try {
      const allUsersRaw = localStorage.getItem(ALL_USERS_KEY);
      const allUsers: UserProfile[] = allUsersRaw ? JSON.parse(allUsersRaw) : [];
      return allUsers.find(user => user.email === email) || null;
    } catch (error) {
      console.error("Failed to parse all_users from localStorage", error);
      return null;
    }
  };

  useEffect(() => {
    try {
      const allUsersRaw = localStorage.getItem(ALL_USERS_KEY);
      if (!allUsersRaw) {
        localStorage.setItem(ALL_USERS_KEY, JSON.stringify([defaultProfile]));
      }

      const currentUserEmail = localStorage.getItem(CURRENT_USER_EMAIL_KEY);
      if (currentUserEmail) {
        const profile = loadUserByEmail(currentUserEmail);
        if (profile) {
          const { password, ...profileToStore } = profile;
          setUserProfile(profileToStore);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error("Failed to initialize auth state from localStorage", error);
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
      localStorage.setItem(CURRENT_USER_EMAIL_KEY, profileToStore.email);
      router.push('/');
      return true;
    }
    return false;
  };
  
  const signup = (newProfile: UserProfile) => {
    try {
      const allUsersRaw = localStorage.getItem(ALL_USERS_KEY);
      const allUsers: UserProfile[] = allUsersRaw ? JSON.parse(allUsersRaw) : [defaultProfile];

      const existingUser = allUsers.find(
        (user) => user.email === newProfile.email || user.username === newProfile.username
      );

      if (existingUser) {
        return { success: false, message: 'An account with this email or username already exists.' };
      }

      allUsers.push(newProfile);
      localStorage.setItem(ALL_USERS_KEY, JSON.stringify(allUsers));
      
      // Store credentials for pre-filling login form, but don't log in
      localStorage.setItem(LAST_REGISTERED_USER_KEY, JSON.stringify({ email: newProfile.email, password: newProfile.password }));

      return { success: true, message: 'Signup successful! Please log in.' };
    } catch (error) {
      console.error("Failed during signup process", error);
      return { success: false, message: 'An unexpected error occurred during signup.' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    localStorage.removeItem(CURRENT_USER_EMAIL_KEY);
    localStorage.removeItem('admin_profile_draft');
    router.push('/login');
  };

  const updateProfile = useCallback((newProfileData: Omit<UserProfile, 'password'>) => {
    try {
      const allUsersRaw = localStorage.getItem(ALL_USERS_KEY);
      let allUsers: UserProfile[] = allUsersRaw ? JSON.parse(allUsersRaw) : [];
      const userIndex = allUsers.findIndex(u => u.email === newProfileData.email);

      if (userIndex !== -1) {
        const originalPassword = allUsers[userIndex].password;
        const updatedUser = { ...allUsers[userIndex], ...newProfileData, password: originalPassword };
        allUsers[userIndex] = updatedUser;
        
        localStorage.setItem(ALL_USERS_KEY, JSON.stringify(allUsers));

        // Update the live profile state if the updated user is the current user
        if (userProfile && userProfile.email === newProfileData.email) {
            const { password, ...profileToStore } = updatedUser;
            setUserProfile(profileToStore);
            localStorage.setItem(CURRENT_USER_EMAIL_KEY, profileToStore.email);
        }
      }
    } catch (error) {
      console.error("Failed to update profile in localStorage", error);
    }
  }, [userProfile]);

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

    