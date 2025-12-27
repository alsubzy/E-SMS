import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyRefreshToken, generateAccessToken } from '@/lib/auth';
import { parse } from 'cookie';

export async function POST(req: Request) {
    try {
        const cookieHeader = req.headers.get('cookie') || '';
        const cookies = parse(cookieHeader);
        const refreshToken = cookies.refreshToken;

        if (!refreshToken) {
            return NextResponse.json({ error: 'Refresh token required' }, { status: 401 });
        }

        const decoded: any = verifyRefreshToken(refreshToken);
        if (!decoded) {
            return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user || user.refreshToken !== refreshToken) {
            return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
        }

        const payload = { userId: user.id, email: user.email, role: user.role };
        const accessToken = generateAccessToken(payload);

        return NextResponse.json({
            accessToken,
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });

    } catch (error) {
        console.error('Refresh token error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
