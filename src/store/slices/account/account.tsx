import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    isLoading: false,
    exists: false,
    nameBusiness: {},
  },
  reducers: {
    getBusiness: (state, action) => {
      state.nameBusiness = action.payload;
      localStorage.setItem("nameBusiness", JSON.stringify(action.payload));
      state.exists = true;
    },
  },
});

export const { getBusiness } = accountSlice.actions;
