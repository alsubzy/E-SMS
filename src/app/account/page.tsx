'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

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

const DRAFT_PROFILE_KEY = 'admin_profile_draft';

export default function AccountPage() {
  const { userProfile, updateProfile } = useAuth();
  const [draftProfile, setDraftProfile] = useState<AdminProfile | null>(userProfile);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    if (userProfile) {
      try {
        const draft = localStorage.getItem(DRAFT_PROFILE_KEY);
        if (draft) {
          setDraftProfile(JSON.parse(draft));
        } else {
          setDraftProfile(userProfile);
        }
      } catch (error) {
        console.error('Failed to parse draft profile from localStorage', error);
        setDraftProfile(userProfile);
      }
    }
  }, [userProfile]);

  useEffect(() => {
    if (isClient && draftProfile) {
      localStorage.setItem(DRAFT_PROFILE_KEY, JSON.stringify(draftProfile));
    }
  }, [draftProfile, isClient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDraftProfile((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDraftProfile((prev) => (prev ? { ...prev, avatarUrl: reader.result as string } : null));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    if (draftProfile) {
      updateProfile(draftProfile);
      localStorage.removeItem(DRAFT_PROFILE_KEY);
      toast({
        title: "Profile Saved!",
        description: "Your changes have been successfully saved.",
      });
    }
  };

  const handleCancel = () => {
    if (userProfile) {
      setDraftProfile(userProfile);
      localStorage.removeItem(DRAFT_PROFILE_KEY);
    }
  };

  const handleResetProfile = () => {
    updateProfile(defaultProfile);
    setDraftProfile(defaultProfile);
    localStorage.removeItem(DRAFT_PROFILE_KEY);
    toast({
      title: "Profile Reset",
      description: "Your profile has been reset to the default settings.",
      variant: "destructive",
    });
  };

  if (!isClient || !draftProfile || !userProfile) {
    return null; // or a loading skeleton
  }
  
  const hasUnsavedChanges = JSON.stringify(userProfile) !== JSON.stringify(draftProfile);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Profile</CardTitle>
        <CardDescription>
          Manage your profile information. Click "Save Changes" to persist your edits.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={draftProfile.avatarUrl} alt={draftProfile.fullName} />
              <AvatarFallback>
                {draftProfile.fullName
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
            <Input id="fullName" name="fullName" value={draftProfile.fullName} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" value={draftProfile.username} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={draftProfile.email} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" value={draftProfile.phone} onChange={handleChange} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Role</Label>
          <Input value="Admin" readOnly disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">About</Label>
          <Textarea id="bio" name="bio" value={draftProfile.bio} onChange={handleChange} rows={4} placeholder="Tell us a little bit about yourself" />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-end pt-4">
          <Button variant="destructive" onClick={handleResetProfile} className="order-last sm:order-first">
            <Trash2 className="mr-2 h-4 w-4" />
            Reset to Default
          </Button>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleCancel} disabled={!hasUnsavedChanges}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveChanges} disabled={!hasUnsavedChanges}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
