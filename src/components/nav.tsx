'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Home,
  Users,
  BookOpen,
  FileText,
  Calendar,
  ClipboardCheck,
  ClipboardList,
  Bus,
  Bed,
  ChevronDown,
  User,
  Library,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  { href: '/home', label: 'Home', icon: Home, subItems: [{href: "/admin", label: "Admin"}, {href: "/students-main", label: "Students"}, {href: "/teachers-main", label: "Teachers"}]},
  { href: '/students', label: 'Students', icon: Users },
  { href: '/teachers', label: 'Teachers', icon: User },
  { href: '/library', label: 'Library', icon: Library },
  { href: '/account', label: 'Account', icon: Users, subItems: [] },
  { href: '/class', label: 'Class', icon: BookOpen },
  { href: '/subject', label: 'Subject', icon: BookOpen },
  { href: '/routine', label: 'Routine', icon: Calendar },
  { href: '/attendance', label: 'Attendance', icon: ClipboardCheck },
  { href: '/exam', label: 'Exam', icon: ClipboardList, subItems: [] },
  { href: '/notice', label: 'Notice', icon: FileText },
  { href: '/transport', label: 'Transport', icon: Bus },
  { href: '/hostel', label: 'Hostel', icon: Bed },
];

const iaAcademyLogo = () => (
    <svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 0C27.9411 0 36 8.05887 36 18C36 27.9411 27.9411 36 18 36C8.05887 36 0 27.9411 0 18C0 8.05887 8.05887 0 18 0Z" fill="url(#paint0_linear_2_22)"/>
    <path d="M12.4939 24.3438V11.6562H15.0139V17.0362L19.9889 11.6562H22.9939L17.5189 17.5037L23.2339 24.3438H20.1389L16.2919 19.3337L15.0139 20.6812V24.3438H12.4939Z" fill="white"/>
    <defs>
    <linearGradient id="paint0_linear_2_22" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
    <stop stopColor="#A020F0"/>
    <stop offset="1" stopColor="#C040F0"/>
    </linearGradient>
    </defs>
    </svg>   
)

export default function Nav() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    '/home': true,
  });

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    if (path.startsWith('/admin')) {
        return pathname === '/admin'
    }
    return pathname.startsWith(path);
  };

  const toggleSection = (href: string) => {
    setOpenSections(prev => ({ ...prev, [href]: !prev[href] }));
  };

  return (
    <>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2">
            {iaAcademyLogo()}
            <span className="font-headline text-lg font-semibold text-primary">ia Academy</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href) && !item.subItems}
                onClick={() => item.subItems && toggleSection(item.href)}
                className={`justify-between ${isActive(item.href) ? 'bg-purple-100 text-primary' : ''}`}
              >
                <Link href={item.href}>
                  <div className="flex items-center gap-2">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.subItems && <ChevronDown className={`h-4 w-4 transition-transform ${openSections[item.href] ? 'rotate-180' : ''}`} />}
                </Link>
              </SidebarMenuButton>
              {item.subItems && openSections[item.href] && (
                <SidebarMenuSub>
                  {item.subItems.map(subItem => (
                    <SidebarMenuSubItem key={subItem.href}>
                      <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                        <Link href={subItem.href}>{subItem.label}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
