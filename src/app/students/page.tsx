import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { students } from '@/lib/data';
import { FilePlus2 } from 'lucide-react';
import StudentsTable from './students-table';

export default function StudentsPage() {
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
          <Button>
            <FilePlus2 className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <StudentsTable students={students} />
      </CardContent>
    </Card>
  );
}
