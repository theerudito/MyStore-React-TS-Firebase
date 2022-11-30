import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./slices/account";
import { cartSlice } from "./slices/cart/cart";
import { clientsSlice } from "./slices/clients";
import { productsSlice } from "./slices/products";
import { reportsSlice } from "./slices/reports";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    clients: clientsSlice.reducer,
    account: accountSlice.reducer,
    cart: cartSlice.reducer,
    reports: reportsSlice.reducer,
  },
});
