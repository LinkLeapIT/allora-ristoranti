export type ProductStatus = "availibul" | "sold out";

const CATEGORIES = [
    "Appetizers",
    "Main Course",
    "Desserts",
    "Beverages",
    "Sides",
    "Specials"
] as const;

export type ProductCategory  = typeof CATEGORIES[number];