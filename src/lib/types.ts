import { LucideIcon } from 'lucide-react';

export type Student = {
  id: string;
  name: string;
  class: string;
  section: string;
  status: 'Active' | 'Inactive';
  avatarUrl: string;
  email: string;
  dateOfBirth: string;
  guardianName: string;
};

export type StarStudent = {
    id: string;
    name: string;
    avatarUrl: string;
    marks: number;
    percent: number;
    year: number;
    selected?: boolean;
}

export type Announcement = {
  id: number;
  title: string;
  audience: string;
  date: string;
};

export type RecentActivity = {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
  iconBgColor: string;
}

export type ExamResult = {
    month: string;
    teacher: number;
    student: number;
}
