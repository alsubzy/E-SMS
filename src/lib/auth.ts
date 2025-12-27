import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-access-token-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-token-secret';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
    return bcrypt.compare(password, hashed);
};

export const generateAccessToken = (payload: any) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (payload: any) => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (error) {
        return null;
    }
};
