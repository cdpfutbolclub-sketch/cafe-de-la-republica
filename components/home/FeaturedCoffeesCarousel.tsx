"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useCartStore } from "@/store/cart";
import FlipButton from "@/components/shared/FlipButton";
import CoffeeBeansBg from "@/components/shared/CoffeeBeansBg";

interface Coffee {
  slug: string;
  nameEn: string;
  country: string;
  region?: string;
  roast: string;
  tastingNotes: string[];
  price250g: number;
  accentColor?: string;
  image?: { asset: { url: string } };
  productImage?: { asset: { url: string } };
}

export default function FeaturedCoffeesCarousel({ coffees }: { coffees: Coffee[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const openCart = useCartStore(s => s.openCart);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);

  function handleAddToCart(coffee: Coffee) {
    addItem({
      id: coffee.slug,
      name: coffee.nameEn,
      origin: coffee.region ? `${coffee.country} · ${coffee.region}` : coffee.country,
      price: coffee.price250g,
    });
    openCart();
  }

  return (
    <section style={{ background: "var(--cream)", paddingTop: "80px", paddingBottom: "80px" }} className="overflow-hidden relative">
      <CoffeeBeansBg />

      {/* Header */}
      <div style={{ paddingLeft: "60px", paddingRight: "60px" }} className="mb-10">
        <p className="eyebrow text-[var(--brown-light)] mb-2">Our Coffees</p>
        <h2 className="font-serif text-[var(--brown)]" style={{ fontSize: "2.2rem", lineHeight: 1.1 }}>
          Featured Origins
        </h2>
      </div>

      {/* Carousel + side arrows */}
      <div className="relative">

        {/* Left gradient + arrow */}
        <AnimatePresence>
          {canPrev && (
            <motion.div
              key="left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-start pl-3"
              style={{ width: "120px", background: "linear-gradient(to right, var(--cream) 30%, transparent 100%)" }}
            >
              <button
                onClick={() => api?.scrollPrev()}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(92,51,23,0.12)", border: "1px solid rgba(92,51,23,0.2)" }}
              >
                <ArrowLeft size={16} className="text-[var(--brown)]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right gradient + arrow */}
        <AnimatePresence>
          {canNext && (
            <motion.div
              key="right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-end pr-3"
              style={{ width: "120px", background: "linear-gradient(to left, var(--cream) 30%, transparent 100%)" }}
            >
              <button
                onClick={() => api?.scrollNext()}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(92,51,23,0.12)", border: "1px solid rgba(92,51,23,0.2)" }}
              >
                <ArrowRight size={16} className="text-[var(--brown)]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <Carousel setApi={setApi} style={{ paddingLeft: "60px" }}>
          <CarouselContent style={{ marginRight: "-28px" }}>
          {coffees.map(coffee => {
            const bg = coffee.accentColor
              ? `linear-gradient(150deg, ${coffee.accentColor}55 0%, #1a0a04 100%)`
              : "linear-gradient(150deg, #3b2510 0%, #1a0a04 100%)";

            return (
              <CarouselItem key={coffee.slug} style={{ width: "300px", flexBasis: "300px", paddingRight: "28px" }}>
                <div className="flex flex-col h-full">

                  {/* Image */}
                  <Link href={`/shop/${coffee.slug}`} className="group block flex-shrink-0" style={{ marginBottom: "20px" }}>
                    <div
                      className="relative w-full rounded-xl overflow-hidden"
                      style={{ height: "200px", background: bg }}
                    >
                      {(coffee.productImage?.asset.url ?? coffee.image?.asset.url) ? (
                        <Image
                          src={(coffee.productImage?.asset.url ?? coffee.image?.asset.url)!}
                          alt={coffee.nameEn}
                          fill
                          sizes="300px"
                          unoptimized
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full" />
                      )}
                    </div>
                  </Link>

                  {/* Text meta */}
                  <p className="eyebrow text-[var(--brown-light)] mb-1 text-[9px]">
                    {coffee.country}{coffee.region ? ` · ${coffee.region}` : ""}
                  </p>
                  <h3 className="font-serif text-[var(--brown)] mb-0.5" style={{ fontSize: "1.2rem" }}>
                    {coffee.nameEn}
                  </h3>
                  <p className="font-sans text-[var(--brown-light)] text-[9px] tracking-widest uppercase mb-2">
                    {coffee.roast} Roast
                  </p>
                  <p className="text-[11px] text-[var(--brown-light)] mb-5 leading-snug">
                    {coffee.tastingNotes.join(" · ")}
                  </p>

                  {/* Price row */}
                  <div className="mt-auto" style={{ paddingTop: "16px" }}>
                    <p className="font-serif text-[var(--brown)]" style={{ fontSize: "1.25rem", marginBottom: "24px" }}>
                      €{coffee.price250g.toFixed(2)}
                      <span className="text-[var(--brown-light)] text-xs font-sans font-normal ml-1">/ 250g</span>
                    </p>
                    <FlipButton onAdd={() => handleAddToCart(coffee)} />
                    <div style={{ height: "16px" }} />
                  </div>

                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
