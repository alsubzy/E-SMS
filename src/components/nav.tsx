'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  BarChart3,
  BookOpen,
  Briefcase,
  CalendarCheck,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  School,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/students', label: 'Students', icon: GraduationCap },
  { href: '/teachers', label: 'Teachers', icon: Users },
  { href: '/staff', label: 'Staff', icon: Briefcase },
  { href: '/attendance', label: 'Attendance', icon: CalendarCheck },
  { href: '/announcements', label: 'Announcements', icon: Megaphone },
  {
    href: '/reports',
    label: 'Reports',
    icon: BarChart3,
    subItems: [{ href: '/reports/summarize', label: 'AI Summarizer' }],
  },
  { href: '/library', label: 'Library', icon: BookOpen },
];

export default function Nav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      <SidebarHeader className="border-b">
         <Link href="/" className="flex items-center gap-2 font-bold text-lg md:hidden">
          <School className="h-6 w-6 text-primary" />
          <span className="font-headline">CampusConnect</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/settings')}
              tooltip={{ children: 'Settings' }}
            >
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
