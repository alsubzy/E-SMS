import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from '@/components/ui/badge';
import StatCard from '@/components/stat-card';
import {
  Users,
  GraduationCap,
  Briefcase,
  BookOpen,
  Bell,
  Activity,
} from 'lucide-react';
import { announcements, recentActivities } from '@/lib/data';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value="1,250"
          icon={<GraduationCap className="h-6 w-6 text-muted-foreground" />}
          change="+5.2% from last month"
        />
        <StatCard
          title="Total Teachers"
          value="78"
          icon={<Users className="h-6 w-6 text-muted-foreground" />}
          change="+2.1% from last month"
        />
        <StatCard
          title="Total Staff"
          value="45"
          icon={<Briefcase className="h-6 w-6 text-muted-foreground" />}
          change="+1.5% from last month"
        />
        <StatCard
          title="New Admissions"
          value="120"
          icon={<BookOpen className="h-6 w-6 text-muted-foreground" />}
          change="this academic year"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Announcements
            </CardTitle>
            <CardDescription>
              Latest news and updates for all users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Audience</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {announcements.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{item.audience}</Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {item.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              A log of recent activities in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                    <activity.icon className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
