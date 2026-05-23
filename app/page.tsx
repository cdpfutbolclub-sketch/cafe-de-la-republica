import Nav                 from "@/components/layout/Nav";
import SplitScreenHero     from "@/components/home/SplitScreenHero";
import FeaturedCoffees     from "@/components/home/FeaturedCoffees";
import PromoStrip          from "@/components/home/PromoStrip";
import SubscriptionTeaser  from "@/components/home/SubscriptionTeaser";
import StorySection        from "@/components/home/StorySection";
import MenuPreview         from "@/components/home/MenuPreview";
import LocationSection     from "@/components/home/LocationSection";
import Footer              from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <div className="relative">
        <Nav />
        <SplitScreenHero />
      </div>

      <main>
        <FeaturedCoffees />
        <PromoStrip />
        <SubscriptionTeaser />
        <StorySection />
        <MenuPreview />
        <LocationSection />
      </main>

      <Footer />
    </>
  );
}
