
import { prisma } from "@/lib/prisma";
import { Prisma, Gender } from "@prisma/client";

export const StaffService = {
    async getAll(page = 1, limit = 10, search?: string) {
        const skip = (page - 1) * limit;
        const where: Prisma.StaffWhereInput = search ? {
            OR: [
                { user: { name: { contains: search, mode: 'insensitive' } } },
                { user: { email: { contains: search, mode: 'insensitive' } } },
                { designation: { contains: search, mode: 'insensitive' } }
            ]
        } : {};

        const [data, total] = await prisma.$transaction([
            prisma.staff.findMany({
                where,
                skip,
                take: limit,
                include: { user: true },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.staff.count({ where })
        ]);

        return { data, total, page, limit };
    },

    async create(data: {
        userId: string;
        staffId: string;
        dateOfBirth: Date;
        gender: Gender;
        phone?: string;
        address?: string;
        dateOfJoining: Date;
        designation: string;
        department?: string;
    }) {
        return prisma.staff.create({ data });
    },

    async update(id: string, data: Prisma.StaffUpdateInput) {
        return prisma.staff.update({
            where: { id },
            data
        });
    },

    async delete(id: string) {
        return prisma.staff.delete({ where: { id } });
    }
};
