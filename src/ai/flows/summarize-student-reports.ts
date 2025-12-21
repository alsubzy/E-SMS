'use server';

/**
 * @fileOverview An AI agent for summarizing student performance and attendance reports.
 *
 * - summarizeStudentReports - A function that handles the summarization process.
 * - SummarizeStudentReportsInput - The input type for the summarizeStudentReports function.
 * - SummarizeStudentReportsOutput - The return type for the summarizeStudentReports function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeStudentReportsInputSchema = z.object({
  reportType: z
    .string()
    .describe("The type of report to summarize (e.g., 'performance', 'attendance')."),
  reportData: z
    .string()
    .describe('The raw data of the student report in a string format.'),
});
export type SummarizeStudentReportsInput = z.infer<typeof SummarizeStudentReportsInputSchema>;

const SummarizeStudentReportsOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the student performance or attendance report.'),
});
export type SummarizeStudentReportsOutput = z.infer<typeof SummarizeStudentReportsOutputSchema>;

export async function summarizeStudentReports(
  input: SummarizeStudentReportsInput
): Promise<SummarizeStudentReportsOutput> {
  return summarizeStudentReportsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeStudentReportsPrompt',
  input: {schema: SummarizeStudentReportsInputSchema},
  output: {schema: SummarizeStudentReportsOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing student reports for school administrators.

  Your goal is to provide a concise and informative summary of the provided report data, highlighting key trends and areas needing attention.

  Report Type: {{{reportType}}}
  Report Data: {{{reportData}}}

  Summary:`, // Ensure the output is clearly labeled as a summary.
});

const summarizeStudentReportsFlow = ai.defineFlow(
  {
    name: 'summarizeStudentReportsFlow',
    inputSchema: SummarizeStudentReportsInputSchema,
    outputSchema: SummarizeStudentReportsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
