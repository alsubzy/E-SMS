
import { prisma } from "@/lib/prisma";
import { Prisma, StudentStatus, Gender } from "@prisma/client";

export const StudentService = {
    async getAll(page = 1, limit = 10, classId?: string, sectionId?: string) {
        const skip = (page - 1) * limit;
        const where: Prisma.StudentWhereInput = {
            ...(classId && { currentClassId: classId }),
            ...(sectionId && { currentSectionId: sectionId }),
        };

        const [data, total] = await prisma.$transaction([
            prisma.student.findMany({
                where,
                skip,
                take: limit,
                include: {
                    user: { select: { name: true, email: true, imageUrl: true } },
                    currentSection: { include: { class: true } },
                    parents: { include: { parent: { include: { user: true } } }, take: 1 }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.student.count({ where })
        ]);

        return { data, total, page, limit };
    },

    async getById(id: string) {
        return prisma.student.findUnique({
            where: { id },
            include: {
                user: true,
                currentSection: { include: { class: true } },
                parents: { include: { parent: { include: { user: true } } } }
            }
        });
    },

    async admitStudent(data: {
        userId: string;
        admissionId: string;
        dateOfBirth: Date;
        gender: Gender;
        admissionDate: Date;
        classId: string;
        sectionId: string;
    }) {
        return prisma.student.create({
            data: {
                userId: data.userId,
                admissionId: data.admissionId,
                dateOfBirth: data.dateOfBirth,
                gender: data.gender,
                admissionDate: data.admissionDate,
                currentClassId: data.classId,
                currentSectionId: data.sectionId,
                status: StudentStatus.ACTIVE
            }
        });
    },

    async updateStatus(studentId: string, status: StudentStatus) {
        return prisma.student.update({
            where: { id: studentId },
            data: { status }
        });
    }
};
