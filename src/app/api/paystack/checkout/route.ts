import { NextRequest, NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_PRO_PLAN_ID = process.env.PAYSTACK_PRO_PLAN_ID;
const PAYSTACK_PREMIUM_PLAN_ID = process.env.PAYSTACK_PREMIUM_PLAN_ID;

// POST /api/paystack/checkout - Initialize a Paystack transaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, email } = body;

    if (!plan || !email) {
      return NextResponse.json({ error: 'Plan and email are required' }, { status: 400 });
    }

    const planConfig: Record<string, { planCode: string; amount: number }> = {
      pro: { planCode: PAYSTACK_PRO_PLAN_ID || '2459104', amount: 1000 },
      premium: { planCode: PAYSTACK_PREMIUM_PLAN_ID || '2459105', amount: 3000 },
    };

    const config = planConfig[plan];
    if (!config) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: config.amount,
        plan: config.planCode,
        metadata: {
          plan,
          custom_fields: [
            { display_name: 'Plan', variable_name: 'plan', value: plan },
          ],
        },
        channels: ['card', 'mobile_money', 'bank'],
      }),
    });

    const data = await response.json();

    if (data.status) {
      return NextResponse.json({
        authorization_url: data.data.authorization_url,
        access_code: data.data.access_code,
        reference: data.data.reference,
      });
    }

    return NextResponse.json({ error: data.message || 'Failed to initialize payment' }, { status: 400 });
  } catch (error: any) {
    console.error('Paystack checkout error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
