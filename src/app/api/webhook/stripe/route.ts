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
    // Dynamic import to avoid initialization errors
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16' as any,
    });
    
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      
      // In a real app, you would pass the userId in client_reference_id
      try {
        let user = await prisma.user.findFirst();
        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              plan: 'pro',
            },
          });
          console.log('User upgraded to PRO plan successfully!');
        }
      } catch (e) {
        console.error('Failed to update user plan', e);
      }
    }
    
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
  }
}
