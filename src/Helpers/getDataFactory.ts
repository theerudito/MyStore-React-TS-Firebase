import { doc, getDoc} from "firebase/firestore";

import { dataBaseCompany } from "./firebaseTools";

export const GET_COMPANY = async () => {
  const docRef = doc(dataBaseCompany, "1721457495");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
