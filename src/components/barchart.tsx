'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ExamResult } from '@/lib/types';

interface BarChartProps {
    data: ExamResult[];
}

export default function BarChartComponent({ data }: BarChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value}k`} />
                <Tooltip />
                <Bar dataKey="teacher" fill="#8884d8" name="Teacher" barSize={10} radius={[4, 4, 0, 0]} />
                <Bar dataKey="student" fill="#ff9b57" name="Student" barSize={10} radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
