'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import StatCard from '@/components/stat-card';
import {
  Users,
  GraduationCap,
  Wallet,
  MoreHorizontal,
  User,
} from 'lucide-react';
import { starStudents, recentActivities, examResultData } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BarChart from '@/components/barchart';
import DonutChart from '@/components/donutchart';

const statCards = [
    { title: "Students", value: "15.00K", icon: <GraduationCap size={24} />, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
    { title: "Teachers", value: "2.00K", icon: <Users size={24} />, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
    { title: "Parents", value: "5.6K", icon: <User size={24} />, bgColor: "bg-orange-100", iconColor: "text-orange-600" },
    { title: "Earnings", value: "$19.3K", icon: <Wallet size={24} />, bgColor: "bg-green-100", iconColor: "text-green-600" }
]

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
             <StatCard 
             key={index}
             title={card.title}
             value={card.value}
             icon={card.icon}
             bgColor={card.bgColor}
             iconColor={card.iconColor}
            />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>All Exam Result</CardTitle>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-600" />
                    <span className="text-sm">Teacher</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-400" />
                    <span className="text-sm">Student</span>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <BarChart data={examResultData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Star Students</CardTitle>
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Percent</TableHead>
                  <TableHead>Year</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {starStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={student.avatarUrl}
                            alt={student.name}
                            data-ai-hint="student person"
                          />
                          <AvatarFallback>
                            {student.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.marks}</TableCell>
                    <TableCell>{student.percent}%</TableCell>
                    <TableCell>{student.year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Recent Activity</CardTitle>
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-2 rounded-lg" style={{backgroundColor: activity.bgColor}}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-md" style={{backgroundColor: activity.iconBgColor}}>
                    <activity.icon className="h-5 w-5" style={{color: activity.iconColor}} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                      {activity.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
