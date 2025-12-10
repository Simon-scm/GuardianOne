import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'waitlist.json');

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function ensureDataDirectory() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function readWaitlist(): Promise<Array<{ email: string; timestamp: string; usageType?: 'private' | 'business' }>> {
  try {
    await ensureDataDirectory();
    const fileContent = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

async function writeWaitlist(data: Array<{ email: string; timestamp: string; usageType?: 'private' | 'business' }>) {
  await ensureDataDirectory();
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!validateEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const waitlist = await readWaitlist();

    if (waitlist.some((entry) => entry.email === trimmedEmail)) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    const newEntry = {
      email: trimmedEmail,
      timestamp: new Date().toISOString(),
    };

    waitlist.push(newEntry);
    await writeWaitlist(waitlist);

    return NextResponse.json(
      { message: 'Successfully added to waitlist', email: trimmedEmail },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, usageType } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (usageType && !['private', 'business'].includes(usageType)) {
      return NextResponse.json(
        { error: 'Invalid usage type' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const waitlist = await readWaitlist();

    const entryIndex = waitlist.findIndex((entry) => entry.email === trimmedEmail);

    if (entryIndex === -1) {
      return NextResponse.json(
        { error: 'Email not found in waitlist' },
        { status: 404 }
      );
    }

    waitlist[entryIndex] = {
      ...waitlist[entryIndex],
      usageType: usageType || undefined,
    };

    await writeWaitlist(waitlist);

    return NextResponse.json(
      { message: 'Usage type updated successfully', email: trimmedEmail },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

