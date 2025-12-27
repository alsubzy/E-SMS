
import { StaffService } from '@/lib/services/staff';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus } from 'lucide-react';

export default async function StaffPage({ searchParams }: { searchParams: { page?: string, q?: string } }) {
    const page = Number(searchParams.page) || 1;
    const search = searchParams.q || "";
    const { data: staff } = await StaffService.getAll(page, 10, search);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Staff</Button>
            </div>

            <Card>
                <CardHeader><CardTitle>Staff List</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Designation</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Joining Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {staff.length === 0 ? <TableRow><TableCell colSpan={4}>No staff found.</TableCell></TableRow> :
                                staff.map(s => (
                                    <TableRow key={s.id}>
                                        <TableCell>{s.user.name}</TableCell>
                                        <TableCell>{s.designation}</TableCell>
                                        <TableCell>{s.department || '-'}</TableCell>
                                        <TableCell>{new Date(s.dateOfJoining).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
