'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { RingProgress } from './RingProgress';

const data = [
  { name: '1-10 Aug', value: 30 },
  { name: '11-20 Aug', value: 45 },
  { name: '21-30 Aug', value: 65 },
  { name: '31 Aug', value: 25 },
];

export default function Statistics() {
  const { userProfile } = useAuth();
  
  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <Card className="rounded-3xl shadow-lg border-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold">Statistic</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative my-4">
            <RingProgress progress={32} />
            <div className="absolute inset-0 flex items-center justify-center">
                {userProfile && (
                <Avatar className="h-20 w-20 border-4 border-background">
                    <AvatarImage src={userProfile.avatarUrl} alt={userProfile.fullName} />
                    <AvatarFallback>{getInitials(userProfile.fullName)}</AvatarFallback>
                </Avatar>
                )}
            </div>
        </div>

        <div className="text-center">
            <h3 className="text-lg font-bold">Good Morning {userProfile?.fullName.split(' ')[0]} 🔥</h3>
            <p className="text-sm text-muted-foreground">Continue your learning to achieve your target!</p>
        </div>

        <div className="w-full h-40 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
              <YAxis hide={true} domain={[0, 80]} />
              <Bar dataKey="value" barSize={20} radius={[10, 10, 10, 10]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 2 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.2)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
