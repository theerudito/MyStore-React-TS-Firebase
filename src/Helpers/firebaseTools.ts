import { collection } from "firebase/firestore";
import { dbFirebase, storageFirebase } from "../firebase/firebase";
import { ref } from "firebase/storage";

const company = "EruditoDB";

export const dataBaseCompany = collection(dbFirebase, company);
export const productsFirebaseDB = collection(
  dbFirebase,
  `${company}_productsDB`
);
export const clientsFirebaseDB = collection(dbFirebase, `${company}_clientsDB`);
export const cartFirebaseDB = collection(dbFirebase, `${company}_cartDB`);
export const productsImagesBusket = ref(storageFirebase, company);
