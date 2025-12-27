import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parse, serialize } from 'cookie';
import { verifyRefreshToken } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const cookieHeader = req.headers.get('cookie') || '';
        const cookies = parse(cookieHeader);
        const refreshToken = cookies.refreshToken;

        if (refreshToken) {
            const decoded: any = verifyRefreshToken(refreshToken);
            if (decoded) {
                // Clear refresh token in DB
                await prisma.user.update({
                    where: { id: decoded.userId },
                    data: { refreshToken: null }
                });
            }
        }

        const response = NextResponse.json({ message: 'Logged out successfully' });

        // Clear the cookie
        response.headers.append('Set-Cookie', serialize('refreshToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        }));

        return response;

    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
