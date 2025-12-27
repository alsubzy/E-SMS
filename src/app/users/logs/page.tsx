
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuditLogService } from '@/lib/services/audit-log';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default async function ActivityLogsPage() {
    const { data: logs } = await AuditLogService.getLogs();

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">User Activity Logs</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Details</TableHead>
                                <TableHead>Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.map(log => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-medium">{log.user?.name || log.userId}</TableCell>
                                    <TableCell>{log.action}</TableCell>
                                    <TableCell className="text-xs font-mono max-w-xs truncate">
                                        {JSON.stringify(log.details)}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
