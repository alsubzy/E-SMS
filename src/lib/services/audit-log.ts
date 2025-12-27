
import { prisma } from "@/lib/prisma";

export const AuditLogService = {
    async log(userId: string, action: string, details?: any) {
        return prisma.auditLog.create({
            data: {
                userId,
                action,
                details: details ? JSON.parse(JSON.stringify(details)) : undefined, // Ensure it's JSON compatible
            }
        });
    },

    async getLogs(page = 1, limit = 20, userId?: string) {
        const skip = (page - 1) * limit;
        const where = userId ? { userId } : {};

        const [data, total] = await prisma.$transaction([
            prisma.auditLog.findMany({
                where,
                skip,
                take: limit,
                orderBy: { timestamp: 'desc' },
                include: { user: { select: { name: true, email: true, role: true, imageUrl: true } } }
            }),
            prisma.auditLog.count({ where })
        ]);

        return { data, total, page, limit };
    }
};
