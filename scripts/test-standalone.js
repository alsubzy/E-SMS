require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

async function main() {
    console.log('Starting standalone connection test...');
    console.log('DATABASE_URL present:', !!process.env.DATABASE_URL);

    if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL missing');
        process.exit(1);
    }

    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
        log: ['query']
    });

    try {
        await prisma.$connect();
        console.log('Connected to database!');

        // Test raw connection to verify connectivity even if DB is empty
        const result = await prisma.$queryRaw`SELECT 1 as result`;
        console.log('Raw query successful:', result);

        try {
            const users = await prisma.user.count();
            console.log(`User count: ${users}`);
        } catch (e) {
            console.log('Could not query User table (expected if DB is empty).');
        }

    } catch (err) {
        console.error('Connection failed:', err);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
