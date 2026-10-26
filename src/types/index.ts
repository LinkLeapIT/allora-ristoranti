export interface ExtraIngredient {
  ingredient: string;
  price: number;
}

import type { ProductTranslations } from '@/i18n/localize';

export interface Products {
  translations?: ProductTranslations;
  ratings?: Rating[];
  createdAt: string;
  sortOrder?: number;
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
