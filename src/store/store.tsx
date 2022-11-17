import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/products";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
});
