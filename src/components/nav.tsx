'use client';

import {
  SidebarClose,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import {
  LayoutGrid,
  ChevronDown,
  Users,
  GraduationCap,
  Briefcase,
  BookOpen,
  FileText,
  CalendarCheck,
  Banknote,
  Box,
  Bus,
  Bed,
  Megaphone,
  AreaChart,
  Settings,
  ShieldCheck,
  Wrench,
  UserCircle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutGrid,
  },
  {
    href: '/users',
    label: 'User Management',
    icon: Users,
  },
  {
    href: '/academics',
    label: 'Academic Management',
    icon: GraduationCap,
  },
  {
    href: '/teachers',
    label: 'Teacher Management',
    icon: Briefcase,
  },
  {
    href: '/students',
    label: 'Student Management',
    icon: Users,
  },
  {
    href: '/lms',
    label: 'Learning Management',
    icon: BookOpen,
  },
  {
    href: '/examinations',
    label: 'Examination & Results',
    icon: FileText,
  },
  {
    href: '/attendance',
    label: 'Attendance',
    icon: CalendarCheck,
  },
  {
    href: '/accounting',
    label: 'Fees & Accounting',
    icon: Banknote,
  },
  {
    href: '/inventory',
    label: 'Inventory & Assets',
    icon: Box,
  },
  {
    href: '/transport',
    label: 'Transport Management',
    icon: Bus,
  },
  {
    href: '/hostel',
    label: 'Hostel / Boarding',
    icon: Bed,
  },
  {
    href: '/communication',
    label: 'Communication',
    icon: Megaphone,
  },
  {
    href: '/reports',
    label: 'Reports & Analytics',
    icon: AreaChart,
  },
  {
    href: '/settings',
    label: 'System Settings',
    icon: Settings,
  },
  {
    href: '/security',
    label: 'Security & Audit',
    icon: ShieldCheck,
  },
  {
    href: '/utilities',
    label: 'Utilities',
    icon: Wrench,
  },
  {
    href: '/account',
    label: 'My Account',
    icon: UserCircle,
  },
];

const AppLogo = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 0C27.9411 0 36 8.05887 36 18C36 27.9411 27.9411 36 18 36C8.05887 36 0 27.9411 0 18C0 8.05887 8.05887 0 18 0Z" fill="url(#paint0_linear_nav)"/>
    <path d="M9.65137 25.1375L14.4164 12.3069H17.0195L13.1095 22.8463L18.4981 12.3069H20.9856L15.3537 23.3631L21.4931 25.1375H18.7745L15.5495 23.8331L12.4414 25.1375H9.65137Z" fill="white"/>
    <defs>
    <linearGradient id="paint0_linear_nav" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
    <stop stopColor="#4A00E0"/>
    <stop offset="1" stopColor="#8E2DE2"/>
    </linearGradient>
    </defs>
    </svg>   
)

export default function Nav() {
  const pathname = usePathname();

  function isActive(path: string) {
    return pathname === path;
  }

  return (
    <>
      <SidebarHeader className="border-b-0 p-4">
        <div className="flex items-center gap-2">
            <AppLogo />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">CampusConnect</h2>
              <p className="text-xs text-muted-foreground">School Management</p>
            </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                className={`justify-start text-gray-600 hover:text-black ${isActive(item.href) ? 'text-black bg-gray-100' : ''}`}
              >
                  <Link href={item.href}>
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className='font-medium'>{item.label}</span>
                    </div>
                  </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
