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

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M21.35 11.1h-9.1v3.8h5.2c-.7 2.3-2.8 3.8-5.2 3.8-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6c1.4 0 2.7.5 3.7 1.4l2.9-2.9C18.5 3.3 15.6 2 12.25 2 7.15 2 3.15 6 3.15 11.1s4 9.1 9.1 9.1c5.2 0 8.9-3.7 8.9-8.9 0-.6-.1-1.1-.2-1.6z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path
      fill="#1877F2"
      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.9v-7.02H7.97v-2.89h2.47V10.4c0-2.45 1.45-3.8 3.65-3.8 1.06 0 2.14.19 2.14.19v2.46h-1.28c-1.21 0-1.57.72-1.57 1.5v1.82h2.77l-.44 2.89h-2.33V21.9C18.34 21.13 22 16.99 22 12z"
    />
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
                description: 'Your account is created. Please log in to continue.',
            });
             // Clean up after pre-filling
            localStorage.removeItem(LAST_REGISTERED_USER_KEY);
        }
      }
      else {
        // Default credentials if no one has just registered
        setEmail('admin@example.com');
        setPassword('password');
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
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Please login to your account
        </p>
      </div>

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 bg-gray-50"
            placeholder="Email address"
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
            className="mt-1 bg-gray-50"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[2.2rem] text-gray-400"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-end">
          <div className="text-sm">
            <Link
              href="#"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full bg-orange-500 text-white hover:bg-orange-600"
          >
            Login
          </Button>
        </div>
      </form>

      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Or Login with</span>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-4">
        <Button variant="outline" className="w-full">
          <GoogleIcon />
          <span className="ml-2">Google</span>
        </Button>
        <Button variant="outline" className="w-full">
          <FacebookIcon />
          <span className="ml-2">Facebook</span>
        </Button>
      </div>
      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="font-medium text-orange-600 hover:text-orange-500"
        >
          Signup
        </Link>
      </p>
    </div>
  );
}
