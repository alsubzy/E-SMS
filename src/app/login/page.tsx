
import { LoginForm } from './login-form';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';

const iaAcademyLogo = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 0C27.9411 0 36 8.05887 36 18C36 27.9411 27.9411 36 18 36C8.05887 36 0 27.9411 0 18C0 8.05887 8.05887 0 18 0Z" fill="url(#paint0_linear_loginpage)"/>
    <path d="M12.4939 24.3438V11.6562H15.0139V17.0362L19.9889 11.6562H22.9939L17.5189 17.5037L23.2339 24.3438H20.1389L16.2919 19.3337L15.0139 20.6812V24.3438H12.4939Z" fill="white"/>
    <defs>
    <linearGradient id="paint0_linear_loginpage" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
    <stop stopColor="#A020F0"/>
    <stop offset="1" stopColor="#C040F0"/>
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
            Simplify your e-commerce management with our user-friendly admin dashboard.
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
