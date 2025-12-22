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


import type { Student, User, Section, Class, ParentStudent, Parent } from '@prisma/client';
import { MoreVertical } from 'lucide-react';

type StudentWithRelations = Student & {
  user: { name: string | null; email: string; imageUrl: string | null };
  currentSection: (Section & { class: Class }) | null;
  parents: (ParentStudent & { parent: Parent & { user: User } })[];
};

type StudentsTableProps = {
  students: StudentWithRelations[];
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
                      src={student.user.imageUrl || ''}
                      alt={student.user.name || 'Student'}
                    />
                    <AvatarFallback>
                      {(student.user.name || 'ST')
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid">
                    <div className="font-medium">{student.user.name || 'Unknown'}</div>
                    <div className="text-sm text-muted-foreground">
                      {student.user.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {student.currentSection ?
                  `${student.currentSection.class.name} - ${student.currentSection.name}` :
                  'Unassigned'}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {student.parents?.[0]?.parent.user.name || 'N/A'}
              </TableCell>
              <TableCell>
                <Badge variant={student.status === 'ACTIVE' ? 'secondary' : 'outline'}>
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
