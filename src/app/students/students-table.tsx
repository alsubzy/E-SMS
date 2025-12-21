'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Student } from '@/lib/types';
import { MoreVertical } from 'lucide-react';

type StudentsTableProps = {
  students: Student[];
};

export default function StudentsTable({ students }: StudentsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Class</TableHead>
            <TableHead className="hidden md:table-cell">Guardian</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
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
                  <div className="grid">
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {student.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                Class {student.class}-{student.section}
              </TableCell>
              <TableCell className="hidden md:table-cell">{student.guardianName}</TableCell>
              <TableCell>
                <Badge variant={student.status === 'Active' ? 'secondary' : 'outline'} className={student.status === 'Active' ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" : ""}>
                  {student.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
