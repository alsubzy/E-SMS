
import { prisma } from "@/lib/prisma";
import { Prisma, Gender } from "@prisma/client";

export const TeacherService = {
    async getAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const [data, total] = await prisma.$transaction([
            prisma.teacher.findMany({
                skip,
                take: limit,
                include: {
                    user: { select: { name: true, email: true, imageUrl: true } },
                    classSubjects: { include: { subject: true, class: true } }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.teacher.count()
        ]);

        return { data, total, page, limit };
    },

    async getById(id: string) {
        return prisma.teacher.findUnique({
            where: { id },
            include: {
                user: true,
                classSubjects: { include: { subject: true, class: true } },
                classTaught: { include: { class: true } }
            }
        });
    },

    async createProfile(data: {
        userId: string;
        dateOfBirth: Date;
        gender: Gender;
        phone?: string;
        address?: string;
        dateOfJoining: Date;
        qualifications?: string;
    }) {
        return prisma.teacher.create({
            data: {
                userId: data.userId,
                dateOfBirth: data.dateOfBirth,
                gender: data.gender,
                phone: data.phone,
                address: data.address,
                dateOfJoining: data.dateOfJoining,
                qualifications: data.qualifications
            }
        });
    },

    async assignClassTeacher(teacherId: string, sectionId: string) {
        // Unassign if already assigned to another section (rule: 1 class teacher per section)
        // Actually, one teacher can be class teacher of multiple sections? Usually not.
        // Schema says Section.classTeacherId is unique inside Section, but Teacher.classTaught is Section? (one-to-one or one-to-many?)
        // In schema: `classTaught Section? @relation("ClassTeacher")` -> One-to-One. One teacher can be class teacher of ONLY ONE section.

        return prisma.section.update({
            where: { id: sectionId },
            data: { classTeacherId: teacherId }
        });
    },

    async getSchedule(teacherId: string) {
        return prisma.lesson.findMany({
            where: { teacherId },
            include: { class: true, section: true, subject: true },
            orderBy: { startTime: 'asc' }
        });
    }
};
