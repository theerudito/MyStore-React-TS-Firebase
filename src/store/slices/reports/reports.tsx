import { createSlice } from "@reduxjs/toolkit";

export const reportsSlice = createSlice({
  name: "allProducts",
  initialState: {
    reportProducts: [],
    reportClients: [],
    reportDocuments: [],
    isLoading: false,
  },
  reducers: {
    getReportDocuments: (state, action) => {
      state.isLoading = true;
      state.reportProducts = action.payload;
    },
    getReportProducts: (state, action) => {
      state.isLoading = true;
      state.reportProducts = action.payload;
    },
    getReportClients: (state, action) => {
      state.isLoading = true;
      state.reportClients = action.payload;
    },
  },
});

export const { getReportDocuments, getReportClients, getReportProducts } =
  reportsSlice.actions;
