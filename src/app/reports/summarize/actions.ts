'use server';

import { summarizeStudentReports } from '@/ai/flows/summarize-student-reports';
import { z } from 'zod';

const SummarizeSchema = z.object({
  reportType: z.enum(['performance', 'attendance']),
  reportData: z.string().min(20, 'Report data must be at least 20 characters.'),
});

type State = {
  summary?: string;
  error?: string;
};

export async function getReportSummary(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = SummarizeSchema.safeParse({
    reportType: formData.get('reportType'),
    reportData: formData.get('reportData'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.reportData?.join(', '),
    };
  }

  try {
    const result = await summarizeStudentReports(validatedFields.data);
    return { summary: result.summary };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to generate summary. Please try again.' };
  }
}
