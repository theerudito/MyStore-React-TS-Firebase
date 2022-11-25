import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { dbFirebase } from "../firebase/firebase";
const companyFirebaseBD = collection(dbFirebase, "EruditoDB");

export const getNumIvaCompany = async () => {
  const docRef = doc(companyFirebaseBD, "eruditodb");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};


export const setNumDocumentCompany = async (data: any) => {
    console.log(data);
  await setDoc(doc(companyFirebaseBD, "eruditodb"), {data});
}
