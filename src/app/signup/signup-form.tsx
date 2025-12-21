
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

const LAST_REGISTERED_USER_KEY = 'last_registered_user';

const iaAcademyLogo = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 0C27.9411 0 36 8.05887 36 18C36 27.9411 27.9411 36 18 36C8.05887 36 0 27.9411 0 18C0 8.05887 8.05887 0 18 0Z" fill="url(#paint0_linear_signup)"/>
    <path d="M9.65137 25.1375L14.4164 12.3069H17.0195L13.1095 22.8463L18.4981 12.3069H20.9856L15.3537 23.3631L21.4931 25.1375H18.7745L15.5495 23.8331L12.4414 25.1375H9.65137Z" fill="white"/>
    <defs>
    <linearGradient id="paint0_linear_signup" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
    <stop stopColor="#4A00E0"/>
    <stop offset="1" stopColor="#8E2DE2"/>
    </linearGradient>
    </defs>
    </svg>   
)

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: 'Passwords do not match.',
      });
      return;
    }
     if (password.length < 6) {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: 'Password must be at least 6 characters long.',
      });
      return;
    }
    
    const newProfile = {
      fullName,
      username,
      email,
      password, // The password is included here for registration
      avatarUrl: avatarUrl || `https://i.pravatar.cc/150?u=${username}`,
      phone: '',
      bio: '',
    };

    const result = signup(newProfile);
    
    if (result.success) {
      // Don't toast here, toast will be shown on login page
      router.push('/login');
    } else {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: result.message,
      });
    }
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className='mb-4'>{iaAcademyLogo()}</div>
        <h1 className="text-2xl font-bold text-foreground">Create an Account</h1>
        <p className="text-sm text-muted-foreground">Get started with your new account.</p>
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
          <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1" />
        </div>
        <div className="relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1"
            placeholder="6+ characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[2.2rem] text-gray-400"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <div className="relative">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1"
            placeholder="Re-enter your password"
          />
           <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-[2.2rem] text-gray-400"
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <div>
          <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
            Create Account
          </Button>
        </div>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

    