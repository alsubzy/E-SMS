import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateAccessToken, generateRefreshToken } from '@/lib/auth';
import { serialize } from 'cookie';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const payload = { userId: user.id, email: user.email, role: user.role };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // Save refresh token in database
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        });

        const response = NextResponse.json({
            message: 'Login successful',
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
            accessToken
        });

        // Set Refresh Token in HTTP-only cookie
        response.headers.append('Set-Cookie', serialize('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/'
        }));

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
