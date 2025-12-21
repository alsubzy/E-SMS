'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Male', value: 10000 },
  { name: 'Female', value: 5000 },
];

const COLORS = ['#8884d8', '#ff9b57'];

export default function DonutChart() {
    return (
      <div style={{ width: '100%', height: 300, position: 'relative' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <div className="text-muted-foreground">Total</div>
          <div className="text-2xl font-bold">15000</div>
        </div>
      </div>
    );
}
