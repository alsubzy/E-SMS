'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Trash2 } from 'lucide-react';

const DEBOUNCE_DELAY = 500;
const LOCAL_STORAGE_KEY = 'admin_profile';

type AdminProfile = {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
  avatarUrl: string;
};

const defaultProfile: AdminProfile = {
  fullName: 'Priscilla Lily',
  username: 'priscilla',
  email: 'admin@example.com',
  phone: '',
  bio: '',
  avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
};

// A simple debounce function
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

export default function AccountPage() {
  const [profile, setProfile] = useState<AdminProfile>(defaultProfile);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const savedProfile = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else {
        // Initialize with default if nothing is saved
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultProfile));
      }
    } catch (error) {
      console.error('Failed to parse profile from localStorage', error);
      // If data is corrupted, reset to default
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultProfile));
      setProfile(defaultProfile);
    }
  }, []);

  const debouncedSave = useCallback(
    debounce((newProfile: AdminProfile) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProfile));
    }, DEBOUNCE_DELAY),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newProfile = { ...profile, [name]: value };
    setProfile(newProfile);
    debouncedSave(newProfile);
  };

  const handleResetProfile = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setProfile(defaultProfile);
    // Also re-initialize it
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultProfile));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfile = { ...profile, avatarUrl: reader.result as string };
        setProfile(newProfile);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProfile));
      };
      reader.readAsDataURL(file);
    }
  };


  if (!isClient) {
    return null; // or a loading skeleton
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Profile</CardTitle>
        <CardDescription>
          This information will be displayed publicly so be careful what you share.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
              <AvatarFallback>
                {profile.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <Input id="picture" type="file" onChange={handleImageUpload} className="max-w-xs" accept="image/*" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" value={profile.fullName} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" value={profile.username} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" value={profile.phone} onChange={handleChange} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Role</Label>
          <Input value="Admin" readOnly disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">About</Label>
          <Textarea id="bio" name="bio" value={profile.bio} onChange={handleChange} rows={4} placeholder="Tell us a little bit about yourself" />
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="destructive" onClick={handleResetProfile}>
            <Trash2 className="mr-2 h-4 w-4" />
            Reset Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
