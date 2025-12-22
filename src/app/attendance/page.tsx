
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AcademicService } from '@/lib/services/academic';
import { Button } from '@/components/ui/button';

export default async function AttendancePage() {
  const academicYears = await AcademicService.getAcademicYears();
  const currentYear = academicYears.find(y => y.isCurrent) || academicYears[0];
  const classes = currentYear ? await AcademicService.getClasses(currentYear.id) : [];

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Select a class to take attendance:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {classes.map(c => (
              <Button key={c.id} variant="outline" className="h-20 text-lg">
                {c.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}