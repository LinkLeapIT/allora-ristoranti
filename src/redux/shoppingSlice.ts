// ./src/redux/shoppingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products, CartItem } from "../type/productType";
import { isEqual } from "lodash";

interface UserInfo {
  name: string;
  email: string;
  image: string;
}

interface StoreState {
  productData: Products[];
  userInfo: null | UserInfo;
  orderData: [];
}

const initialState: StoreState = {
  productData: [],
  userInfo: null,
  orderData: [],
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<CartItem & { product: Products }>
    ) => {
      const { id, options, quantity, product } = action.payload;
      const existingProduct = state.productData.find(
        (p: Products) => p.id === id && isEqual(p.options, options)
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.productData.push({ ...product, quantity, options });
      }
    },
    increaseQuantity: (
      state,
      action: PayloadAction<{ id: string; options: any }>
    ) => {
      const existingProduct = state.productData.find(
        (p: Products) =>
          p.id === action.payload.id &&
          isEqual(p.options, action.payload.options)
      );
      if (existingProduct) {
        existingProduct.quantity++;
      }
    },
    decreaseQuantity: (
      state,
      action: PayloadAction<{ id: string; options: any }>
    ) => {
      const existingProduct = state.productData.find(
        (p: Products) =>
          p.id === action.payload.id &&
          isEqual(p.options, action.payload.options)
      );
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity--;
      }
    },
    deleteProduct: (
      state,
      action: PayloadAction<{ id: string; options: any }>
    ) => {
      state.productData = state.productData.filter(
        (p) =>
          !(
            p.id === action.payload.id &&
            isEqual(p.options, action.payload.options)
          )
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
    updateQuantityAndPrice: (
      state,
      action: PayloadAction<{ id: string; options: any; newQuantity: number }>
    ) => {
      const existingProduct = state.productData.find(
        (p: Products) =>
          p.id === action.payload.id &&
          isEqual(p.options, action.payload.options)
      );
      if (existingProduct) {
        existingProduct.quantity = action.payload.newQuantity;
      }
    },
    addUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    deleteUser: (state) => {
      state.userInfo = null;
    },
    saveOrder: (state, action) => {
      state.orderData = action.payload;
    },
    resetOrder: (state) => {
      state.orderData = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  updateQuantityAndPrice,
  addUser,
  deleteUser,
  saveOrder,
  resetOrder,
} = shoppingSlice.actions;

export const calculateTotalPrice = (
  product: Products,
  options: any,
  quantity: number
): number => {
  let totalPrice = 0;

  // Calculate price based on selected size
  if (options && options.size) {
    const selectedSize = product.sizes.find(
      (size) => size.size === options.size
    );
    totalPrice += selectedSize ? selectedSize.price : 0;
  }

  // Calculate price for selected extra ingredients
  if (
    options &&
    options.extraIngredients &&
    Array.isArray(options.extraIngredients)
  ) {
    options.extraIngredients.forEach((option: string) => {
      const ingredient = product.extraIngredients.find(
        (item) => item.ingredient === option
      );
      totalPrice += ingredient ? ingredient.price : 0;
    });
  }

  return totalPrice * quantity;
};

export const getTotalCost = (state: StoreState): number => {
  return state.productData.reduce((acc, product) => {
    const itemTotal = calculateTotalPrice(
      product,
      product.options,
      product.quantity
    );
    return acc + itemTotal;
  }, 0);
};

export default shoppingSlice.reducer;
