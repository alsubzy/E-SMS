'use client';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface RingProgressProps {
  progress: number;
}

export function RingProgress({ progress }: RingProgressProps) {
  const data = [
    { name: 'Completed', value: progress },
    { name: 'Remaining', value: 100 - progress },
  ];
  const COLORS = ['hsl(var(--primary))', 'hsl(var(--primary) / 0.2)'];

  return (
    <div className="relative h-32 w-32">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={60}
                startAngle={90}
                endAngle={450}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
            >
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <div className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                {progress}%
            </div>
        </div>
    </div>

  );
}
