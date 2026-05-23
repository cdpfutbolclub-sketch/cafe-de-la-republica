/**
 * @jest-environment node
 */

const mockCreate = jest.fn().mockResolvedValue({
  url: "https://checkout.stripe.com/session_test_123",
});

jest.mock("stripe", () =>
  jest.fn().mockImplementation(() => ({
    checkout: { sessions: { create: mockCreate } },
  }))
);

import { createCheckoutSession } from "@/app/api/checkout/route";

beforeEach(() => {
  process.env.STRIPE_SECRET_KEY = "sk_test_mock";
  mockCreate.mockClear();
});

test("createCheckoutSession builds correct EUR line items", async () => {
  await createCheckoutSession(
    [{ name: "Ethiopia 250g", price: 14.50, qty: 2 }],
    "http://localhost:3000"
  );
  expect(mockCreate).toHaveBeenCalledWith(
    expect.objectContaining({
      mode: "payment",
      line_items: [
        expect.objectContaining({
          price_data: expect.objectContaining({ currency: "eur", unit_amount: 1450 }),
          quantity: 2,
        }),
      ],
    })
  );
});

test("createCheckoutSession returns the Stripe session url", async () => {
  const session = await createCheckoutSession(
    [{ name: "Kenya 250g", price: 15.00, qty: 1 }],
    "http://localhost:3000"
  );
  expect(session.url).toBe("https://checkout.stripe.com/session_test_123");
});
