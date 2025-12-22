
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AcademicService } from '@/lib/services/academic';
import { TimetableService } from '@/lib/services/timetable';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select'; // Need to impl client side select or use native
import { PlusCircle } from 'lucide-react';

// For simplicity in server component, we show timetable for a query param classId or empty
export default async function TimetablePage({ searchParams }: { searchParams: { classId?: string } }) {
    const academicYears = await AcademicService.getAcademicYears();
    const currentYear = academicYears.find(y => y.isCurrent) || academicYears[0];
    const classes = currentYear ? await AcademicService.getClasses(currentYear.id) : [];

    const classId = searchParams.classId || (classes.length > 0 ? classes[0].id : null);
    const lessons = classId ? await TimetableService.getTimetableForClass(classId) : [];

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Time Table Management</h1>
                {classId && <Button> <PlusCircle className="mr-2 h-4 w-4" /> Add Lesson </Button>}
            </div>

            <div className="flex gap-4 items-center">
                <span className="font-medium">Select Class:</span>
                <div className="flex gap-2">
                    {classes.map(c => (
                        <Button key={c.id} variant={classId === c.id ? 'default' : 'outline'} asChild>
                            <a href={`/timetable?classId=${c.id}`}>{c.name}</a>
                        </Button>
                    ))}
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Schedule for {classes.find(c => c.id === classId)?.name || '...'}</CardTitle>
                </CardHeader>
                <CardContent>
                    {lessons.length === 0 ? <p className="text-muted-foreground">No lessons scheduled.</p> : (
                        <div className="grid gap-4">
                            {/* Group by Day? */}
                            {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map(day => {
                                const dayLessons = lessons.filter(l => l.day === day);
                                if (dayLessons.length === 0) return null;
                                return (
                                    <div key={day} className="border p-4 rounded bg-slate-50 dark:bg-slate-900">
                                        <h3 className="font-bold mb-2">{day}</h3>
                                        <div className="space-y-2">
                                            {dayLessons.map(l => (
                                                <div key={l.id} className="flex justify-between items-center bg-white dark:bg-black p-2 rounded shadow-sm">
                                                    <div>
                                                        <div className="font-semibold">{l.startTime} - {l.endTime}</div>
                                                        <div className="text-sm">{l.subject.name} ({l.name})</div>
                                                    </div>
                                                    <div className="text-right text-sm text-muted-foreground">
                                                        <div>{l.teacher?.user.name}</div>
                                                        <div>{l.roomId}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
