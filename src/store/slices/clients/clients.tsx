import { createSlice } from "@reduxjs/toolkit";
import { addDoc, deleteDoc, doc } from "firebase/firestore";
import { clients_DB } from "../../../Helpers/firebaseTools";

export const clientsSlice = createSlice({
  name: "allClients",
  initialState: {
    clients: [],
    isLoading: false,
    oneClient: {},
    seachClientDNI: false,
    saveClient: true,
  },
  reducers: {
    searchDNI: (state, action) => {
      state.seachClientDNI = action.payload;
    },
    getClients: (state, action) => {
      state.isLoading = true;
      state.clients = action.payload;
    },
    getOneClient: (state, action) => {
      state.oneClient = action.payload;
    },
    deleteClient: (state, action) => {
      const idClient = action.payload.ci;
      state.clients.filter((item: any) => item.ci !== idClient);
      const docRef = doc(clients_DB, idClient);
      deleteDoc(docRef);
    },
    updateClient: (state, action) => {
      state.saveClient = action.payload;
    },
  },
});

export const {
  getClients,
  deleteClient,
  getOneClient,
  searchDNI,
  updateClient,
} = clientsSlice.actions;
