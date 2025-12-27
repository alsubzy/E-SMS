import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "your-access-token-secret"
);

const isProtectedRoute = (path: string) => {
    const protectedPrefixes = [
        "/dashboard",
        "/students",
        "/teachers",
        "/academics",
        "/users",
        "/attendance",
        "/finance",
        "/settings",
    ];
    return protectedPrefixes.some((prefix) => path.startsWith(prefix));
};

const isPublicRoute = (path: string) => {
    const publicRoutes = ["/api/auth/login", "/api/auth/register", "/api/auth/refresh"];
    return publicRoutes.includes(path);
};

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    if (isPublicRoute(path)) {
        return NextResponse.next();
    }

    if (isProtectedRoute(path) || path.startsWith("/api/")) {
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

        if (!token) {
            if (path.startsWith("/api/")) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            return NextResponse.redirect(new URL("/login", req.url));
        }

        try {
            const { payload } = await jwtVerify(token, JWT_SECRET);

            // RBAC Example: Only ADMIN can access /users
            if (path.startsWith("/users") && payload.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }

            return NextResponse.next();
        } catch (error) {
            console.error("Middleware Auth Error:", error);
            if (path.startsWith("/api/")) {
                return NextResponse.json({ error: "Invalid token" }, { status: 401 });
            }
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
