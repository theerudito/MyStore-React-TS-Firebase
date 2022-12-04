import { collection, doc, getDoc } from "firebase/firestore";
import { dbFirebase, storageFirebase } from "../firebase/firebase";
import { ref } from "firebase/storage";

export const DNI_COMPANY = "1721457495";

export const generateID = Math.random().toString(20).substr(2, 9);

const myCompany = "EruditoDB";

export const company_DB = collection(dbFirebase, myCompany);
export const products_DB = collection(dbFirebase, `${myCompany}_productsDB`);
export const clients_DB = collection(dbFirebase, `${myCompany}_clientsDB`);
export const cart_DB = collection(dbFirebase, `${myCompany}_cartDB`);
export const productsImagesBusket = ref(storageFirebase, myCompany);
