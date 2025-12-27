
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Role } from '@prisma/client';

export default function RolesPage() {
    const roles = Object.values(Role);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
                <Button disabled>Add Custom Role (Pro)</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {roles.map((role) => (
                    <Card key={role}>
                        <CardHeader>
                            <CardTitle>{role}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Standard system role. Permissions are predefined.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {/* Mock permissions */}
                                <div className="px-2 py-1 bg-slate-100 rounded text-xs">Read</div>
                                <div className="px-2 py-1 bg-slate-100 rounded text-xs">Write</div>
                                {role === 'ADMIN' && <div className="px-2 py-1 bg-slate-100 rounded text-xs">Delete</div>}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
