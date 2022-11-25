import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { dbFirebase } from "../firebase/firebase";
const companyFirebaseBD = collection(dbFirebase, "EruditoDB");

export const getNumIvaCompany = async () => {
  const docRef = doc(companyFirebaseBD, "1721457495");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};


