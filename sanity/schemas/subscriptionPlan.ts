import { defineField, defineType } from "sanity";

export const subscriptionPlan = defineType({
  name: "subscriptionPlan",
  title: "Subscription Plan",
  type: "document",
  fields: [
    defineField({
      name: "frequency", title: "Frequency", type: "string",
      options: { list: ["weekly", "biweekly", "monthly"] },
      validation: r => r.required(),
    }),
    defineField({
      name: "size", title: "Bag Size", type: "string",
      options: { list: ["250g", "500g", "1kg"] },
      validation: r => r.required(),
    }),
    defineField({ name: "price",         title: "Price (€/delivery)",  type: "number", validation: r => r.required() }),
    defineField({ name: "stripePriceId", title: "Stripe Price ID",     type: "string" }),
  ],
  preview: {
    select: { freq: "frequency", size: "size", price: "price" },
    prepare: ({ freq, size, price }) => ({ title: `${freq} · ${size}`, subtitle: `€${price}` }),
  },
});
