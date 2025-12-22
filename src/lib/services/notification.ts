
import { prisma } from "@/lib/prisma";

export const NotificationService = {
    async send(userId: string, title: string, message: string, type?: string, link?: string) {
        return prisma.notification.create({
            data: { userId, title, message, type, link }
        });
    },

    async getUserNotifications(userId: string) {
        return prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
    },

    async markAsRead(id: string) {
        return prisma.notification.update({ where: { id }, data: { isRead: true } });
    }
};
