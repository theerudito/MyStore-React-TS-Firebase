import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { dbFirebase } from "../../../firebase/firebase";
const clientFirebaseDB = collection(dbFirebase, "clientsDB");
export const clientsSlice = createSlice({
  name: "allClients",
  initialState: {
    clients: [],
    isLoading: false,
    oneClient: {},
    createnewClient: false,
    seachClientDNI: false,
  },
  reducers: {
    createClient: (state, action) => {
      console.log(action.payload);
      if (state.seachClientDNI === true) {
        updateDoc(doc(clientFirebaseDB, action.payload.ci), action.payload);
      } else {
        setDoc(doc(clientFirebaseDB, action.payload.ci), action.payload);
      }
    },
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
      const id = action.payload.ci;
      state.clients.filter((item: any) => item.barcode !== id);

      // delete client from db
      const deleteProductFirebase = doc(clientFirebaseDB, id);
      deleteDoc(deleteProductFirebase);
    },
  },
});

export const {
  getClients,
  deleteClient,
  getOneClient,
  createClient,
  searchDNI,
} = clientsSlice.actions;
