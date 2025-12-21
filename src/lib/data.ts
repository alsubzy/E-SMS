import type { StarStudent, RecentActivity, ExamResult } from '@/lib/types';
import { placeholderImages } from './placeholder-images.json';
import { User, Wallet, GraduationCap as NewCourseIcon } from 'lucide-react';

export const starStudents: StarStudent[] = [
  {
    id: 'PRE43178',
    name: 'Evelyn Harper',
    avatarUrl: placeholderImages.find(p => p.id === 'student-1')?.imageUrl ?? '',
    marks: 1185,
    percent: 98,
    year: 2014,
  },
  {
    id: 'PRE43174',
    name: 'Diana Plenty',
    avatarUrl: placeholderImages.find(p => p.id === 'student-2')?.imageUrl ?? '',
    marks: 1165,
    percent: 91,
    year: 2014,
    selected: true,
  },
  {
    id: 'PRE43187',
    name: 'John Millar',
    avatarUrl: placeholderImages.find(p => p.id === 'student-3')?.imageUrl ?? '',
    marks: 1175,
    percent: 92,
    year: 2014,
  },
];

export const recentActivities: RecentActivity[] = [
  {
    id: 1,
    title: 'New Teacher',
    description: 'It is a long established readable...',
    timestamp: 'Just now',
    icon: User,
    bgColor: '#EAF2FF',
    iconColor: '#2F80ED',
    iconBgColor: '#C0D9FF'
  },
  {
    id: 2,
    title: 'Fees Structure',
    description: 'It is a long established readable...',
    timestamp: 'Today',
    icon: Wallet,
    bgColor: '#FFEFEF',
    iconColor: '#FF5B5B',
    iconBgColor: '#FFD6D6',
  },
  {
    id: 3,
    title: 'New Course',
    description: 'It is a long established readable...',
    timestamp: '24 Sep 2023',
    icon: NewCourseIcon,
    bgColor: '#E8F5E9',
    iconColor: '#4CAF50',
    iconBgColor: '#C8E6C9',
  },
];

export const examResultData: ExamResult[] = [
    { month: 'Jan', teacher: 65, student: 45 },
    { month: 'Feb', teacher: 50, student: 48 },
    { month: 'Mar', teacher: 70, student: 60 },
    { month: 'Apr', teacher: 40, student: 80 },
    { month: 'May', teacher: 120, student: 90 },
    { month: 'Jun', teacher: 70, student: 55 },
    { month: 'Jul', teacher: 80, student: 60 },
    { month: 'Aug', teacher: 95, student: 70 },
    { month: 'Sep', teacher: 60, student: 110 },
    { month: 'Oct', teacher: 75, student: 65 },
    { month: 'Nov', teacher: 60, student: 45 },
    { month: 'Dec', teacher: 50, student: 30 },
]
