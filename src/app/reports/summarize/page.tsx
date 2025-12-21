
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SummarizeForm from './summarize-form';
import { BarChart3, Sparkles } from 'lucide-react';

export default function SummarizeReportPage() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI-Powered Report Summarization
        </CardTitle>
        <CardDescription>
          Generate concise summaries of student performance or attendance
          reports using AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SummarizeForm />
      </CardContent>
    </Card>
  );
}
