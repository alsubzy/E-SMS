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
  LayoutDashboard,
  Users,
  BookOpen,
  UserCheck,
  GraduationCap,
  Laptop,
  FileText,
  CalendarClock,
  Landmark,
  Boxes,
  Bus,
  Bed,
  Megaphone,
  BarChart3,
  Settings,
  ShieldCheck,
  Wrench,
  User,
  ChevronRight,
  Lock,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
    submenu: [
      { label: 'Overview', href: '/' },
      { label: 'Analytics', href: '/dashboard/analytics' },
      { label: 'Notifications', href: '/dashboard/notifications' },
      { label: 'Quick Actions', href: '/dashboard/actions' },
    ],
  },
  {
    label: 'User Management',
    icon: Users,
    href: '/users',
    submenu: [
      { label: 'Users', href: '/users' },
      { label: 'Roles & Permissions', href: '/users/roles' },
      { label: 'Staff Management', href: '/users/staff' },
      { label: 'Parents', href: '/users/parents' },
      { label: 'User Activity Logs', href: '/users/logs' },
    ],
  },
  {
    label: 'Academic Management',
    icon: BookOpen,
    href: '/academics',
    submenu: [
      { label: 'Classes / Grades', href: '/academics/classes' },
      { label: 'Sections', href: '/academics/sections' },
      { label: 'Subjects', href: '/academics/subjects' },
      { label: 'Academic Calendar', href: '/academics/calendar' },
      { label: 'Class Timetable', href: '/academics/timetable' },
      { label: 'Syllabus Management', href: '/academics/syllabus' },
    ],
  },
  {
    label: 'Teacher Management',
    icon: UserCheck,
    href: '/teachers',
    submenu: [
      { label: 'Teachers', href: '/teachers' },
      { label: 'Teacher Assignment', href: '/teachers/assignment' },
      { label: 'Teaching Schedule', href: '/teachers/schedule' },
      { label: 'Teacher Attendance', href: '/teachers/attendance' },
      { label: 'Performance Evaluation', href: '/teachers/performance' },
    ],
  },
  {
    label: 'Student Management',
    icon: GraduationCap,
    href: '/students',
    submenu: [
      { label: 'Students', href: '/students' },
      { label: 'Student Admission', href: '/students/admission' },
      { label: 'Student Promotion', href: '/students/promotion' },
      { label: 'Student Attendance', href: '/students/attendance' },
      { label: 'Student Profiles', href: '/students/profiles' },
      { label: 'Discipline Records', href: '/students/discipline' },
    ],
  },
  {
    label: 'Learning Management (LMS)',
    icon: Laptop,
    href: '/lms',
    submenu: [
      { label: 'Courses', href: '/lms/courses' },
      { label: 'Lessons', href: '/lms/lessons' },
      { label: 'Assignments', href: '/lms/assignments' },
      { label: 'Exams / Quizzes', href: '/lms/exams' },
      { label: 'Results & Grades', href: '/lms/results' },
      { label: 'Certificates', href: '/lms/certificates' },
    ],
  },
  {
    label: 'Examination & Results',
    icon: FileText,
    href: '/examinations',
    submenu: [
      { label: 'Exam Setup', href: '/examinations/setup' },
      { label: 'Exam Schedule', href: '/examinations/schedule' },
      { label: 'Marks Entry', href: '/examinations/marks' },
      { label: 'Grading System', href: '/examinations/grading' },
      { label: 'Report Cards', href: '/examinations/reports' },
      { label: 'Transcripts', href: '/examinations/transcripts' },
    ],
  },
  {
    label: 'Attendance',
    icon: CalendarClock,
    href: '/attendance',
    submenu: [
      { label: 'Student Attendance', href: '/attendance/student' },
      { label: 'Teacher Attendance', href: '/attendance/teacher' },
      { label: 'Staff Attendance', href: '/attendance/staff' },
      { label: 'Attendance Reports', href: '/attendance/reports' },
    ],
  },
  {
    label: 'Fees & Accounting',
    icon: Landmark,
    href: '/accounting',
    submenu: [
      { label: 'Fee Structure', href: '/accounting/structure' },
      { label: 'Fee Collection', href: '/accounting/collection' },
      { label: 'Invoices', href: '/accounting/invoices' },
      { label: 'Payments', href: '/accounting/payments' },
      { label: 'Scholarships', href: '/accounting/scholarships' },
      { label: 'Financial Reports', href: '/accounting/reports' },
    ],
  },
  {
    label: 'Inventory & Assets',
    icon: Boxes,
    href: '/inventory',
    submenu: [
      { label: 'School Assets', href: '/inventory/assets' },
      { label: 'Asset Assignment', href: '/inventory/assignment' },
      { label: 'Inventory Stock', href: '/inventory/stock' },
      { label: 'Maintenance Records', href: '/inventory/maintenance' },
      { label: 'Depreciation', href: '/inventory/depreciation' },
    ],
  },
  {
    label: 'Transport Management',
    icon: Bus,
    href: '/transport',
    submenu: [
      { label: 'Vehicles', href: '/transport/vehicles' },
      { label: 'Routes', href: '/transport/routes' },
      { label: 'Drivers', href: '/transport/drivers' },
      { label: 'Student Transport Allocation', href: '/transport/allocation' },
      { label: 'Transport Fees', href: '/transport/fees' },
    ],
  },
  {
    label: 'Hostel / Boarding',
    icon: Bed,
    href: '/hostel',
    submenu: [
      { label: 'Hostel Rooms', href: '/hostel/rooms' },
      { label: 'Room Allocation', href: '/hostel/allocation' },
      { label: 'Hostel Attendance', href: '/hostel/attendance' },
      { label: 'Hostel Fees', href: '/hostel/fees' },
    ],
  },
  {
    label: 'Communication',
    icon: Megaphone,
    href: '/communication',
    submenu: [
      { label: 'Announcements', href: '/communication/announcements' },
      { label: 'Notices', href: '/communication/notices' },
      { label: 'Email / SMS', href: '/communication/email-sms' },
      { label: 'Parent Messaging', href: '/communication/parent-messaging' },
      { label: 'In-App Notifications', href: '/communication/in-app' },
    ],
  },
  {
    label: 'Reports & Analytics',
    icon: BarChart3,
    href: '/reports',
    submenu: [
      { label: 'Academic Reports', href: '/reports/academic' },
      { label: 'Attendance Reports', href: '/reports/attendance' },
      { label: 'Financial Reports', href: '/reports/financial' },
      { label: 'Teacher Performance', href: '/reports/teacher-performance' },
      { label: 'Custom Reports', href: '/reports/custom' },
      { label: 'AI Summarizer', href: '/reports/summarize' },
    ],
  },
  {
    label: 'System Settings',
    icon: Settings,
    href: '/settings',
    submenu: [
      { label: 'School Profile', href: '/settings/school-profile' },
      { label: 'Academic Year', href: '/settings/academic-year' },
      { label: 'Class & Grade Setup', href: '/settings/class-setup' },
      { label: 'System Preferences', href: '/settings/preferences' },
      { label: 'Backup & Restore', href: '/settings/backup' },
    ],
  },
  {
    label: 'Security & Audit',
    icon: ShieldCheck,
    href: '/security',
    submenu: [
      { label: 'Login History', href: '/security/login-history' },
      { label: 'Audit Trail', href: '/security/audit-trail' },
      { label: 'Activity Logs', href: '/security/activity-logs' },
      { label: 'Permissions Review', href: '/security/permissions' },
    ],
  },
  {
    label: 'Utilities',
    icon: Wrench,
    href: '/utilities',
    submenu: [
      { label: 'Import / Export', href: '/utilities/import-export' },
      { label: 'Data Migration', href: '/utilities/migration' },
      { label: 'API Access', href: '/utilities/api' },
      { label: 'Webhooks', href: '/utilities/webhooks' },
    ],
  },
  {
    label: 'My Account',
    icon: User,
    href: '/account',
    submenu: [
      { label: 'Profile', href: '/account' },
      { label: 'Change Password', href: '/account/change-password' },
      { label: 'Preferences', href: '/account/preferences' },
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
        <stop stopColor="#10897a" />
        <stop offset="1" stopColor="#00695C" />
      </linearGradient>
    </defs>
  </svg>
);

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  
  const initiallyOpenMenu =
    menuItems.find((item) =>
      item.submenu?.some((sub) => sub.href === pathname)
    )?.label || null;
  const [openMenu, setOpenMenu] = useState<string | null>(initiallyOpenMenu);

  const handleMenuToggle = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };
  
  useEffect(() => {
    const currentOpen = menuItems.find((item) =>
      item.submenu?.some((sub) => sub.href === pathname)
    )?.label;
    if (currentOpen) {
      setOpenMenu(currentOpen);
    }
  }, [pathname]);
  
  const isMenuItemActive = (itemHref: string, hasSubmenu?: boolean) => {
    if (hasSubmenu) {
      // For items with submenus, check if the current path starts with the item's href,
      // but only if the href is not just '/'. This prevents 'Dashboard' from being active for all routes.
      return itemHref !== '/' && pathname.startsWith(itemHref);
    }
    return pathname === itemHref;
  };
  
  const handleParentClick = (item: typeof menuItems[0]) => {
    if (item.submenu) {
      handleMenuToggle(item.label);
    }
    if (item.href) {
      router.push(item.href);
    }
  };


  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <AppLogo />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-sidebar-foreground">
              CampusConnect
            </h2>
            <p className="text-xs text-sidebar-foreground/80">
              School Management
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                 onClick={() => handleParentClick(item)}
                 isActive={isMenuItemActive(item.href, !!item.submenu) || (item.href === '/' && pathname === '/')}
                 className="justify-between group"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
                {item.submenu && (
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${
                      openMenu === item.label ? 'rotate-90' : ''
                    }`}
                  />
                )}
              </SidebarMenuButton>

              {item.submenu && openMenu === item.label && (
                <SidebarMenuSub className="ml-4 border-l pl-4 my-1">
                  {item.submenu.map((subItem) => (
                    <SidebarMenuItem key={subItem.label}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === subItem.href}
                      >
                        <Link href={subItem.href}>{subItem.label}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
          {/* Logout button separate at the bottom */}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} className="justify-between group">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5" />
                <span>Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
