
import { SignupForm } from './signup-form';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';

export default function SignupPage() {
  const loginIllustration = placeholderImages.find(p => p.id === 'login-illustration');
  return (
    <div className="grid min-h-screen grid-cols-1 bg-background md:grid-cols-2">
       <div className="flex flex-col items-center justify-center p-8">
        <SignupForm />
      </div>
      <div className="relative hidden items-center justify-center bg-primary p-12 text-white md:flex flex-col">
        <div className="relative z-10 w-full max-w-md space-y-4">
          <h2 className="text-4xl font-bold">Join our community of learners.</h2>
          <p className="text-lg text-primary-foreground/80">
            Create an account to get started with our modern school management system.
          </p>
        </div>
         {loginIllustration && (
          <Image
            src={loginIllustration.imageUrl}
            alt={loginIllustration.description}
            fill
            className="absolute inset-0 object-cover opacity-10"
            data-ai-hint={loginIllustration.imageHint}
          />
        )}
      </div>
    </div>
  );
}
