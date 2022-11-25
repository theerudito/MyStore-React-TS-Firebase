import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "card",
  initialState: {
    cardInfor: [],
    cart: [],
    isLoading: false,
    totalBuy: 0,
  },
  reducers: {
    getCartInfor: (state, action) => {
      state.isLoading = true;
      state.cardInfor = action.payload;
    },
    getCart: (state, action) => {
      const idPproduct = action.payload.id;
      const vUnitary = Number(action.payload.price);
      if (state.cart.findIndex((itemOld) => itemOld.id === idPproduct) < 0) {
        state.cart = [
          ...state.cart,
          { ...action.payload, quantity: 1, priceTotal: vUnitary },
        ];
      } else {
        state.cart = state.cart.map((itemOld) => {
          if (itemOld.id === idPproduct) {
            return {
              ...itemOld,
              quantity: itemOld.quantity + 1,
              priceTotal: itemOld.price * (itemOld.quantity + 1),
            };
          } else {
            return itemOld;
          }
        });
      }
    },
    getTotalBuy: (state, action) => {
      state.totalBuy = action.payload.reduce(
        (acc: any, item: any) => acc + item.priceTotal,
        0
      );
    },

    deleteCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      if (state.cart.length === 0) {
        state.totalBuy = 0;
      }
    },
  },
});

export const { getCart, getCartInfor, deleteCart, getTotalBuy } =
  cartSlice.actions;
