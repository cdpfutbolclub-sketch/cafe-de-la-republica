import { sanityClient } from "./client";

// ── Types ──────────────────────────────────────────
export type SanityCoffee = {
  _id: string;
  slug: string;
  nameCa: string;
  nameEn: string;
  country: string;
  region?: string;
  roast: string;
  tastingNotes: string[];
  descriptionCa?: string;
  descriptionEn?: string;
  price250g: number;
  price500g?: number;
  price1kg?: number;
  formats: string[];
  image?: { asset: { url: string } };
  heroBackground?: { asset: { url: string } };
  accentColor?: string;
  featured: boolean;
};

export type SanityMenuItem = {
  _id: string;
  nameCa: string;
  nameEn: string;
  descriptionCa?: string;
  descriptionEn?: string;
  price: number;
  category: string;
  order?: number;
};

export type SanitySiteSettings = {
  address?: string;
  hoursMF?: string;
  hoursSat?: string;
  hoursSun?: string;
  phone?: string;
  email?: string;
  instagramUrl?: string;
};

export type SanityHomepageSettings = {
  featuredCoffees: SanityCoffee[];
  storyCa?: string;
  storyEn?: string;
  storyImage?: { asset: { url: string } };
};

// ── Queries ────────────────────────────────────────
export async function getAllCoffees(): Promise<SanityCoffee[]> {
  return sanityClient.fetch(
    `*[_type == "coffee"] | order(roast asc) {
      _id, "slug": slug.current,
      nameCa, nameEn, country, region, roast,
      tastingNotes, descriptionCa, descriptionEn,
      price250g, price500g, price1kg, formats,
      "image": image { asset-> { url } },
      "heroBackground": heroBackground { asset-> { url } },
      accentColor, featured
    }`
  );
}

export async function getFeaturedCoffees(): Promise<SanityCoffee[]> {
  return sanityClient.fetch(
    `*[_type == "homepageSettings"][0].featuredCoffees[]-> {
      _id, "slug": slug.current,
      nameCa, nameEn, country, region, roast,
      tastingNotes, price250g,
      "image": image { asset-> { url } },
      accentColor, featured
    }`
  );
}

export async function getCoffeeBySlug(slug: string): Promise<SanityCoffee | null> {
  return sanityClient.fetch(
    `*[_type == "coffee" && slug.current == $slug][0] {
      _id, "slug": slug.current,
      nameCa, nameEn, country, region, roast,
      tastingNotes, descriptionCa, descriptionEn,
      price250g, price500g, price1kg, formats,
      "image": image { asset-> { url } },
      "heroBackground": heroBackground { asset-> { url } },
      accentColor, featured
    }`,
    { slug }
  );
}

export async function getMenuItems(): Promise<SanityMenuItem[]> {
  return sanityClient.fetch(
    `*[_type == "menuItem"] | order(category asc, order asc) {
      _id, nameCa, nameEn, descriptionCa, descriptionEn, price, category, order
    }`
  );
}

export async function getSiteSettings(): Promise<SanitySiteSettings> {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0] {
      address, hoursMF, hoursSat, hoursSun, phone, email, instagramUrl
    }`
  );
}

export async function getHomepageSettings(): Promise<SanityHomepageSettings> {
  return sanityClient.fetch(
    `*[_type == "homepageSettings"][0] {
      "featuredCoffees": featuredCoffees[]-> {
        _id, "slug": slug.current,
        nameCa, nameEn, country, region, roast,
        tastingNotes, descriptionCa, descriptionEn,
        price250g, price500g, price1kg, formats,
        "image": image { asset-> { url } },
        "heroBackground": heroBackground { asset-> { url } },
        accentColor, featured
      },
      storyCa, storyEn,
      "storyImage": storyImage { asset-> { url } }
    }`
  );
}
