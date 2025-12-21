import Image from 'next/image';
import { LoginForm } from './login-form';
import { placeholderImages } from '@/lib/placeholder-images.json';

export default function LoginPage() {
  const loginIllustration = placeholderImages.find(
    (p) => p.id === 'login-illustration'
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 md:p-8">
      <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg md:grid md:grid-cols-2">
        <div className="flex flex-col justify-between p-8 md:p-12">
          <LoginForm />
          <footer className="mt-8 text-center text-sm text-gray-500">
            <div className="flex justify-between">
                <p>Copyright © 2025 Sellora Enterprises LTD.</p>
                <a href="#" className="hover:underline">Privacy Policy</a>
            </div>
          </footer>
        </div>
        <div className="relative hidden flex-col justify-center rounded-r-2xl bg-[#4A4DE6] p-12 text-white md:flex">
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
              Effortlessly manage your team and operations.
            </h2>
            <p className="text-lg text-indigo-100">
              Log in to access your CRM dashboard and manage your team.
            </p>
          </div>
          {loginIllustration && (
            <div className="relative z-10 mt-8 h-80 w-full">
              <Image
                src={loginIllustration.imageUrl}
                alt={loginIllustration.description}
                fill
                className="rounded-lg object-cover"
                data-ai-hint={loginIllustration.imageHint}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
