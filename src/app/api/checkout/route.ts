import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe não configurado' }, { status: 500 });
    }

    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16' as any,
    });

    // A baseUrl para onde o usuário será redirecionado após o pagamento
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'SaaS Sites - Plano Agência Premium',
              description: 'Criação ilimitada de sites premium para seus clientes.',
            },
            unit_amount: 9700, // R$ 97,00 por mês
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${baseUrl}/sites?upgrade=success`,
      cancel_url: `${baseUrl}/create?upgrade=cancelled`,
      // Como não temos a sessão exata aqui via request (precisaria do NextAuth getToken), 
      // podemos passar o email ou ID do usuário via body.
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erro no checkout do Stripe:', error);
    return NextResponse.json({ error: 'Erro ao gerar checkout' }, { status: 500 });
  }
}
