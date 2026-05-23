import { defineField, defineType } from "sanity";

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({ name: "nameCa",        title: "Name (Catalan)",        type: "string", validation: r => r.required() }),
    defineField({ name: "nameEn",        title: "Name (English)",        type: "string", validation: r => r.required() }),
    defineField({ name: "descriptionCa", title: "Description (Catalan)", type: "string" }),
    defineField({ name: "descriptionEn", title: "Description (English)", type: "string" }),
    defineField({ name: "price",         title: "Price (€)",             type: "number", validation: r => r.required() }),
    defineField({
      name: "category", title: "Category", type: "string",
      options: { list: ["espresso", "filter", "cold", "food"] },
      validation: r => r.required(),
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Category", name: "categoryAsc", by: [{ field: "category", direction: "asc" }, { field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "nameEn", subtitle: "category", price: "price" },
    prepare: ({ title, subtitle, price }) => ({ title, subtitle: `${subtitle} · €${price}` }),
  },
});
