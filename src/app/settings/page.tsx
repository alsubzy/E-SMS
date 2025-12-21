
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>
          Manage school profile, academic year, and system preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>System settings will be displayed here.</p>
      </CardContent>
    </Card>
  );
}

    