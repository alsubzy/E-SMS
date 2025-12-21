
'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
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
  LayoutDashboard,
  ShieldCheck,
  Building,
  UserCog,
  UserSquare,
  Clock,
  Book,
  Wallet,
  Landmark,
  Archive,
  BarChart2,
  SlidersHorizontal,
  Lock,
  ArrowRightLeft,
  LogOut,
  Bell,
  LineChart,
  Activity,
  CreditCard,
  FilePieChart,
  Banknote,
  GraduationCap,
  Award,
  BookMarked,
  BookCopy,
  CalendarDays,
  CalendarCheck,
  BookUp,
  UserCheck,
  UserX,
  FileClock,
  MessageSquare,
  Mail,
  ListTree,
  FolderCog,
  DatabaseBackup,
  History,
  KeyRound,
  FileCog,
  FileJson,
  Webhook,
  Map,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard, 
        subItems: [
            { href: '/', label: 'Overview', icon: Home },
            { href: '/dashboard/analytics', label: 'Analytics', icon: LineChart },
            { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
            { href: '/dashboard/actions', label: 'Quick Actions', icon: Activity },
        ]
    },
    { href: '/users', label: 'User Management', icon: UserCog,
        subItems: [
            { href: '/users', label: 'Users', icon: Users },
            { href: '/users/roles', label: 'Roles & Permissions', icon: ShieldCheck },
            { href: '/users/staff', label: 'Staff Management', icon: UserSquare },
            { href: '/users/parents', label: 'Parents', icon: Users },
            { href: '/users/logs', label: 'User Activity Logs', icon: History },
        ]
    },
    { href: '/academics', label: 'Academic Management', icon: BookOpen,
        subItems: [
            { href: '/academics/classes', label: 'Classes / Grades', icon: GraduationCap },
            { href: '/academics/sections', label: 'Sections', icon: BookCopy },
            { href: '/academics/subjects', label: 'Subjects', icon: BookMarked },
            { href: '/academics/calendar', label: 'Academic Calendar', icon: CalendarDays },
            { href: '/academics/timetable', label: 'Class Timetable', icon: CalendarCheck },
            { href: '/academics/syllabus', label: 'Syllabus Management', icon: BookUp },
        ]
    },
    { href: '/teachers', label: 'Teacher Management', icon: User,
        subItems: [
            { href: '/teachers', label: 'Teachers', icon: Users },
            { href: '/teachers/assignment', label: 'Teacher Assignment', icon: UserCheck },
            { href: '/teachers/schedule', label: 'Teaching Schedule', icon: Calendar },
            { href: '/teachers/attendance', label: 'Teacher Attendance', icon: ClipboardCheck },
            { href: '/teachers/performance', label: 'Performance Evaluation', icon: Award },
        ]
    },
    { href: '/students', label: 'Student Management', icon: GraduationCap,
        subItems: [
            { href: '/students', label: 'Students', icon: Users },
            { href: '/students/admission', label: 'Student Admission', icon: UserCog },
            { href: '/students/promotion', label: 'Student Promotion', icon: UserCheck },
            { href: '/students/attendance', label: 'Student Attendance', icon: ClipboardCheck },
            { href: '/students/profiles', label: 'Student Profiles', icon: UserSquare },
            { href: '/students/discipline', label: 'Discipline Records', icon: UserX },
        ]
    },
    { href: '/lms', label: 'LMS', icon: Library,
        subItems: [
            { href: '/lms/courses', label: 'Courses', icon: Book },
            { href: '/lms/lessons', label: 'Lessons', icon: BookOpen },
            { href: '/lms/assignments', label: 'Assignments', icon: FileText },
            { href: '/lms/exams', label: 'Exams / Quizzes', icon: ClipboardList },
            { href: '/lms/results', label: 'Results & Grades', icon: GraduationCap },
            { href: '/lms/certificates', label: 'Certificates', icon: Award },
        ]
    },
    { href: '/examinations', label: 'Examination & Results', icon: ClipboardList,
        subItems: [
            { href: '/examinations/setup', label: 'Exam Setup', icon: Settings },
            { href: '/examinations/schedule', label: 'Exam Schedule', icon: Calendar },
            { href: '/examinations/marks', label: 'Marks Entry', icon: FileText },
            { href: '/examinations/grading', label: 'Grading System', icon: GraduationCap },
            { href: '/examinations/reports', label: 'Report Cards', icon: FilePieChart },
            { href: '/examinations/transcripts', label: 'Transcripts', icon: FileText },
        ]
    },
    { href: '/attendance', label: 'Attendance', icon: ClipboardCheck,
        subItems: [
            { href: '/attendance/student', label: 'Student Attendance', icon: UserCheck },
            { href: '/attendance/teacher', label: 'Teacher Attendance', icon: UserCheck },
            { href: '/attendance/staff', label: 'Staff Attendance', icon: UserCheck },
            { href: '/attendance/reports', label: 'Attendance Reports', icon: FileClock },
        ]
    },
    { href: '/accounting', label: 'Fees & Accounting', icon: Wallet,
        subItems: [
            { href: '/accounting/fees', label: 'Fee Structure', icon: FileText },
            { href: '/accounting/collection', label: 'Fee Collection', icon: Banknote },
            { href: '/accounting/invoices', label: 'Invoices', icon: FileText },
            { href: '/accounting/payments', label: 'Payments', icon: CreditCard },
            { href: '/accounting/scholarships', label: 'Scholarships', icon: Award },
            { href: '/accounting/reports', label: 'Financial Reports', icon: FilePieChart },
        ]
    },
    { href: '/inventory', label: 'Inventory & Assets', icon: Archive,
        subItems: [
            { href: '/inventory/assets', label: 'School Assets', icon: Building },
            { href: '/inventory/assignment', label: 'Asset Assignment', icon: UserCheck },
            { href: '/inventory/stock', label: 'Inventory Stock', icon: ListTree },
            { href: '/inventory/maintenance', label: 'Maintenance Records', icon: FileCog },
        ]
    },
    { href: '/transport', label: 'Transport', icon: Bus,
        subItems: [
            { href: '/transport/vehicles', label: 'Vehicles', icon: Bus },
            { href: '/transport/routes', label: 'Routes', icon: Map },
            { href: '/transport/drivers', label: 'Drivers', icon: User },
            { href: '/transport/allocation', label: 'Student Allocation', icon: UserCheck },
            { href: '/transport/fees', label: 'Transport Fees', icon: Wallet },
        ]
    },
    { href: '/hostel', label: 'Hostel', icon: Bed,
        subItems: [
            { href: '/hostel/rooms', label: 'Hostel Rooms', icon: Bed },
            { href: '/hostel/allocation', label: 'Room Allocation', icon: UserCheck },
            { href: '/hostel/attendance', label: 'Hostel Attendance', icon: ClipboardCheck },
            { href: '/hostel/fees', label: 'Hostel Fees', icon: Wallet },
        ]
    },
    { href: '/communication', label: 'Communication', icon: MessageSquare,
        subItems: [
            { href: '/communication/announcements', label: 'Announcements', icon: Bell },
            { href: '/communication/notices', label: 'Notices', icon: FileText },
            { href: '/communication/email-sms', label: 'Email / SMS', icon: Mail },
            { href: '/communication/messaging', label: 'Parent Messaging', icon: MessageSquare },
        ]
    },
    { href: '/reports', label: 'Reports & Analytics', icon: BarChart2,
        subItems: [
            { href: '/reports/summarize', label: 'AI Summarization', icon: Sparkles },
            { href: '/reports/academic', label: 'Academic Reports', icon: FilePieChart },
            { href: '/reports/attendance', label: 'Attendance Reports', icon: FileClock },
            { href: '/reports/financial', label: 'Financial Reports', icon: Landmark },
            { href: '/reports/performance', label: 'Teacher Performance', icon: LineChart },
            { href: '/reports/custom', label: 'Custom Reports', icon: FileCog },
        ]
    },
    { href: '/settings', label: 'System Settings', icon: SlidersHorizontal,
        subItems: [
            { href: '/settings/school', label: 'School Profile', icon: Building },
            { href: '/settings/academic-year', label: 'Academic Year', icon: Calendar },
            { href: '/settings/setup', label: 'Class & Grade Setup', icon: GraduationCap },
            { href: '/settings/preferences', label: 'System Preferences', icon: Settings },
            { href: '/settings/backup', label: 'Backup & Restore', icon: DatabaseBackup },
        ]
    },
    { href: '/security', label: 'Security & Audit', icon: Lock,
        subItems: [
            { href: '/security/history', label: 'Login History', icon: History },
            { href: '/security/audit', label: 'Audit Trail', icon: FileClock },
            { href: '/security/logs', label: 'Activity Logs', icon: Activity },
            { href: '/security/permissions', label: 'Permissions Review', icon: ShieldCheck },
        ]
    },
    { href: '/utilities', label: 'Utilities', icon: FileCog,
        subItems: [
            { href: '/utilities/import-export', label: 'Import / Export', icon: ArrowRightLeft },
            { href: '/utilities/migration', label: 'Data Migration', icon: DatabaseBackup },
            { href: '/utilities/api', label: 'API Access', icon: KeyRound },
            { href: '/utilities/webhooks', label: 'Webhooks', icon: Webhook },
        ]
    },
    { href: '/account', label: 'My Account', icon: User,
        subItems: [
            { href: '/account', label: 'Profile', icon: UserSquare },
            { href: '/account/password', label: 'Change Password', icon: Lock },
            { href: '/account/preferences', label: 'Preferences', icon: Settings },
        ]
    },
];

const iaAcademyLogo = () => (
    <svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 0C27.9411 0 36 8.05887 36 18C36 27.9411 27.9411 36 18 36C8.05887 36 0 27.9411 0 18C0 8.05887 8.05887 0 18 0Z" fill="url(#paint0_linear_2_22)"/>
    <path d="M9.65137 25.1375L14.4164 12.3069H17.0195L13.1095 22.8463L18.4981 12.3069H20.9856L15.3537 23.3631L21.4931 25.1375H18.7745L15.5495 23.8331L12.4414 25.1375H9.65137Z" fill="white"/>
    <defs>
    <linearGradient id="paint0_linear_2_22" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
    <stop stopColor="#4A00E0"/>
    <stop offset="1" stopColor="#8E2DE2"/>
    </linearGradient>
    </defs>
    </svg>   
)

export default function Nav() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const activeSection = menuItems.find(item => item.subItems?.some(subItem => isActive(subItem.href, true)));
    return activeSection ? { [activeSection.href]: true } : {};
  });

  function isActive(path: string, exact = false) {
    if (exact) return pathname === path;
    if (path === '/') return pathname === '/';
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
            <span className="font-headline text-lg font-semibold text-primary">E-School MS</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild={!item.subItems}
                isActive={!item.subItems && isActive(item.href, item.href === '/')}
                onClick={() => item.subItems && toggleSection(item.href)}
                className={`justify-between ${isActive(item.href) && !item.subItems ? 'bg-purple-100 text-primary' : ''}`}
              >
                {item.subItems ? (
                   <div>
                     <div className="flex items-center gap-2">
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                     </div>
                     <ChevronDown className={`h-4 w-4 transition-transform ${openSections[item.href] ? 'rotate-180' : ''}`} />
                   </div>
                ) : (
                  <Link href={item.href}>
                    <div className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                )}
              </SidebarMenuButton>
              {item.subItems && openSections[item.href] && (
                <SidebarMenuSub>
                  {item.subItems.map(subItem => (
                    <SidebarMenuItem key={subItem.href}>
                      <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                        <Link href={subItem.href}>
                            <subItem.icon className="h-4 w-4 mr-2" />
                            {subItem.label}
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
