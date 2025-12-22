
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentService } from '@/lib/services/student';
import { FilePlus2 } from 'lucide-react';
import StudentsTable from './students-table';

export default async function StudentsPage() {
  const result = await StudentService.getAll();
  const students = result.data as any; // Cast to avoid complex type matching issues for now, or define strict type

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Student Management</CardTitle>
            <CardDescription>
              View, add, and manage student profiles.
            </CardDescription>
          </div>

          <Button asChild>
            <a href="/students/admission">
              <FilePlus2 className="mr-2 h-4 w-4" />
              Add Student
            </a>
          </Button>

        </div>
      </CardHeader>
      <CardContent>
        <StudentsTable students={students} />
      </CardContent>
    </Card>
  );
}

