import { collection, doc, getDoc } from "firebase/firestore";
import { dbFirebase, storageFirebase } from "../firebase/firebase";
import { ref } from "firebase/storage";
import { useEffect } from "react";

export const generateID = Math.random().toString(20).substr(2, 9);

const localData = JSON.parse(localStorage.getItem("nameBusiness") || "null");

export const myCompany = localData === null ? "EruditoDB" : localData.nameDB;

const myCompanyID = localData === null ? "1721457495" : localData.dni;

export const DNI_COMPANY = myCompanyID;

export const company_DB = collection(dbFirebase, myCompany);

export const products_DB = collection(dbFirebase, `${myCompany}_productsDB`);

export const clients_DB = collection(dbFirebase, `${myCompany}_clientsDB`);

export const cart_DB = collection(dbFirebase, `${myCompany}_cartDB`);

export const productsImagesBusket = ref(storageFirebase, myCompany);

export const userDB = collection(dbFirebase, `${myCompany}_userDB`);


