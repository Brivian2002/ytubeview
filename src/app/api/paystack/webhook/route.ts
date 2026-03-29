import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Verify Paystack webhook signature
function verifySignature(payload: string, signature: string): boolean {
  const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY || '').update(payload).digest('hex');
  return hash === signature;
}

// POST /api/paystack/webhook
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature') || '';

    if (!verifySignature(body, signature)) {
      console.error('Invalid Paystack webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);
    const eventType = event.event;

    console.log(`Paystack webhook received: ${eventType}`, JSON.stringify(event.data, null, 2));

    switch (eventType) {
      case 'charge.success': {
        const { customer, metadata, amount, reference } = event.data;
        const plan = metadata?.plan || 'pro';
        const email = customer?.email;
        console.log(`Payment successful: ${email} -> ${plan} plan, $${(amount / 100).toFixed(2)}, ref: ${reference}`);
        break;
      }

      case 'charge.failed': {
        const { reference } = event.data;
        console.log(`Payment failed: ref ${reference}`);
        break;
      }

      case 'subscription.create': {
        const { customer, plan: planData } = event.data;
        console.log(`Subscription created: ${customer?.email}, plan: ${planData?.name}`);
        break;
      }

      case 'subscription.disable': {
        const { customer } = event.data;
        console.log(`Subscription disabled: ${customer?.email}`);
        break;
      }

      case 'subscription.not_renew': {
        const { customer } = event.data;
        console.log(`Subscription not renewed: ${customer?.email}`);
        break;
      }

      default:
        console.log(`Unhandled Paystack event: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Paystack webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/paystack/webhook - Verify a transaction
export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get('reference');
  if (!reference) {
    return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (data.status && data.data.status === 'success') {
      return NextResponse.json({
        verified: true,
        plan: data.data.metadata?.plan || 'pro',
        amount: data.data.amount,
        email: data.data.customer?.email,
      });
    }

    return NextResponse.json({ verified: false, status: data.data?.status });
  } catch (error: any) {
    console.error('Paystack verification error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
