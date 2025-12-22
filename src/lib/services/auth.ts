
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function getCurrentUser() {
    const { userId } = await auth();
    if (!userId) return null;

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
        select: {
            id: true,
            clerkUserId: true,
            email: true,
            name: true,
            role: true,
            status: true,
        }
    });

    return user;
}

export async function hasRole(allowedRoles: Role[]) {
    const user = await getCurrentUser();
    if (!user) return false;
    return allowedRoles.includes(user.role);
}

export async function requireRole(allowedRoles: Role[]) {
    const isAuthorized = await hasRole(allowedRoles);
    if (!isAuthorized) {
        throw new Error("Unauthorized: Insufficient permissions");
    }
}
