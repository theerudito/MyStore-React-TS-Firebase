import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./slices/account";
import { cardSlice } from "./slices/cart/cart";
import { productsSlice } from "./slices/products";
import { reportsSlice } from "./slices/reports";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    account: accountSlice.reducer,
    card: cardSlice.reducer,
    reports: reportsSlice.reducer,
  },
});
