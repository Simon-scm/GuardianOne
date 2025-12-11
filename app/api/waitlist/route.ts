import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// #region agent log
fetch('http://127.0.0.1:7242/ingest/833f6522-72bb-4902-b25e-28ead1cb1d86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:4',message:'Route module loaded - NEW VERSION',data:{hasResend:typeof Resend!=='undefined',hasApiKey:!!process.env.RESEND_API_KEY,version:'email-only-no-fs'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C'})}).catch(()=>{});
// #endregion

// Explicit check: No file system operations should exist in this file
// This is the email-only version without any fs/path imports

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
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/833f6522-72bb-4902-b25e-28ead1cb1d86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:11',message:'sendWaitlistEmail entry',data:{email,timestamp,usageType,hasResend:!!resend},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C'})}).catch(()=>{});
  // #endregion
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

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/833f6522-72bb-4902-b25e-28ead1cb1d86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:33',message:'Before resend.emails.send',data:{hasResend:!!resend,emailBodyLength:emailBody.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C'})}).catch(()=>{});
  // #endregion
  try {
    await resend.emails.send({
      from: 'GuardianOne <noreply@guardianone.dev>',
      to: 'contact@guardianone.dev',
      subject: 'New Waitlist Signup - GuardianOne',
      text: emailBody,
    });
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/833f6522-72bb-4902-b25e-28ead1cb1d86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:40',message:'resend.emails.send succeeded',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C'})}).catch(()=>{});
    // #endregion
  } catch (error) {
    console.error('Failed to send waitlist email:', error);
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/833f6522-72bb-4902-b25e-28ead1cb1d86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:42',message:'resend.emails.send failed',data:{errorMessage:error instanceof Error?error.message:String(error),errorName:error instanceof Error?error.name:'Unknown'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C,E'})}).catch(()=>{});
    // #endregion
    throw error;
  }
}

export async function POST(request: NextRequest) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/833f6522-72bb-4902-b25e-28ead1cb1d86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:46',message:'POST handler entry',data:{hasResend:!!resend,hasApiKey:!!process.env.RESEND_API_KEY},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C'})}).catch(()=>{});
  // #endregion
  try {
    const body = await request.json();
    const { email } = body;
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/833f6522-72bb-4902-b25e-28ead1cb1d86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:49',message:'Request body parsed',data:{hasEmail:!!email,emailLength:email?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion

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

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/833f6522-72bb-4902-b25e-28ead1cb1d86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:67',message:'Before API key check',data:{hasApiKey:!!process.env.RESEND_API_KEY,trimmedEmail},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/833f6522-72bb-4902-b25e-28ead1cb1d86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:69',message:'API key missing - returning error',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const timestamp = new Date().toISOString();
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/833f6522-72bb-4902-b25e-28ead1cb1d86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:77',message:'Before sendWaitlistEmail call',data:{timestamp,trimmedEmail},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C'})}).catch(()=>{});
    // #endregion

    try {
      await sendWaitlistEmail(trimmedEmail, timestamp);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/833f6522-72bb-4902-b25e-28ead1cb1d86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:80',message:'sendWaitlistEmail succeeded',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C'})}).catch(()=>{});
      // #endregion
    } catch (error) {
      console.error('Failed to send waitlist email:', error);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/833f6522-72bb-4902-b25e-28ead1cb1d86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:82',message:'sendWaitlistEmail failed',data:{errorMessage:error instanceof Error?error.message:String(error),errorName:error instanceof Error?error.name:'Unknown'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C,E'})}).catch(()=>{});
      // #endregion
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
