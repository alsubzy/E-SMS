
import { prisma } from "@/lib/prisma";
import { AttendanceStatus } from "@prisma/client";

export const AttendanceService = {
    async markStudentAttendance(studentId: string, date: Date, status: AttendanceStatus) {
        return prisma.studentAttendance.upsert({
            where: { studentId_date: { studentId, date } },
            update: { status },
            create: { studentId, date, status }
        });
    },

    async getStudentAttendance(studentId: string, startDate: Date, endDate: Date) {
        return prisma.studentAttendance.findMany({
            where: {
                studentId,
                date: { gte: startDate, lte: endDate }
            },
            orderBy: { date: 'asc' }
        });
    },

    async getClassAttendance(classId: string, date: Date) {
        // Get all students in class
        // Get their attendance for date
        // Return combined list
        const students = await prisma.student.findMany({
            where: { currentClassId: classId },
            include: { user: true }
        });

        const attendance = await prisma.studentAttendance.findMany({
            where: {
                studentId: { in: students.map(s => s.id) },
                date: date
            }
        });

        return students.map(student => ({
            student,
            attendance: attendance.find(a => a.studentId === student.id) || null
        }));
    }
};
