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
      // const { barcode, name, brand, description, desc, price, stock } =
      //   action.payload;
      // if (state.imageUpLoad === null) return;
      // console.log(state.imageUpLoad);
      // const imageRef = ref(productImagesBusket, `${generateID}`);
      // // guardar la imagen en el storage
      // uploadBytes(imageRef, state.imageUpLoad).then((snapshot) => {
      //   console.log("Uploaded complete!");
      //   getDownloadURL(imageRef).then(async (url) => {
      //     console.log(url);
      //     new Promise((resolve, reject) => {
      //       resolve(
      //         setDoc(doc(productBaseFirebase, barcode), {
      //           barcode: barcode,
      //           name: name,
      //           brand: brand,
      //           description: description,
      //           desc: desc,
      //           price: price,
      //           stock: stock,
      //           refImage: generateID,
      //           image: url,
      //           Date: DateNowFormat,
      //         })
      //       );
      //     });
      //   });
      // });
      // // guardar los datos en el state
      // state.products = [...state.products, action.payload];
      // state.saveProduct = true;
      // state.changeImage = false;
      // state.prewImage = null;
      // state.imageUpLoad = null;
    },

    editProduct: (state, action) => {
      state.oneProduct = action.payload;
      // if (imageUpLoad === null) {
      //   updateDoc(doc(productBaseFirebase, product.barcode), {
      //     barcode: product.barcode,
      //     name: product.name,
      //     brand: product.brand,
      //     description: product.description,
      //     desc: product.desc,
      //     price: product.price,
      //     stock: product.stock,
      //     Date: DateNowFormat,
      //   });
      //   closeMProduct();
      // } else {
      //   const imageOld = ref(productImagesBusket, `${oneProduct.refImage}`);
      //   deleteObject(imageOld);
      //   const imageRef = ref(productImagesBusket, `${generateID}`);
      //   uploadBytes(imageRef, imageUpLoad).then((snapshot) => {
      //     console.log("Uploaded complete!");
      //     getDownloadURL(imageRef).then(async (url) => {
      //       console.log(url);
      //       new Promise((resolve, reject) => {
      //         resolve(
      //           setDoc(doc(productBaseFirebase, product.barcode), {
      //             barcode: product.barcode,
      //             name: product.name,
      //             brand: product.brand,
      //             description: product.description,
      //             desc: product.desc,
      //             price: product.price,
      //             stock: product.stock,
      //             refImage: generateID,
      //             image: url,
      //             Date: DateNowFormat,
      //           })
      //         );
      //         closeMProduct();
      //         setChangeImage(false);
      //       });
      //     });
      //   });
      //}
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
