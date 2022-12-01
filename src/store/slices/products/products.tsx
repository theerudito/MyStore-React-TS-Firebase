import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  deleteDoc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { dbFirebase, storageFirebase } from "../../../firebase/firebase";
import { DateNowFormat } from "../../../Helpers/getDate_Hour";
const productBaseFirebase = collection(dbFirebase, "productsDB");
const productImagesBusket = ref(storageFirebase, `empresa/`);
const generateID = Math.random().toString(20).substr(2, 9);
export const productsSlice = createSlice({
  name: "allProducts",
  initialState: {
    products: [],
    isLoading: false,
    oneProduct: {},
    updateProduct: true,
    saveProduct: true,
    changeImage: false,
    prewImage: null,
    imageUpLoad: null,
  },
  reducers: {
    createNewProduct: (state, action) => {
      const { barcode, name, brand, description, desc, price, stock } =
        action.payload;
      console.log(action.payload);
      //const imageRef = ref(productImagesBusket, `${generateID}`);
    },
    editProduct: (state, action) => {
      state.oneProduct = action.payload;
    },
    isEditProduct: (state, action) => {
      state.updateProduct = action.payload;
      state.saveProduct = false;
    },
    isSaveProduct: (state, action) => {
      state.saveProduct = action.payload;
      state.updateProduct = false;
    },
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getOneProduct: (state, action) => {
      state.oneProduct = action.payload;
    },
    changeImageProduct: (state, action) => {
      state.changeImage = action.payload;
    },
    uploadImageProduct: (state, action) => {
      console.log(action.payload);
      state.imageUpLoad = action.payload;
    },
    prewImageProduct: (state, action) => {
      console.log(action.payload);
      state.prewImage = action.payload;
    },
    searchProductDB: (state, action) => {
      state.oneProduct = action.payload;
    },
    deleteProduct: (state, action) => {
      const id = action.payload.barcode;
      const imgRef = action.payload.refImage;
      state.products.filter((item: any) => item.barcode !== id);
      // delete image from storage
      const imageOld = ref(productImagesBusket, imgRef);
      deleteObject(imageOld);
      // delete product from db
      const deleteProductFirebase = doc(productBaseFirebase, id);
      deleteDoc(deleteProductFirebase);
    },
  },
});

export const {
  getProducts,
  deleteProduct,
  getOneProduct,
  createNewProduct,
  editProduct,
  isEditProduct,
  isSaveProduct,
  changeImageProduct,
  searchProductDB,
  prewImageProduct,
  uploadImageProduct,
} = productsSlice.actions;
