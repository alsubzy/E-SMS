import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

async function main() {
    console.log('Connecting to database...');
    try {
        await prisma.$connect();
        console.log('Successfully connected to database.');

        const userCount = await prisma.user.count();
        console.log(`Connection verified. Found ${userCount} users.`);

        // Optional: fetch one user to ensure read works
        const user = await prisma.user.findFirst();
        if (user) {
            console.log('First user:', user.email);
        }

    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
