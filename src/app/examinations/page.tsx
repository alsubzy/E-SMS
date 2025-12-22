
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AcademicService } from '@/lib/services/academic';
import { ExamService } from '@/lib/services/exam';

export default async function ExaminationsPage() {
  const academicYears = await AcademicService.getAcademicYears();
  const currentYear = academicYears.find(y => y.isCurrent) || academicYears[0];
  const exams = currentYear ? await ExamService.getAllExams(currentYear.id) : [];

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Examinations ({currentYear?.year || 'No Year'})</CardTitle>
        </CardHeader>
        <CardContent>
          {exams.length === 0 ? <p className="text-muted-foreground">No exams created yet.</p> : (
            <ul className="space-y-2">
              {exams.map(e => (
                <li key={e.id} className="border p-2 rounded">{e.name}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}