
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const iaAcademyLogo = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 0C27.9411 0 36 8.05887 36 18C36 27.9411 27.9411 36 18 36C8.05887 36 0 27.9411 0 18C0 8.05887 8.05887 0 18 0Z" fill="url(#paint0_linear_login)"/>
    <path d="M9.65137 25.1375L14.4164 12.3069H17.0195L13.1095 22.8463L18.4981 12.3069H20.9856L15.3537 23.3631L21.4931 25.1375H18.7745L15.5495 23.8331L12.4414 25.1375H9.65137Z" fill="white"/>
    <defs>
    <linearGradient id="paint0_linear_login" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
    <stop stopColor="#4A00E0"/>
    <stop offset="1" stopColor="#8E2DE2"/>
    </linearGradient>
    </defs>
    </svg>   
)


const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.35 11.1H12.25V14.9H17.45C17.15 16.2 16.25 17.3 14.95 18.1V20.8H18.55C20.55 18.9 21.75 16.2 21.75 13.1C21.75 12.4 21.65 11.7 21.35 11.1Z" fill="#4285F4"/>
    <path d="M12.25 22C15.25 22 17.85 21 19.55 19.4L15.95 16.8C14.95 17.5 13.75 17.9 12.25 17.9C9.75 17.9 7.65 16.3 6.85 14H3.25V16.9C4.85 19.9 8.25 22 12.25 22Z" fill="#34A853"/>
    <path d="M6.85 14C6.65 13.4 6.55 12.7 6.55 12C6.55 11.3 6.65 10.6 6.85 10H3.25V7.1C2.55 8.5 2.15 10.2 2.15 12C2.15 13.8 2.55 15.5 3.25 16.9L6.85 14Z" fill="#FBBC05"/>
    <path d="M12.25 6.1C13.85 6.1 15.05 6.8 15.65 7.4L18.65 4.4C16.95 2.9 14.85 2 12.25 2C8.25 2 4.85 4.1 3.25 7.1L6.85 10C7.65 7.7 9.75 6.1 12.25 6.1Z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.01,1.96C10.74,1.95,9.2,2.5,8.03,3.53C6.88,4.56,5.99,6,5.99,7.57 c0,1.9,1.13,3.33,2.83,4.05C8.8,11.58,8.79,11.59,8.79,11.6c-1.84,0.44-3.15,1.66-3.15,3.53c0,1.92,1.3,3.38,3.18,3.93 c1.52,0.45,3.29,0.2,4.74-0.81c0.1-0.07,0.2-0.13,0.3-0.2c-1.35,0.85-2.9,1.24-4.47,0.96c-1.49-0.27-2.73-1.31-3.2-2.78 c-0.05-0.16-0.08-0.32-0.08-0.48c0-1.16,0.79-2.2,2.02-2.52c1.51-0.39,3.13-0.22,4.5,0.48c0.23,0.12,0.47,0.22,0.7,0.28 c-0.02,0.01-0.04,0.02-0.06,0.03c-1.2,0.6-2.58,0.93-3.96,0.93c-1.26,0-2.48-0.27-3.57-0.79c-0.21-0.1-0.42-0.21-0.63-0.34 c-0.02,0.1-0.03,0.21-0.03,0.31c0,1.2,0.86,2.26,2.1,2.59c1.68,0.45,3.43,0.12,4.83-0.85c1.47-1.02,2.3-2.51,2.35-4.14 c0.03-1.12-0.3-2.19-0.91-3.08c-0.64-0.93-1.56-1.57-2.61-1.84c1.29-0.73,2.09-2.02,2.09-3.48c0-1.53-0.84-2.88-2.15-3.66 C14.61,1.96,13.25,1.96,12.01,1.96z M14.48,4.72c0.64,0.61,1.01,1.44,1.01,2.3c0,1-0.48,1.93-1.28,2.48 c-0.17,0.11-0.35,0.2-0.53,0.27c-0.59-0.8-0.94-1.78-0.94-2.83C12.75,5.81,13.52,4.8,14.48,4.72z" />
    </svg>
);


const LAST_REGISTERED_USER_KEY = 'last_registered_user';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const lastRegisteredUserRaw = localStorage.getItem(LAST_REGISTERED_USER_KEY);
      if (lastRegisteredUserRaw) {
        const lastRegisteredUser = JSON.parse(lastRegisteredUserRaw);
        if(lastRegisteredUser.email && lastRegisteredUser.password) {
            setEmail(lastRegisteredUser.email);
            setPassword(lastRegisteredUser.password);
             toast({
                title: 'Registration Successful',
                description: 'Your credentials are saved. Please log in to continue.',
            });
             // Clean up after pre-filling
            localStorage.removeItem(LAST_REGISTERED_USER_KEY);
        }
      }
    } catch (error) {
      console.error("Failed to parse last registered user from localStorage", error);
    }
  }, [toast]);


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const success = login(email, password);
    if (success) {
      router.push('/');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password.',
      });
    }
  };

  return (
    <div className="w-full max-w-sm space-y-6">
       <div className="flex flex-col items-center text-center">
          <div className='mb-4'>{iaAcademyLogo()}</div>
          <h1 className="text-2xl font-bold text-foreground">E-School MS</h1>
          <p className="text-sm text-muted-foreground">Welcome back! Please enter your details.</p>
       </div>
    
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            className="mt-1"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[2.2rem] text-gray-400"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
             {/* Remember me checkbox removed as per new logic */}
          </div>
          <div className="text-sm">
            <Link
              href="#"
              className="font-medium text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full bg-primary text-white hover:bg-primary/90"
          >
            Log In
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground">OR</span>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <Button variant="outline" className="w-full">
          <GoogleIcon />
          <span className="ml-2">Google</span>
        </Button>
        <Button variant="outline" className="w-full">
          <AppleIcon />
          <span className="ml-2">Apple</span>
        </Button>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="font-medium text-primary hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

    