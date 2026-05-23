import { coffee }            from "./schemas/coffee";
import { subscriptionPlan }  from "./schemas/subscriptionPlan";
import { menuItem }          from "./schemas/menuItem";
import { homepageSettings }  from "./schemas/homepageSettings";
import { siteSettings }      from "./schemas/siteSettings";

export const schema = { types: [coffee, subscriptionPlan, menuItem, homepageSettings, siteSettings] };
