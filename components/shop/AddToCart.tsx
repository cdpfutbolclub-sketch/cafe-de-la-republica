"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import type { SanityCoffee } from "@/lib/sanity/queries";

export default function AddToCart({ coffee }: { coffee: SanityCoffee }) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore(s => s.addItem);
  const updateQty = useCartStore(s => s.updateQty);
  const openCart = useCartStore(s => s.openCart);

  const handleAdd = () => {
    const existing = useCartStore.getState().items.find(i => i.id === coffee.slug);
    const targetQty = (existing?.qty ?? 0) + qty;
    addItem({ id: coffee.slug, name: coffee.nameEn, origin: coffee.country, price: coffee.price250g });
    if (targetQty > 1) updateQty(coffee.slug, targetQty);
    openCart();
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className="flex items-center rounded-full overflow-hidden"
        style={{ border: "1px solid rgba(200,169,138,0.4)" }}
      >
        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          aria-label="decrease quantity"
          className="w-10 h-10 flex items-center justify-center text-[var(--brown)] hover:bg-[var(--cream-warm)] transition-colors font-sans text-lg"
        >
          −
        </button>
        <span className="w-10 text-center font-sans text-[var(--brown)] text-sm select-none">
          {qty}
        </span>
        <button
          onClick={() => setQty(q => q + 1)}
          aria-label="increase quantity"
          className="w-10 h-10 flex items-center justify-center text-[var(--brown)] hover:bg-[var(--cream-warm)] transition-colors font-sans text-lg"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        aria-label={`Add ${qty} ${coffee.nameEn} to cart — €${(coffee.price250g * qty).toFixed(2)}`}
        className="flex-1 font-sans text-[10px] tracking-widest uppercase py-3 rounded-full text-white transition-opacity hover:opacity-85"
        style={{ background: "var(--red)" }}
      >
        Add to Cart — €{(coffee.price250g * qty).toFixed(2)}
      </button>
    </div>
  );
}
