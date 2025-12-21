import type { Student, Announcement, RecentActivity } from '@/lib/types';
import { placeholderImages } from './placeholder-images.json';
import { FilePlus2, UserPlus, FileText } from 'lucide-react';

export const students: Student[] = [
  {
    id: 'STU-001',
    name: 'Olivia Martin',
    class: '10',
    section: 'A',
    status: 'Active',
    avatarUrl: placeholderImages.find(p => p.id === 'student-1')?.imageUrl ?? '',
    email: 'olivia.martin@example.com',
    dateOfBirth: '2008-05-15',
    guardianName: 'Sophia Martin',
  },
  {
    id: 'STU-002',
    name: 'Jackson Lee',
    class: '10',
    section: 'B',
    status: 'Active',
    avatarUrl: placeholderImages.find(p => p.id === 'student-2')?.imageUrl ?? '',
    email: 'jackson.lee@example.com',
    dateOfBirth: '2008-09-22',
    guardianName: 'David Lee',
  },
  {
    id: 'STU-003',
    name: 'Isabella Nguyen',
    class: '11',
    section: 'A',
    status: 'Active',
    avatarUrl: placeholderImages.find(p => p.id === 'student-3')?.imageUrl ?? '',
    email: 'isabella.nguyen@example.com',
    dateOfBirth: '2007-02-10',
    guardianName: 'Grace Nguyen',
  },
  {
    id: 'STU-004',
    name: 'William Kim',
    class: '9',
    section: 'C',
    status: 'Inactive',
    avatarUrl: placeholderImages.find(p => p.id === 'student-4')?.imageUrl ?? '',
    email: 'william.kim@example.com',
    dateOfBirth: '2009-11-30',
    guardianName: 'James Kim',
  },
  {
    id: 'STU-005',
    name: 'Ava Patel',
    class: '12',
    section: 'A',
    status: 'Active',
    avatarUrl: placeholderImages.find(p => p.id === 'student-5')?.imageUrl ?? '',
    email: 'ava.patel@example.com',
    dateOfBirth: '2006-07-19',
    guardianName: 'Priya Patel',
  },
   {
    id: 'STU-006',
    name: 'Noah Garcia',
    class: '10',
    section: 'A',
    status: 'Active',
    avatarUrl: placeholderImages.find(p => p.id === 'student-1')?.imageUrl ?? '',
    email: 'noah.garcia@example.com',
    dateOfBirth: '2008-03-12',
    guardianName: 'Maria Garcia',
  },
  {
    id: 'STU-007',
    name: 'Sophia Rodriguez',
    class: '11',
    section: 'B',
    status: 'Active',
    avatarUrl: placeholderImages.find(p => p.id === 'student-2')?.imageUrl ?? '',
    email: 'sophia.rodriguez@example.com',
    dateOfBirth: '2007-08-25',
    guardianName: 'Carlos Rodriguez',
  },
];

export const announcements: Announcement[] = [
  {
    id: 1,
    title: 'Annual Sports Day Postponed',
    audience: 'All',
    date: '2024-07-25',
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting for Grade 10',
    audience: 'Teachers, Parents',
    date: '2024-07-22',
  },
  {
    id: 3,
    title: 'Science Fair Submissions Open',
    audience: 'Students',
    date: '2024-07-20',
  },
  {
    id: 4,
    title: 'Staff Meeting on Friday',
    audience: 'Staff',
    date: '2024-07-19',
  },
];

export const recentActivities: RecentActivity[] = [
  {
    id: 1,
    description: 'New student "Noah Garcia" was admitted.',
    timestamp: '2 hours ago',
    icon: UserPlus,
  },
  {
    id: 2,
    description: 'A new assignment "Algebra II Homework" was created.',
    timestamp: '5 hours ago',
    icon: FilePlus2,
  },
  {
    id: 3,
    description: 'Attendance for Grade 10 was marked.',
    timestamp: '1 day ago',
    icon: FileText,
  },
];
