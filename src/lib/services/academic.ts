
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const AcademicService = {
    // --- Academic Year ---
    async getAcademicYears() {
        return prisma.academicYear.findMany({ orderBy: { startDate: 'desc' } });
    },

    async createAcademicYear(data: Prisma.AcademicYearCreateInput) {
        // If setting as current, unset others
        if (data.isCurrent) {
            await prisma.academicYear.updateMany({
                where: { schoolId: data.school.connect?.id, isCurrent: true },
                data: { isCurrent: false }
            });
        }
        return prisma.academicYear.create({ data });
    },

    // --- Classes & Sections ---
    async getClasses(academicYearId: string) {
        return prisma.class.findMany({
            where: { academicYearId },
            include: {
                sections: { include: { _count: { select: { students: true } } } },
                _count: { select: { subjects: true } }
            }
        });
    },

    async createClass(data: Prisma.ClassCreateInput) {
        return prisma.class.create({ data });
    },

    async createSection(data: Prisma.SectionCreateInput) {
        return prisma.section.create({ data });
    },

    // --- Subjects ---
    async getSubjects() {
        return prisma.subject.findMany();
    },

    async assignSubjectToClass(classId: string, subjectId: string, teacherId: string) {
        return prisma.classSubject.create({
            data: {
                classId,
                subjectId,
                teacherId
            }
        });
    }
};
