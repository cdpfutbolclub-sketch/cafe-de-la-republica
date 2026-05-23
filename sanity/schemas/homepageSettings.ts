import { defineField, defineType } from "sanity";

export const homepageSettings = defineType({
  name: "homepageSettings",
  title: "Homepage Settings",
  type: "document",
  fields: [
    defineField({
      name: "featuredCoffees", title: "Featured Coffees (3)",
      type: "array", of: [{ type: "reference", to: [{ type: "coffee" }] }],
      validation: r => r.max(3),
    }),
    defineField({ name: "storyCa", title: "Story Text (Catalan)", type: "text" }),
    defineField({ name: "storyEn", title: "Story Text (English)", type: "text" }),
    defineField({ name: "storyImage", title: "Story Image", type: "image", options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: "Homepage Settings" }) },
});
