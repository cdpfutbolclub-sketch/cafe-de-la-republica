"use client";
import { useCartStore } from "@/store/cart";

export default function CartDrawer() {
  const items      = useCartStore(s => s.items);
  const isOpen     = useCartStore(s => s.isOpen);
  const closeCart  = useCartStore(s => s.closeCart);
  const removeItem = useCartStore(s => s.removeItem);
  const total      = useCartStore(s => s.total);
  const itemCount  = useCartStore(s => s.itemCount);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[60]"
        style={{ background: "rgba(8,3,1,0.5)" }}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className="fixed top-0 right-0 h-full z-[70] flex flex-col"
        style={{ width: "380px", background: "var(--cream)", boxShadow: "-4px 0 24px rgba(0,0,0,0.2)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid rgba(200,169,138,0.3)" }}
        >
          <h2 className="font-serif text-[var(--brown)] text-lg">
            Cart ({itemCount()})
          </h2>
          <button
            onClick={closeCart}
            aria-label="close cart"
            className="text-[var(--brown-light)] hover:text-[var(--brown)] transition-colors font-sans"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-[var(--brown-light)] text-sm text-center mt-10">
              Your cart is empty.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.id} className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-serif text-[var(--brown)] text-sm">{item.origin}</p>
                    <p className="eyebrow text-[var(--brown-light)] mt-0.5">
                      {item.qty} × €{item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.origin} from cart`}
                    className="text-[var(--brown-light)] hover:text-[var(--red)] transition-colors"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-5"
            style={{ borderTop: "1px solid rgba(200,169,138,0.3)" }}
          >
            <div className="flex justify-between mb-4">
              <span className="font-sans text-[var(--brown-light)] text-sm uppercase tracking-widest">
                Total
              </span>
              <span className="font-serif text-[var(--brown)] text-lg">
                €{total().toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full font-sans text-[10px] tracking-widest uppercase py-4 rounded-full text-white transition-opacity hover:opacity-85"
              style={{ background: "var(--red)" }}
            >
              Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
