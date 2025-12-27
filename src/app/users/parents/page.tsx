
import { ParentService } from '@/lib/services/parent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus } from 'lucide-react';

export default async function ParentsPage({ searchParams }: { searchParams: { page?: string, q?: string } }) {
    const page = Number(searchParams.page) || 1;
    const search = searchParams.q || "";
    const { data: parents } = await ParentService.getAll(page, 10, search);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Parent Management</h1>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Parent</Button>
            </div>

            <Card>
                <CardHeader><CardTitle>Parents List</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Children</TableHead>
                                <TableHead>Occupation</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {parents.length === 0 ? <TableRow><TableCell colSpan={4}>No parents found.</TableCell></TableRow> :
                                parents.map(p => (
                                    <TableRow key={p.id}>
                                        <TableCell>{p.user.name}</TableCell>
                                        <TableCell>{p.phone}</TableCell>
                                        <TableCell>{p.students.length > 0 ? p.students.map(s => s.student.user.name).join(', ') : 'None'}</TableCell>
                                        <TableCell>{p.occupation || '-'}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
