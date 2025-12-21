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

export type Announcement = {
  id: number;
  title: string;
  audience: string;
  date: string;
};

export type RecentActivity = {
  id: number;
  description: string;
  timestamp: string;
  icon: LucideIcon;
}
