
import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";

export const FinanceService = {
    async createInvoice(data: { studentId: string; amount: number; dueDate: Date; items: any }) {
        return prisma.invoice.create({
            data: {
                studentId: data.studentId,
                amount: data.amount,
                dueDate: data.dueDate,
                items: data.items,
                status: PaymentStatus.UNPAID
            }
        });
    },

    async recordPayment(invoiceId: string, amount: number, method: string) {
        // Record payment
        const payment = await prisma.payment.create({
            data: {
                invoiceId,
                amount,
                paymentDate: new Date(),
                method
            }
        });

        // Update invoice status
        const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId }, include: { payments: true } });
        if (invoice) {
            const totalPaid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
            let status = PaymentStatus.UNPAID;
            if (totalPaid >= invoice.amount) status = PaymentStatus.PAID;
            else if (totalPaid > 0) status = PaymentStatus.PARTIAL;

            await prisma.invoice.update({ where: { id: invoiceId }, data: { status } });
        }

        return payment;
    },

    async getInvoices(studentId?: string) {
        return prisma.invoice.findMany({
            where: studentId ? { studentId } : {},
            include: { student: { include: { user: true } } },
            orderBy: { createdAt: 'desc' }
        });
    }
};
