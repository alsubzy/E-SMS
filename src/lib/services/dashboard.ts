
import { prisma } from "@/lib/prisma";

export const DashboardService = {
    async getStats() {
        const [
            studentsCount,
            teachersCount,
            classesCount,  // Representing "Courses" or "Form Classes"
            parentsCount
        ] = await prisma.$transaction([
            prisma.student.count({ where: { status: 'ACTIVE' } }),
            prisma.teacher.count(),
            prisma.class.count(),
            prisma.parent.count()
        ]);

        return {
            students: studentsCount,
            teachers: teachersCount,
            classes: classesCount,
            parents: parentsCount
        };
    },

    async getRecentStudents(limit = 5) {
        return prisma.student.findMany({
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { name: true, imageUrl: true } } }
        });
    }
};
