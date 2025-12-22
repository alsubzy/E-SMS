
import { prisma } from "@/lib/prisma";

export const ExamService = {
    async getAllExams(academicYearId: string) {
        return prisma.exam.findMany({
            where: { academicYearId },
            include: {
                _count: { select: { schedules: true } }
            }
        });
    },

    async createExam(data: { name: string; academicYearId: string }) {
        return prisma.exam.create({ data });
    },

    async getSchedules(examId: string) {
        return prisma.examSchedule.findMany({
            where: { examId },
            include: { subject: true, class: true }
        });
    },

    async recordMark(studentId: string, examScheduleId: string, marksObtained: number) {
        return prisma.mark.upsert({
            where: { studentId_examScheduleId: { studentId, examScheduleId } },
            update: { marksObtained },
            create: { studentId, examScheduleId, marksObtained }
        });
    }
};
