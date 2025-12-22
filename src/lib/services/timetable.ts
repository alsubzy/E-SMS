
import { prisma } from "@/lib/prisma";
import { Prisma, DayOfWeek } from "@prisma/client";

export const TimetableService = {
    async getTimetableForClass(classId: string) {
        return prisma.lesson.findMany({
            where: { classId },
            include: {
                subject: true,
                teacher: { include: { user: true } },
                section: true,
            },
            orderBy: [
                { day: 'asc' }, // Order by Enum might rely on DB order, or we sort in JS
                { startTime: 'asc' }
            ]
        });
    },

    async createLesson(data: {
        name: string;
        day: DayOfWeek;
        startTime: string;
        endTime: string;
        classId: string;
        sectionId?: string;
        subjectId: string;
        teacherId?: string;
        roomId?: string;
    }) {
        // Check for conflicts?
        // Simplified for now: just create
        return prisma.lesson.create({ data });
    },

    async deleteLesson(id: string) {
        return prisma.lesson.delete({ where: { id } });
    }
};
