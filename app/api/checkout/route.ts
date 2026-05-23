import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export interface CheckoutItem {
  name: string;
  price: number;
  qty: number;
}

export async function createCheckoutSession(items: CheckoutItem[], baseUrl: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiVersion: "2025-02-24.acacia" as any,
  });

  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: items.map(item => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    })),
    success_url: `${baseUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/shop`,
  });
}

export async function POST(req: NextRequest) {
  const { items } = await req.json() as { items: CheckoutItem[] };
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const session = await createCheckoutSession(items, baseUrl);
  return NextResponse.json({ url: session.url });
}
