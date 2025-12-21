
'use client';

import { Bell, ChevronDown, Search, MessageCircle, User, Settings, Lock, BellRing, History, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const { logout, userProfile } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-8">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
      </div>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="What do you want to find?"
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
            />
          </div>
        </form>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MessageCircle className="h-5 w-5" />
          <span className="sr-only">Toggle messages</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 rounded-full p-1 h-auto"
            >
              {userProfile && (
                <>
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={userProfile.avatarUrl}
                      alt={userProfile.fullName}
                      data-ai-hint="person face"
                    />
                    <AvatarFallback>{getInitials(userProfile.fullName)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left md:flex flex-col">
                    <span className="text-sm font-medium">{userProfile.fullName}</span>
                    <span className="text-xs text-muted-foreground">Admin</span>
                  </div>
                  <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account"><User className="mr-2 h-4 w-4" />View Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account"><Settings className="mr-2 h-4 w-4" />Edit Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellRing className="mr-2 h-4 w-4" />
              Notification Preferences
            </DropdownMenuItem>
            <DropdownMenuItem>
              <History className="mr-2 h-4 w-4" />
              Activity History
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

    