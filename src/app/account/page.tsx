'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SAVED_PROFILE_KEY = 'admin_profile';
const DRAFT_PROFILE_KEY = 'admin_profile_draft';

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

export default function AccountPage() {
  const [savedProfile, setSavedProfile] = useState<AdminProfile>(defaultProfile);
  const [draftProfile, setDraftProfile] = useState<AdminProfile>(defaultProfile);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem(SAVED_PROFILE_KEY);
      const draft = localStorage.getItem(DRAFT_PROFILE_KEY);

      const initialSaved = saved ? JSON.parse(saved) : defaultProfile;
      setSavedProfile(initialSaved);

      if (draft) {
        setDraftProfile(JSON.parse(draft));
      } else {
        setDraftProfile(initialSaved);
      }
    } catch (error) {
      console.error('Failed to parse profile from localStorage', error);
      // If data is corrupted, reset to default
      localStorage.setItem(SAVED_PROFILE_KEY, JSON.stringify(defaultProfile));
      localStorage.removeItem(DRAFT_PROFILE_KEY);
      setSavedProfile(defaultProfile);
      setDraftProfile(defaultProfile);
    }
  }, []);

  // Sync draft changes to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(DRAFT_PROFILE_KEY, JSON.stringify(draftProfile));
    }
  }, [draftProfile, isClient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDraftProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDraftProfile((prev) => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    // Here you would typically send data to a backend API
    // For this example, we'll just update the "saved" state and localStorage
    setSavedProfile(draftProfile);
    localStorage.setItem(SAVED_PROFILE_KEY, JSON.stringify(draftProfile));
    localStorage.removeItem(DRAFT_PROFILE_KEY); // Clear the draft
    toast({
        title: "Profile Saved!",
        description: "Your changes have been successfully saved.",
    });
  };

  const handleCancel = () => {
    setDraftProfile(savedProfile); // Revert changes to the last saved state
    localStorage.removeItem(DRAFT_PROFILE_KEY);
  };
  
  const handleResetProfile = () => {
    localStorage.removeItem(SAVED_PROFILE_KEY);
    localStorage.removeItem(DRAFT_PROFILE_KEY);
    setSavedProfile(defaultProfile);
    setDraftProfile(defaultProfile);
    toast({
        title: "Profile Reset",
        description: "Your profile has been reset to the default settings.",
        variant: "destructive",
    })
  };

  const hasUnsavedChanges = JSON.stringify(savedProfile) !== JSON.stringify(draftProfile);

  if (!isClient) {
    return null; // or a loading skeleton
  }

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
