'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-6">
      <h1 className="text-2xl font-bold">Product overview</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <PackageIcon className="h-12 w-12 text-gray-500" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Earning</p>
                <p className="text-4xl font-bold">$128k</p>
                <p className="text-sm text-green-500">↑ 36.8% vs last year</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Product activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Activity feed will be shown here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PackageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.5 9.4a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
      <path d="M22 13.8a8.5 8.5 0 0 1-15 0" />
      <path d="M22 13.8V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V13.8" />
      <path d="M15 13.8a3 3 0 0 1-6 0" />
    </svg>
  );
}
