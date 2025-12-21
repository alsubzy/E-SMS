'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const { signup } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        setAvatarUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (password.length < 6) {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: 'Password must be at least 6 characters long.',
      });
      return;
    }
    const result = signup({
      fullName,
      username,
      email,
      password,
      avatarUrl: avatarUrl || `https://i.pravatar.cc/150?u=${username}`,
      phone: '',
      bio: '',
    });
    
    if (result.success) {
      toast({
          title: 'Signup Successful!',
          description: 'You are now logged in.',
      });
      router.push('/');
    } else {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: result.message,
      });
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center justify-center space-y-6">
      <div className="text-center">
        <div className="mb-4 flex items-center justify-center">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">E Spurt</h1>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Create an Account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Join us to get started
        </p>
      </div>

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24">
                <AvatarImage src={avatarPreview} />
                <AvatarFallback>
                <UploadCloud className="h-8 w-8 text-gray-400" />
                </AvatarFallback>
            </Avatar>
            <Input id="picture" type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
            <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('picture')?.click()}>Upload Photo</Button>
        </div>

        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="mt-1 bg-gray-50" />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="mt-1 bg-gray-50" />
        </div>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 bg-gray-50" />
        </div>
        <div className="relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 bg-gray-50"
            placeholder="6+ characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[2.2rem] text-gray-400"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <div>
          <Button type="submit" className="w-full bg-orange-500 text-white hover:bg-orange-600">
            Create Account
          </Button>
        </div>
      </form>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-orange-600 hover:text-orange-500">
          Login
        </Link>
      </p>
    </div>
  );
}
