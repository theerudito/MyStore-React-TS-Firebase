import { doc, getDoc } from "firebase/firestore";

import { company_DB } from "./firebaseTools";

export const GET_COMPANY = async () => {
  const docRef = doc(company_DB, "1721457495");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
