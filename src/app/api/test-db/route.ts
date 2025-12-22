import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // This query doesn't require any data to be in the database.
    // It just tests if Prisma can connect and query the User table.
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      message: 'Database connection successful!',
      userCount: userCount,
    }, { status: 200 });

  } catch (error) {
    console.error('Database connection test failed:', error);
    // Check if error is an instance of Error to safely access message property
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return NextResponse.json({
      message: 'Database connection failed.',
      error: errorMessage,
    }, { status: 500 });
  }
}
