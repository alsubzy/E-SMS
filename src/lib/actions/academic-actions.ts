
'use server';

import { AcademicService } from "@/lib/services/academic";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createClassSchema = z.object({
    name: z.string().min(1, "Name is required"),
    academicYearId: z.string().min(1, "Academic Year is required"),
});

const createSubjectSchema = z.object({
    name: z.string().min(1, "Name is required"),
    code: z.string().optional(),
});

export async function createClassAction(prevState: any, formData: FormData) {
    const schema = createClassSchema.safeParse({
        name: formData.get('name'),
        academicYearId: formData.get('academicYearId'),
    });

    if (!schema.success) {
        return { error: schema.error.flatten().fieldErrors };
    }

    try {
        await AcademicService.createClass({
            name: schema.data.name,
            academicYear: { connect: { id: schema.data.academicYearId } }
        });
        revalidatePath('/academics');
        return { success: true };
    } catch (error) {
        return { error: "Failed to create class" };
    }
}

export async function createSubjectAction(prevState: any, formData: FormData) {
    // Schema validation setup ... 
    // For brevity in this turn, assuming simplified logic or similar structure
    // But let's actually write it properly
    const name = formData.get('name') as string;
    const code = formData.get('code') as string;

    if (!name) return { error: "Name is required" };

    try {
        // Direct prisma call or service call. Service call is better.
        // Wait, AcademicService.createSubject wasn't explicitly defined in previous step, 
        // but I can add it or use prisma directly here if service is missing it.
        // I'll check AcademicService definition again. Step 70 only had createClass, createSection.
        // I missed createSubject in Service. I'll inject it here via prisma directly or add to service.
        // I'll use prisma directly for now involving service pattern.
        const { prisma } = await import("@/lib/prisma"); // Dynamic import to avoid circular if any
        await prisma.subject.create({
            data: { name, code }
        });
        revalidatePath('/academics');
        return { success: true };
    } catch (error) {
        return { error: "Failed to create subject" };
    }
}
