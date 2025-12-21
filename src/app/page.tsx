'use client';
import Hero from '@/components/dashboard/Hero';
import ProgressCards from '@/components/dashboard/ProgressCards';
import ContinueWatching from '@/components/dashboard/ContinueWatching';
import Statistics from '@/components/dashboard/Statistics';
import MentorList from '@/components/dashboard/MentorList';
import LessonTable from '@/components/dashboard/LessonTable';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-6">
      <div className="lg:col-span-2 flex flex-col gap-8">
        <Hero />
        <ProgressCards />
        <ContinueWatching />
        <LessonTable />
      </div>
      <div className="lg:col-span-1 flex flex-col gap-8">
        <Statistics />
        <MentorList />
      </div>
    </div>
  );
}
