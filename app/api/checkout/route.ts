import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export interface CheckoutItem {
  name: string;
  price: number;
  qty: number;
}

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiVersion: "2025-02-24.acacia" as any,
  });
}

export async function createCheckoutSession(items: CheckoutItem[], baseUrl: string) {
  return getStripe().checkout.sessions.create({
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
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Checkout unavailable" }, { status: 500 });
    }
    const body = await req.json();
    if (!Array.isArray(body?.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Invalid items" }, { status: 400 });
    }
    const items: CheckoutItem[] = body.items.map((item: unknown) => {
      const i = item as CheckoutItem;
      if (typeof i.name !== "string" || typeof i.price !== "number" || i.price <= 0 || typeof i.qty !== "number" || i.qty < 1) {
        throw new Error("Invalid item shape");
      }
      return { name: i.name, price: i.price, qty: i.qty };
    });
    const session = await createCheckoutSession(items, process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000");
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: "Checkout unavailable" }, { status: 500 });
  }
}
