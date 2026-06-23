"use client";
import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";

export type CarouselApi = UseEmblaCarouselType[1];

type CarouselContextValue = {
  api: CarouselApi;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used within <Carousel>");
  return ctx;
}

interface CarouselProps {
  opts?: Parameters<typeof useEmblaCarousel>[0];
  setApi?: (api: CarouselApi) => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function Carousel({ opts, setApi, className = "", style, children }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...opts, axis: "x" });

  React.useEffect(() => {
    if (emblaApi && setApi) setApi(emblaApi);
  }, [emblaApi, setApi]);

  return (
    <CarouselContext.Provider value={{ api: emblaApi }}>
      <div ref={emblaRef} className={`overflow-hidden ${className}`} style={style}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ className = "", style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className={`flex ${className}`} style={style}>
      {children}
    </div>
  );
}

export function CarouselItem({ className = "", style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className={`min-w-0 shrink-0 grow-0 ${className}`} style={style}>
      {children}
    </div>
  );
}
