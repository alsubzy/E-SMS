'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/stat-card';
import { DollarSign, User, Users, Book } from 'lucide-react';
import BarChartComponent from '@/components/barchart';
import DonutChart from '@/components/donutchart';
import { examResultData, starStudents } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold">Welcome Admin!</h1>
            <p className="text-muted-foreground">
              Here is the information about your school.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">Download</Button>
            <Button>Settings</Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Students"
          value="50055"
          icon={<Users className="h-6 w-6" />}
          bgColor="bg-blue-100"
          iconColor="text-blue-500"
        />
        <StatCard
          title="Teachers"
          value="225"
          icon={<User className="h-6 w-6" />}
          bgColor="bg-purple-100"
          iconColor="text-purple-500"
        />
        <StatCard
          title="Courses"
          value="35"
          icon={<Book className="h-6 w-6" />}
          bgColor="bg-yellow-100"
          iconColor="text-yellow-500"
        />
        <StatCard
          title="Revenue"
          value="$505"
          icon={<DollarSign className="h-6 w-6" />}
          bgColor="bg-green-100"
          iconColor="text-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Exam Result</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartComponent data={examResultData} />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Star Students</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
                 <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                    >
                    <CarouselContent>
                        {starStudents.map((student) => (
                        <CarouselItem key={student.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                               <Card className={`text-center ${student.selected ? 'bg-primary text-primary-foreground' : ''}`}>
                                    <CardContent className="flex flex-col items-center gap-4 pt-6">
                                        <Avatar className="h-20 w-20 border-4 border-background">
                                            <AvatarImage src={student.avatarUrl} alt={student.name} />
                                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="font-bold">{student.name}</div>
                                        <div className="text-sm text-muted-foreground">{student.id}</div>
                                        <div className="mt-2 flex justify-around w-full">
                                            <div>
                                                <div className="font-bold">{student.marks}</div>
                                                <div className="text-xs">Marks</div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{student.percent}%</div>
                                                <div className="text-xs">Percent</div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{student.year}</div>
                                                <div className="text-xs">Year</div>
                                            </div>
                                        </div>
                                    </CardContent>
                               </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2" />
                    </Carousel>
            </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Activity feed will be shown here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
