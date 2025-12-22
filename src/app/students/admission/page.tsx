
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AcademicService } from '@/lib/services/academic';
import { admitStudentAction } from '@/lib/actions/student-actions';

export default async function AdmissionPage() {
    const academicYears = await AcademicService.getAcademicYears();
    const currentYear = academicYears.find(y => y.isCurrent) || academicYears[0];
    const classes = currentYear ? await AcademicService.getClasses(currentYear.id) : [];

    return (
        <div className="p-6">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>New Student Admission</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={admitStudentAction} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" name="firstName" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" name="lastName" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Input id="gender" name="gender" placeholder="MALE / FEMALE" required />
                                {/* Simplified for now, should be Select */}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="classId">Class</Label>
                                <select name="classId" className="w-full border rounded p-2" required>
                                    <option value="">Select Class</option>
                                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sectionId">Section</Label>
                                <select name="sectionId" className="w-full border rounded p-2" required>
                                    <option value="">Select Section</option>
                                    {/* This needs client-side state to filter sections based on class, 
                             or just list all if not many, or use a client component wrapper.
                             For simplicity: User enters section ID? No, that's bad UX.
                             I will list ALL sections grouped by class or requires Client Component.
                             I'll assume simpler validaton for now or let user pick from flat list?
                             Actually sections are nested in Classes.
                             I'll just put a text input for now or use a server-fetched flat list of sections 
                             if I flatten them. 
                             Better: Use a Client Component for the form.
                         */}
                                    {classes.flatMap(c => c.sections).map(s => (
                                        <option key={s.id} value={s.id}>{s.name} (in {classes.find(c => c.id === s.classId)?.name})</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="admissionDate">Admission Date</Label>
                            <Input id="admissionDate" name="admissionDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
                        </div>

                        <Button type="submit" className="w-full">Admit Student</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
