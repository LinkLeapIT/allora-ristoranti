export interface ExtraIngredient {
  ingredient: string;
  price: number;
}

export interface Products {
  ratings?: Rating[];
  createdAt: string;
  updateAt: string;
  id: string;
  title: string;
  images: string[];
  description: string;
  price: number;
  quantity: number;
  isFeatured: boolean;
  isNew: boolean;
  category: string;
  slug: string;
  status: ProductStatus;
  allergy: string[];
  extraIngredients?: ExtraIngredient[];
}

export interface Rating {
  id: string;
  productId: any;
  rating: number;
  comment: string;
  userImage?: string;
  userName?: string;
}

export interface ProductRatingSummary {
  average: number;
  count: number;
}

export type ProductStatus = "available" | "unavailable" | "hidden";
export type ProductCategory = "pizza" | "pasta" | "burger" | "sushi" | "dessert" | "drink";
