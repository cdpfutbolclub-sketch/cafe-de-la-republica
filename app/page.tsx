import Nav                 from "@/components/layout/Nav";
import SplitScreenHero     from "@/components/home/SplitScreenHero";
import FeaturedCoffees     from "@/components/home/FeaturedCoffees";
import PromoStrip          from "@/components/home/PromoStrip";
import SubscriptionTeaser  from "@/components/home/SubscriptionTeaser";
import StorySection        from "@/components/home/StorySection";
import MenuPreview         from "@/components/home/MenuPreview";
import LocationSection     from "@/components/home/LocationSection";
import Footer              from "@/components/layout/Footer";
import { getAllCoffees }   from "@/lib/sanity/queries";
import { sanityImg }       from "@/lib/sanity/imageUrl";

export default async function HomePage() {
  const coffees = await getAllCoffees().catch(() => []);
  const heroImages = Object.fromEntries(
    coffees
      .filter(c => c.image?.asset.url)
      .map(c => [c.slug, sanityImg(c.image!.asset.url, 1200)])
  );

  return (
    <>
      <div className="relative">
        <Nav />
        <SplitScreenHero images={heroImages} />
      </div>

      <main>
        <PromoStrip />
        <FeaturedCoffees />
        <PromoStrip />
        <SubscriptionTeaser />
        <StorySection />

        {/* Divider */}
        <div aria-hidden="true" style={{ background: "var(--cream-warm)", paddingTop: "8px", paddingBottom: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
          <div style={{ height: "1px", width: "120px", background: "rgba(200,169,138,0.45)" }} />
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.55 }}>
            <ellipse cx="9" cy="11" rx="7" ry="10" stroke="#8b6650" strokeWidth="1.2"/>
            <path d="M9 1 Q14 5.5 14 11 Q14 16.5 9 21" stroke="#8b6650" strokeWidth="1" fill="none"/>
            <path d="M9 1 Q4 5.5 4 11 Q4 16.5 9 21" stroke="#8b6650" strokeWidth="0.8" fill="none"/>
          </svg>
          <div style={{ height: "1px", width: "120px", background: "rgba(200,169,138,0.45)" }} />
        </div>

        <MenuPreview />
        <LocationSection />
      </main>

      <Footer />
    </>
  );
}
