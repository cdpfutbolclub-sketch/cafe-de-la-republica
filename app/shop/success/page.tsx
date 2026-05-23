import { redirect } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) redirect("/shop");

  return (
    <>
      <div className="relative" style={{ minHeight: "35vh", background: "#1a0a04" }}>
        <Nav />
      </div>
      <main className="px-10 py-20 text-center" style={{ background: "var(--cream)" }}>
        <div className="max-w-lg mx-auto">
          <p className="eyebrow text-[var(--red)] mb-4">Order Confirmed</p>
          <h1 className="font-serif text-[var(--brown)] mb-5" style={{ fontSize: "2.5rem" }}>
            Thank you!
          </h1>
          <p className="text-[var(--brown-light)] text-[15px] leading-relaxed mb-8">
            Your order is on its way. We'll send a confirmation email shortly.
            Expect your coffee within 3–5 business days.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase px-8 py-3.5 rounded-full text-white transition-opacity hover:opacity-85"
            style={{ background: "var(--red)" }}
          >
            Back to Shop <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
