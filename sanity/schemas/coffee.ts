import { defineField, defineType } from "sanity";

export const coffee = defineType({
  name: "coffee",
  title: "Coffee",
  type: "document",
  fields: [
    defineField({ name: "nameCa", title: "Name (Catalan)", type: "string", validation: r => r.required() }),
    defineField({ name: "nameEn", title: "Name (English)", type: "string", validation: r => r.required() }),
    defineField({ name: "slug",   title: "Slug",           type: "slug", options: { source: "nameEn" }, validation: r => r.required() }),
    defineField({ name: "country", title: "Country",       type: "string", validation: r => r.required() }),
    defineField({ name: "region",  title: "Region",        type: "string" }),
    defineField({
      name: "roast", title: "Roast Level", type: "string",
      options: { list: ["light", "medium", "medium-dark", "dark"] },
      validation: r => r.required(),
    }),
    defineField({ name: "tastingNotes", title: "Tasting Notes", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "descriptionCa", title: "Description (Catalan)", type: "text" }),
    defineField({ name: "descriptionEn", title: "Description (English)", type: "text" }),
    defineField({ name: "price250g", title: "Price 250g (€)", type: "number", validation: r => r.required() }),
    defineField({ name: "price500g", title: "Price 500g (€)", type: "number" }),
    defineField({ name: "price1kg",  title: "Price 1kg (€)",  type: "number" }),
    defineField({
      name: "formats", title: "Available Formats", type: "array",
      of: [{ type: "string" }],
      options: { list: ["whole-bean", "espresso-grind", "filter-grind", "french-press-grind"] },
    }),
    defineField({ name: "image",    title: "Image",    type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", title: "Featured on Homepage", type: "boolean", initialValue: false }),
    defineField({ name: "accentColor", title: "Dot Accent Color (hex)", type: "string" }),
    defineField({ name: "heroBackground", title: "Hero Background Image", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "nameEn", subtitle: "country", media: "image" } },
});
