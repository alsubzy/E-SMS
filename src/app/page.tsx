'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  return (
    <div className="p-4 md:p-6">
       <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Welcome to your dashboard. Select an item from the sidebar to get started.</p>
          </CardContent>
        </Card>
    </div>
  );
}
