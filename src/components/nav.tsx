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
  BarChart2,
  Bell,
  PlusSquare,
  Users2,
  Key,
  User,
  History,
  BookCopy,
  Calendar,
  ClipboardList,
  BookMarked,
  BookText,
  UserCheck,
  Percent,
  UserPlus,
  TrendingUp,
  UserX,
  FileQuestion,
  Award,
  BadgeCheck,
  Cog,
  Calculator,
  Landmark,
  CreditCard,
  Receipt,
  Gift,
  Wallet,
  Boxes,
  TrendingDown,
  Truck,
  Map,
  Car,
  Ticket,
  ClipboardCheck,
  Mail,
  MessageSquare,
  FileClock,
  Activity,
  FileCog,
  RefreshCcw,
  Share2,
  Webhook,
  Lock,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutGrid,
    submenu: [
      { href: '#', label: 'Overview', icon: BarChart2 },
      { href: '#', label: 'Analytics', icon: AreaChart },
      { href: '#', label: 'Notifications', icon: Bell },
      { href: '#', label: 'Quick Actions', icon: PlusSquare },
    ],
  },
  {
    href: '/users',
    label: 'User Management',
    icon: Users,
    submenu: [
      { href: '/users', label: 'Users', icon: Users2 },
      { href: '#', label: 'Roles & Permissions', icon: Key },
      { href: '#', label: 'Staff Management', icon: Briefcase },
      { href: '#', label: 'Parents', icon: User },
      { href: '#', label: 'User Activity Logs', icon: History },
    ],
  },
  {
    href: '/academics',
    label: 'Academic Management',
    icon: GraduationCap,
    submenu: [
      { href: '#', label: 'Classes / Grades', icon: BookCopy },
      { href: '#', label: 'Sections', icon: Users2 },
      { href: '#', label: 'Subjects', icon: BookMarked },
      { href: '#', label: 'Academic Calendar', icon: Calendar },
      { href: '#', label: 'Class Timetable', icon: ClipboardList },
      { href: '#', label: 'Syllabus Management', icon: BookText },
    ],
  },
  {
    href: '/teachers',
    label: 'Teacher Management',
    icon: Briefcase,
    submenu: [
      { href: '/teachers', label: 'Teachers', icon: Users2 },
      { href: '#', label: 'Teacher Assignment', icon: UserCheck },
      { href: '#', label: 'Teaching Schedule', icon: ClipboardList },
      { href: '#', label: 'Teacher Attendance', icon: CalendarCheck },
      { href: '#', label: 'Performance Evaluation', icon: Percent },
    ],
  },
  {
    href: '/students',
    label: 'Student Management',
    icon: Users,
    submenu: [
      { href: '/students', label: 'Students', icon: Users2 },
      { href: '#', label: 'Student Admission', icon: UserPlus },
      { href: '#', label: 'Student Promotion', icon: TrendingUp },
      { href: '#', label: 'Student Attendance', icon: CalendarCheck },
      { href: '#', label: 'Student Profiles', icon: UserCircle },
      { href: '#', label: 'Discipline Records', icon: UserX },
    ],
  },
  {
    href: '/lms',
    label: 'Learning Management',
    icon: BookOpen,
    submenu: [
      { href: '/lms', label: 'Courses', icon: BookCopy },
      { href: '#', label: 'Lessons', icon: BookMarked },
      { href: '#', label: 'Assignments', icon: FileText },
      { href: '#', label: 'Exams / Quizzes', icon: FileQuestion },
      { href: '#', label: 'Results & Grades', icon: Award },
      { href: '#', label: 'Certificates', icon: BadgeCheck },
    ],
  },
  {
    href: '/examinations',
    label: 'Examination & Results',
    icon: FileText,
    submenu: [
      { href: '/examinations', label: 'Exam Setup', icon: Cog },
      { href: '#', label: 'Exam Schedule', icon: Calendar },
      { href: '#', label: 'Marks Entry', icon: Calculator },
      { href: '#', label: 'Grading System', icon: Percent },
      { href: '#', label: 'Report Cards', icon: BookText },
      { href: '#', label: 'Transcripts', icon: FileText },
    ],
  },
  {
    href: '/attendance',
    label: 'Attendance',
    icon: CalendarCheck,
    submenu: [
      { href: '/attendance', label: 'Student Attendance', icon: UserCheck },
      { href: '#', label: 'Teacher Attendance', icon: UserCheck },
      { href: '#', label: 'Staff Attendance', icon: UserCheck },
      { href: '#', label: 'Attendance Reports', icon: BarChart2 },
    ],
  },
  {
    href: '/accounting',
    label: 'Fees & Accounting',
    icon: Banknote,
    submenu: [
      { href: '/accounting', label: 'Fee Structure', icon: Landmark },
      { href: '#', label: 'Fee Collection', icon: CreditCard },
      { href: '#', label: 'Invoices', icon: Receipt },
      { href: '#', label: 'Payments', icon: Wallet },
      { href: '#', label: 'Scholarships', icon: Gift },
      { href: '#', label: 'Financial Reports', icon: BarChart2 },
    ],
  },
  {
    href: '/inventory',
    label: 'Inventory & Assets',
    icon: Box,
    submenu: [
      { href: '/inventory', label: 'School Assets', icon: Landmark },
      { href: '#', label: 'Asset Assignment', icon: UserCheck },
      { href: '#', label: 'Inventory Stock', icon: Boxes },
      { href: '#', label: 'Maintenance Records', icon: Wrench },
      { href: '#', label: 'Depreciation', icon: TrendingDown },
    ],
  },
  {
    href: '/transport',
    label: 'Transport Management',
    icon: Bus,
    submenu: [
      { href: '/transport', label: 'Vehicles', icon: Truck },
      { href: '#', label: 'Routes', icon: Map },
      { href: '#', label: 'Drivers', icon: Car },
      {
        href: '#',
        label: 'Student Transport Allocation',
        icon: UserCheck,
      },
      { href: '#', label: 'Transport Fees', icon: Ticket },
    ],
  },
  {
    href: '/hostel',
    label: 'Hostel / Boarding',
    icon: Bed,
    submenu: [
      { href: '/hostel', label: 'Hostel Rooms', icon: Bed },
      { href: '#', label: 'Room Allocation', icon: UserCheck },
      { href: '#', label: 'Hostel Attendance', icon: ClipboardCheck },
      { href: '#', label: 'Hostel Fees', icon: Wallet },
    ],
  },
  {
    href: '/communication',
    label: 'Communication',
    icon: Megaphone,
    submenu: [
      { href: '/communication', label: 'Announcements', icon: Megaphone },
      { href: '#', label: 'Notices', icon: FileText },
      { href: '#', label: 'Email / SMS', icon: Mail },
      { href: '#', label: 'Parent Messaging', icon: MessageSquare },
      { href: '#', label: 'In-App Notifications', icon: Bell },
    ],
  },
  {
    href: '/reports',
    label: 'Reports & Analytics',
    icon: AreaChart,
    submenu: [
      { href: '/reports/summarize', label: 'Academic Reports', icon: BarChart2 },
      { href: '#', label: 'Attendance Reports', icon: BarChart2 },
      { href: '#', label: 'Financial Reports', icon: BarChart2 },
      { href: '#', label: 'Teacher Performance', icon: BarChart2 },
      { href: '#', label: 'Custom Reports', icon: FileCog },
    ],
  },
  {
    href: '/settings',
    label: 'System Settings',
    icon: Settings,
    submenu: [
      { href: '/settings', label: 'School Profile', icon: Landmark },
      { href: '#', label: 'Academic Year', icon: Calendar },
      { href: '#', label: 'Class & Grade Setup', icon: Cog },
      { href: '#', label: 'System Preferences', icon: Cog },
      { href: '#', label: 'Backup & Restore', icon: RefreshCcw },
    ],
  },
  {
    href: '/security',
    label: 'Security & Audit',
    icon: ShieldCheck,
    submenu: [
      { href: '/security', label: 'Login History', icon: History },
      { href: '#', label: 'Audit Trail', icon: Activity },
      { href: '#', label: 'Activity Logs', icon: FileClock },
      { href: '#', label: 'Permissions Review', icon: Key },
    ],
  },
  {
    href: '/utilities',
    label: 'Utilities',
    icon: Wrench,
    submenu: [
      { href: '/utilities', label: 'Import / Export', icon: Share2 },
      { href: '#', label: 'Data Migration', icon: RefreshCcw },
      { href: '#', label: 'API Access', icon: Share2 },
      { href: '#', label: 'Webhooks', icon: Webhook },
    ],
  },
  {
    href: '/account',
    label: 'My Account',
    icon: UserCircle,
    submenu: [
      { href: '/account', label: 'Profile', icon: UserCircle },
      { href: '#', label: 'Change Password', icon: Lock },
      { href: '#', label: 'Preferences', icon: Cog },
      { href: '#', label: 'Logout', icon: LogOut },
    ],
  },
];

const AppLogo = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 0C27.9411 0 36 8.05887 36 18C36 27.9411 27.9411 36 18 36C8.05887 36 0 27.9411 0 18C0 8.05887 8.05887 0 18 0Z"
      fill="url(#paint0_linear_nav)"
    />
    <path
      d="M9.65137 25.1375L14.4164 12.3069H17.0195L13.1095 22.8463L18.4981 12.3069H20.9856L15.3537 23.3631L21.4931 25.1375H18.7745L15.5495 23.8331L12.4414 25.1375H9.65137Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_nav"
        x1="18"
        y1="0"
        x2="18"
        y2="36"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4A00E0" />
        <stop offset="1" stopColor="#8E2DE2" />
      </linearGradient>
    </defs>
  </svg>
);

export default function Nav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  function isActive(path: string) {
    if (path === '/') return pathname === path;
    return pathname.startsWith(path);
  }

  const handleMenuClick = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

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
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                onClick={() => handleMenuClick(item.label)}
                className="justify-between"
              >
                <Link href={item.href}>
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              </SidebarMenuButton>
              {item.submenu && openMenu === item.label && (
                <SidebarMenuSub>
                  {item.submenu.map((subItem) => (
                    <SidebarMenuItem key={subItem.label}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === subItem.href}
                      >
                        <Link href={subItem.href}>
                           <div className="flex items-center gap-2">
                            <subItem.icon className="h-4 w-4" />
                            <span>{subItem.label}</span>
                          </div>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuItem>
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
