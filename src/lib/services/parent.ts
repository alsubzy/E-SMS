
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const ParentService = {
    async getAll(page = 1, limit = 10, search?: string) {
        const skip = (page - 1) * limit;
        const where: Prisma.ParentWhereInput = search ? {
            OR: [
                { user: { name: { contains: search, mode: 'insensitive' } } },
                { phone: { contains: search, mode: 'insensitive' } }
            ]
        } : {};

        const [data, total] = await prisma.$transaction([
            prisma.parent.findMany({
                where,
                skip,
                take: limit,
                include: {
                    user: true,
                    students: { include: { student: { include: { user: true } } } }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.parent.count({ where })
        ]);

        return { data, total, page, limit };
    },

    async create(data: {
        userId: string;
        phone: string;
        address: string;
        occupation?: string;
    }) {
        return prisma.parent.create({ data });
    }
};
