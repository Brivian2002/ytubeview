import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

// GET /api/auth/google - Get Google OAuth URL
export async function GET(request: NextRequest) {
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID || '');
  authUrl.searchParams.set('redirect_uri', GOOGLE_REDIRECT_URI || '');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'openid email profile https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics.readonly');
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');

  return NextResponse.json({ url: authUrl.toString() });
}

// POST /api/auth/google - Handle Google OAuth callback
export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Authorization code is required' }, { status: 400 });
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID || '',
        client_secret: GOOGLE_CLIENT_SECRET || '',
        redirect_uri: GOOGLE_REDIRECT_URI || '',
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokens.access_token) {
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 401 });
    }

    // Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const googleUser = await userResponse.json();

    // Upsert user in database
    const user = await db.user.upsert({
      where: { email: googleUser.email },
      update: {
        name: googleUser.name,
        image: googleUser.picture,
        googleId: googleUser.id,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      },
      create: {
        email: googleUser.email,
        name: googleUser.name,
        image: googleUser.picture,
        googleId: googleUser.id,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        plan: 'free',
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      plan: user.plan,
    });
  } catch (error: any) {
    console.error('Google OAuth error:', error);
    return NextResponse.json({ error: error.message || 'Authentication failed' }, { status: 500 });
  }
}
