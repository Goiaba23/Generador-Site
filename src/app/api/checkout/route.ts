import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe não configurado' }, { status: 500 });
    }

    const body = await request.json().catch(() => ({}));
    const { plan = 'premium', userId, email } = body;

    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16' as any,
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const plans: Record<string, { name: string; desc: string; amount: number }> = {
      simple: { name: 'SaaS Sites - Plano Simples', desc: 'Até 5 sites premium para clientes.', amount: 7990 },
      premium: { name: 'SaaS Sites - Plano Agência Premium', desc: 'Criação ilimitada de sites premium para seus clientes.', amount: 19700 },
    };

    const selected = plans[plan] || plans.premium;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      client_reference_id: userId || email || undefined,
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: { name: selected.name, description: selected.desc },
            unit_amount: selected.amount,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${baseUrl}/sites?upgrade=success`,
      cancel_url: `${baseUrl}/create?upgrade=cancelled`,
      metadata: { plan, userId: userId || '', email: email || '' },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erro no checkout do Stripe:', error);
    return NextResponse.json({ error: 'Erro ao gerar checkout' }, { status: 500 });
  }
}
