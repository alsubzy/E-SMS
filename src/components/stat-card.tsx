import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ReactNode } from 'react';

type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  bgColor?: string;
  iconColor?: string;
};

export default function StatCard({
  title,
  value,
  icon,
  bgColor,
  iconColor
}: StatCardProps) {
  return (
    <Card className={`${bgColor} border-0`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="text-2xl font-bold">{value}</div>
        <div className={`p-2 rounded-lg ${iconColor}`}>
            {icon}
        </div>
      </CardContent>
    </Card>
  );
}
