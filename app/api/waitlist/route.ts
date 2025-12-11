import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function sendWaitlistEmail(
  email: string,
  timestamp: string,
  usageType?: 'private' | 'business'
): Promise<void> {
  const usageTypeText = usageType
    ? usageType === 'private'
      ? 'Private Use'
      : 'Business Use'
    : 'Not specified';

  const emailBody = `
New Waitlist Signup - GuardianOne

Email: ${email}
Timestamp: ${timestamp}
Usage Type: ${usageTypeText}

---
This is an automated notification from the GuardianOne waitlist.
  `.trim();

  try {
    await resend.emails.send({
      from: 'GuardianOne <onboarding@resend.dev>',
      to: 'contact@guardianone.dev',
      subject: 'New Waitlist Signup - GuardianOne',
      text: emailBody,
    });
  } catch (error) {
    console.error('Failed to send waitlist email:', error);
    throw error;
  }
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

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const timestamp = new Date().toISOString();

    try {
      await sendWaitlistEmail(trimmedEmail, timestamp);
    } catch (error) {
      console.error('Failed to send waitlist email:', error);
      return NextResponse.json(
        { error: 'Failed to send notification email' },
        { status: 500 }
      );
    }

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

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const timestamp = new Date().toISOString();

    try {
      await sendWaitlistEmail(trimmedEmail, timestamp, usageType);
    } catch (error) {
      console.error('Failed to send waitlist update email:', error);
      return NextResponse.json(
        { error: 'Failed to send notification email' },
        { status: 500 }
      );
    }

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
