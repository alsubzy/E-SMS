
import { prisma } from "@/lib/prisma";
import { Role, AccountStatus, Prisma } from "@prisma/client";

export const UserService = {

    async getAll(page = 1, limit = 10, role?: Role, search?: string) {
        const skip = (page - 1) * limit;
        const where: Prisma.UserWhereInput = {
            AND: [
                role ? { role } : {},
                search ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { email: { contains: search, mode: 'insensitive' } }
                    ]
                } : {}
            ]
        };

        const [data, total] = await prisma.$transaction([
            prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.user.count({ where })
        ]);

        return { data, total, page, limit };
    },

    async getById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    },

    async updateRole(userId: string, role: Role) {
        return prisma.user.update({
            where: { id: userId },
            data: { role }
        });
    },

    async updateStatus(userId: string, status: AccountStatus) {
        return prisma.user.update({
            where: { id: userId },
            data: { status }
        });
    }
};
