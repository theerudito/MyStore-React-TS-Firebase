import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: "card",
  initialState: {
    card: [],
    isLoading: false,
    total: 0,
  },
  reducers: {
    getCart: (state, action) => {
      state.isLoading = true;
      state.card = action.payload;
    },
    getTotals: (state, action) => {
      console.log(action.payload);
      state.total = action.payload;
    },
  },
});

export const { getCart, getTotals } = cardSlice.actions;
