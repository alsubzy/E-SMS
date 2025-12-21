
import { LoginForm } from './login-form';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';

const iaAcademyLogo = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 0C27.9411 0 36 8.05887 36 18C36 27.9411 27.9411 36 18 36C8.05887 36 0 27.9411 0 18C0 8.05887 8.05887 0 18 0Z" fill="url(#paint0_linear_loginpage)"/>
    <path d="M9.65137 25.1375L14.4164 12.3069H17.0195L13.1095 22.8463L18.4981 12.3069H20.9856L15.3537 23.3631L21.4931 25.1375H18.7745L15.5495 23.8331L12.4414 25.1375H9.65137Z" fill="white"/>
    <defs>
    <linearGradient id="paint0_linear_loginpage" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
    <stop stopColor="#10897a"/>
    <stop offset="1" stopColor="#00695C"/>
    </linearGradient>
    </defs>
    </svg>   
)

export default function LoginPage() {
  const loginIllustration = placeholderImages.find(p => p.id === 'login-illustration');

  return (
    <div className="grid min-h-screen grid-cols-1 bg-background md:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-8">
        <LoginForm />
      </div>
      <div className="relative hidden items-center justify-center bg-primary p-12 text-white md:flex flex-col">
        <div className="relative z-10 w-full max-w-md space-y-4">
          <h2 className="text-4xl font-bold">Simplify management with our dashboard.</h2>
          <p className="text-lg text-primary-foreground/80">
            Simplify your school management with our user-friendly admin dashboard.
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
