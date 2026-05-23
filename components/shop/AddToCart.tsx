"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import type { Coffee } from "@/lib/coffeeData";

export default function AddToCart({ coffee }: { coffee: Coffee }) {
  const [qty, setQty] = useState(1);
  const addItem  = useCartStore(s => s.addItem);
  const openCart = useCartStore(s => s.openCart);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: coffee.id, name: coffee.name, origin: coffee.origin, price: coffee.price });
    }
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
        className="flex-1 font-sans text-[10px] tracking-widest uppercase py-3 rounded-full text-white transition-opacity hover:opacity-85"
        style={{ background: "var(--red)" }}
      >
        Add to Cart — €{(coffee.price * qty).toFixed(2)}
      </button>
    </div>
  );
}
