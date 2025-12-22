
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AcademicService } from '@/lib/services/academic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';

export default async function AcademicsPage() {
  const academicYears = await AcademicService.getAcademicYears();
  // We need a current academic year to list classes. Default to first or specific.
  const currentYear = academicYears.find(y => y.isCurrent) || academicYears[0];

  const classes = currentYear ? await AcademicService.getClasses(currentYear.id) : [];
  const subjects = await AcademicService.getSubjects();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Academics</h1>
        <div className="flex gap-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> New Academic Year
          </Button>
        </div>
      </div>

      <Tabs defaultValue="classes" className="w-full">
        <TabsList>
          <TabsTrigger value="classes">Classes & Sections</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="years">Academic Years</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Classes ({currentYear?.year || 'No Year Selected'})</CardTitle>
              <Button size="sm" variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Class</Button>
            </CardHeader>
            <CardContent>
              {classes.length === 0 ? (
                <p className="text-muted-foreground">No classes found for this year.</p>
              ) : (
                <div className="grid gap-4">
                  {classes.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between border p-4 rounded-lg">
                      <div>
                        <h3 className="font-semibold">{cls.name}</h3>
                        <p className="text-sm text-muted-foreground">{cls.sections.length} Sections</p>
                      </div>
                      <Button size="sm" variant="secondary">Manage Sections</Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Subjects</CardTitle>
              <Button size="sm" variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Subject</Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map(sub => (
                  <div key={sub.id} className="border p-4 rounded-lg flex justify-between items-center">
                    <span>{sub.name} <span className="text-xs text-muted-foreground">({sub.code})</span></span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}