'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useFormState, useFormStatus } from 'react-dom';
import { getReportSummary } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Terminal } from 'lucide-react';

const initialState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Generating...' : 'Generate Summary'}
      {!pending && <Sparkles className="ml-2 h-4 w-4" />}
    </Button>
  );
}

export default function SummarizeForm() {
  const [state, formAction] = useFormState(getReportSummary, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <Label htmlFor="reportType">Report Type</Label>
          <Select name="reportType" defaultValue="performance">
            <SelectTrigger id="reportType" className="mt-1">
              <SelectValue placeholder="Select a report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="attendance">Attendance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-3">
          <Label htmlFor="reportData">Report Data</Label>
          <Textarea
            id="reportData"
            name="reportData"
            placeholder="Paste the raw report data here..."
            className="mt-1 min-h-[150px]"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <SubmitButton />
      </div>

      {state.error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      
      {state.summary && (
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              Generated Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{state.summary}</p>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
