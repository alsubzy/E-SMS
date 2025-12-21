'use client';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import { placeholderLessons } from '@/lib/data';

export default function LessonTable() {
  return (
    <Card className="rounded-3xl shadow-lg border-none">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-2xl font-bold">Your Lesson</CardTitle>
        <Button variant="link" className="text-primary">See All</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-none">
              <TableHead className="text-muted-foreground">MENTOR</TableHead>
              <TableHead className="text-muted-foreground">TYPE</TableHead>
              <TableHead className="text-muted-foreground">DESC</TableHead>
              <TableHead className="text-muted-foreground text-right">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {placeholderLessons.map((lesson) => (
              <TableRow key={lesson.id} className="border-none">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={lesson.mentor.avatarUrl} alt={lesson.mentor.name} data-ai-hint="person face" />
                      <AvatarFallback>{lesson.mentor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{lesson.mentor.name}</p>
                      <p className="text-xs text-muted-foreground">{lesson.date}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                   <Badge variant="secondary" className={lesson.badgeColor}>
                      {lesson.type}
                    </Badge>
                </TableCell>
                <TableCell className="font-semibold">{lesson.description}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="rounded-full bg-secondary hover:bg-primary/10">
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
