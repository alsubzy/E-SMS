
'use server';

import { StudentService } from "@/lib/services/student";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Gender } from "@prisma/client";

const admissionSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    dateOfBirth: z.string().transform((str) => new Date(str)),
    gender: z.nativeEnum(Gender),
    classId: z.string().min(1),
    sectionId: z.string().min(1),
    admissionDate: z.string().transform((str) => new Date(str)),
});

export async function admitStudentAction(prevState: any, formData: FormData) {
    const rawData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        dateOfBirth: formData.get('dateOfBirth'),
        gender: formData.get('gender'),
        classId: formData.get('classId'),
        sectionId: formData.get('sectionId'),
        admissionDate: formData.get('admissionDate'),
    };

    const schema = admissionSchema.safeParse(rawData);

    if (!schema.success) {
        return { error: schema.error.flatten().fieldErrors };
    }

    try {
        const { firstName, lastName, email, dateOfBirth, gender, classId, sectionId, admissionDate } = schema.data;

        // 1. Create User (Mocking Clerk ID for now or assuming it's synced later? 
        //    Ideally we create Clerk user here via Clerk API, but that requires Secret Key which we have.
        //    For now, let's create a placeholder User in DB. 
        //    Actually, User table requires clerkUserId. We can generate a fake one if not using real Clerk auth flow for *creating* users yet.
        //    But usually Admission = Create User.
        //    Let's assume we generate a placeholder clerkUserId.)

        // Check if user exists
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    clerkUserId: `sys_generated_${Date.now()}`,
                    email,
                    name: `${firstName} ${lastName}`,
                    role: 'STUDENT',
                    status: 'ACTIVE'
                }
            });
        }

        // 2. Admit Student
        await StudentService.admitStudent({
            userId: user.id,
            admissionId: `ADM-${Date.now()}`, // Generate ID
            dateOfBirth,
            gender,
            admissionDate,
            classId,
            sectionId
        });

        revalidatePath('/students');
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Failed to admit student" };
    }
}
