import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    products: [],
    isLoading: false,
    nameBusiness: localStorage.getItem("nameBusiness"),
  },
  reducers: {
    getBusiness: (state, action) => {
      state.nameBusiness = action.payload;
    },
  },
});

export const { getBusiness } = accountSlice.actions;
