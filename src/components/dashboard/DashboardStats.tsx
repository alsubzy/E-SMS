
'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Users, GraduationCap, School, UserCheck } from 'lucide-react';

interface DashboardStatsProps {
    stats: {
        students: number;
        teachers: number;
        classes: number;
        parents: number;
    };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
    const statItems = [
        { title: 'Total Students', value: stats.students, icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Total Teachers', value: stats.teachers, icon: UserCheck, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Classes', value: stats.classes, icon: School, color: 'text-orange-600', bg: 'bg-orange-100' },
        { title: 'Parents', value: stats.parents, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statItems.map((item) => (
                <Card key={item.title} className="rounded-2xl shadow-sm border-none">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className={`p-4 rounded-xl ${item.bg} ${item.color}`}>
                            <item.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                            <h3 className="text-2xl font-bold">{item.value}</h3>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
