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
import {
  productsImagesBusket,
  products_DB,
} from "../../../Helpers/firebaseTools";

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
    createNewProduct: (state, action) => {},

    editProduct: (state, action) => {},

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
      state.imageUpLoad = action.payload;
    },
    prewImageProduct: (state, action) => {
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
      const imageOld = ref(productsImagesBusket, imgRef);
      deleteObject(imageOld);
      // delete product from db
      const deleteProductFirebase = doc(products_DB, id);
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
