import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') as string;

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16' as any,
    });

    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const userId = session.metadata?.userId || session.client_reference_id;
      const plan = session.metadata?.plan || 'premium';
      const email = session.customer_email || session.metadata?.email;

      try {
        let user = userId
          ? await prisma.user.findUnique({ where: { id: userId } })
          : email
            ? await prisma.user.findUnique({ where: { email } })
            : null;

        if (!user) {
          user = await prisma.user.findFirst();
        }

        if (user) {
          const planConfig: Record<string, { plan: string; sitesLimit: number }> = {
            simple: { plan: 'simple', sitesLimit: 5 },
            premium: { plan: 'premium', sitesLimit: -1 },
          };
          const cfg = planConfig[plan] || planConfig.premium;

          await prisma.user.update({
            where: { id: user.id },
            data: {
              plan: cfg.plan,
              sitesLimit: cfg.sitesLimit,
              planExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
          });
          console.log(`[Stripe Webhook] User ${user.email} upgraded to ${cfg.plan} plan.`);
        }
      } catch (e) {
        console.error('Failed to update user plan', e);
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as any;
      const userId = sub.metadata?.userId;

      if (userId) {
        try {
          await prisma.user.update({
            where: { id: userId },
            data: { plan: 'free', sitesLimit: 1 },
          });
          console.log(`[Stripe Webhook] User ${userId} downgraded to free.`);
        } catch (e) {
          console.error('Failed to downgrade user', e);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
  }
}
