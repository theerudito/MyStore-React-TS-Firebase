import { collection, doc, getDoc } from "firebase/firestore";
import { dbFirebase, storageFirebase } from "../firebase/firebase";
import { ref } from "firebase/storage";

const localData = JSON.parse(localStorage.getItem("nameBusiness") || "null");

export const generateID = Math.random().toString(20).substr(2, 9);

const myCompany = localData !== null ? localData.nameDB : "Demo";

export const DNI_COMPANY = localData !== null ? localData.dni : "12345678";

export const company_DB = collection(dbFirebase, myCompany);

export const products_DB = collection(dbFirebase, `${myCompany}_productsDB`);

export const clients_DB = collection(dbFirebase, `${myCompany}_clientsDB`);

export const cart_DB = collection(dbFirebase, `${myCompany}_cartDB`);

export const userDB = collection(dbFirebase, `${myCompany}_userDB`);

export const productsImagesBusket = ref(storageFirebase, myCompany);
