import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "allProducts",
  initialState: {
    products: [],
    isLoading: false,
  },
  reducers: {
    getProducts: (state, action) => {
      state.isLoading = true;
      state.products = action.payload;
    },
  },
});

export const { getProducts } = productsSlice.actions;
