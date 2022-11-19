import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./slices/account";
import { productsSlice } from "./slices/products";
import { reportsSlice } from "./slices/reports";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    account: accountSlice.reducer,
    reports: reportsSlice.reducer,
  },
});
