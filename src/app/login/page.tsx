import Image from 'next/image';
import { LoginForm } from './login-form';
import { placeholderImages } from '@/lib/placeholder-images.json';

export default function LoginPage() {
  const loginIllustration = placeholderImages.find(
    (p) => p.id === 'login-illustration'
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg md:grid md:grid-cols-2">
        <div className="relative hidden flex-col justify-between rounded-l-2xl bg-orange-500 p-10 text-white md:flex">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(\'data:image/svg+xml,%3Csvg width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cpattern id=\"noise\" width=\"10\" height=\"10\" viewBox=\"0 0 10 10\"%3E%3Crect width=\"100%\" height=\"100%\" fill=\"%23F97316\"/%3E%3Cg fill-opacity=\"0.1\"%3E%3Ccircle cx=\"5\" cy=\"5\" r=\"1\" fill=\"%23FFFFFF\"/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\"100%\" height=\"100%\" fill=\"url(%23noise)\"/%3E%3C/svg%3E\')",
            }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold leading-tight lg:text-4xl">
              Simplify management with our dashboard.
            </h2>
            <p className="mt-4 text-orange-100">
              Simplify your e-commerce management with our user-friendly admin
              dashboard.
            </p>
          </div>
          {loginIllustration && (
            <div className="relative z-10 h-64 w-full">
              <Image
                src={loginIllustration.imageUrl}
                alt={loginIllustration.description}
                fill
                className="object-contain"
                data-ai-hint={loginIllustration.imageHint}
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-center p-8 md:p-12">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
