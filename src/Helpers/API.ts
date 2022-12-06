import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { dbFirebase } from "../firebase/firebase";
import { company_DB } from "./firebaseTools";
import { getDataFirebase } from "./getDataFirebase";

export const apiGET = async () => {
  try {
    const data = await getDocs(userDB)
      .then((querySnapshot) => {
        return getDataFirebase(querySnapshot);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const apiGET_ONE = async (id: any) => {
  console.log("id ", id);
  try {
    const data = await getDocs(company_DB)
      .then((querySnapshot) => {
        return getDataFirebase(querySnapshot);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    const [dataOne]: any = data;
    return dataOne;
  } catch (error) {
    console.log(error);
  }
};

export const apiPOST = async (data: any) => {
  try {
    const postData = await setDoc(doc(userDB), data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const apiUPDATE = async (data: any) => {
  try {
    const updateData = await updateDoc(doc(userDB, data.id), data);
  } catch (error) {
    console.log(error);
  }
};

export const apiDELETE = async (id: string) => {
  try {
    const deleteData: any = await deleteDoc(doc(userDB, id));
  } catch (error) {
    console.log(error);
  }
};
