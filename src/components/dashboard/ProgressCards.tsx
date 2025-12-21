'use client';
import { Card, CardContent } from '@/components/ui/card';
import { BrainCircuit, PenTool, Code, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const progressData = [
  {
    title: 'UI/UX Design',
    watched: '2/8',
    icon: <BrainCircuit className="h-6 w-6" />,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/50',
  },
  {
    title: 'Branding',
    watched: '3/8',
    icon: <PenTool className="h-6 w-6" />,
    color: 'text-pink-500',
    bgColor: 'bg-pink-100 dark:bg-pink-900/50',
  },
  {
    title: 'Front End',
    watched: '6/12',
    icon: <Code className="h-6 w-6" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/50',
  },
];

export default function ProgressCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {progressData.map((item) => (
        <Card key={item.title} className="rounded-3xl shadow-lg border-none">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${item.bgColor} ${item.color}`}>
                {item.icon}
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{item.watched} watched</p>
              <h3 className="text-lg font-bold">{item.title}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
