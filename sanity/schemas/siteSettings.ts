import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "address",      title: "Address",       type: "text" }),
    defineField({ name: "hoursMF",      title: "Hours Mon–Fri", type: "string" }),
    defineField({ name: "hoursSat",     title: "Hours Saturday", type: "string" }),
    defineField({ name: "hoursSun",     title: "Hours Sunday",   type: "string" }),
    defineField({ name: "phone",        title: "Phone",          type: "string" }),
    defineField({ name: "email",        title: "Email",          type: "string" }),
    defineField({ name: "instagramUrl", title: "Instagram URL",  type: "url" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
