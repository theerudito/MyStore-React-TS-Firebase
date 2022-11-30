import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  deleteDoc,
  setDoc,
  getDocs,
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
    createProduct: false,
    changeImage: false,
    prewImage: null,
    updateProduct: false,
    imageUpLoad: null,
  },
  reducers: {
    createNewProduct: (state, action) => {
      const { barcode, name, brand, description, desc, price, stock } =
        action.payload;

      const imageRef = ref(productImagesBusket, `${generateID}`);
      uploadBytes(imageRef ).then((snapshot) => {
        console.log("Uploaded complete!");
        getDownloadURL(imageRef).then(async (url) => {
          console.log(url);
          const data = new Promise((resolve, reject) => {
            resolve(
              setDoc(doc(productBaseFirebase, barcode), {
                Date: DateNowFormat,
                barcode,
                name,
                brand,
                description,
                desc,
                price,
                stock,
                refImage: generateID,
                urlImage: url,
              })
            );
          });
        });
      });
    },
    getProducts: (state, action) => {
      state.isLoading = true;
      state.products = action.payload;
    },
    getOneProduct: (state, action) => {
      console.log(action.payload);
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

export const { getProducts, deleteProduct, getOneProduct, createNewProduct } =
  productsSlice.actions;
