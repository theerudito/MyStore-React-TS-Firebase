import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { dbFirebase } from "../firebase/firebase";

export const apiGET = async () => {
  try {
    const userDoc: any = collection(dbFirebase, "users");
    const data = await getDocs(userDoc);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const apiPOST = async (dataUser: any) => {
  console.log(dataUser.age);
  try {
    const userDoc: any = collection(dbFirebase, "users");
    await addDoc(userDoc, { name: dataUser.name, age: Number(dataUser.age) });
  } catch (error) {
    console.log(error);
  }
};

export const apiUPDATE = async (id: any, age: any) => {
  try {
    const userDoc: any = doc(dbFirebase, "users", id);
    const newAge = { age: age + 1 };
    await updateDoc(userDoc, newAge);
  } catch (error) {
    console.log(error);
  }
};

export const apiDELETE = async (id: string) => {
  try {
    const userDoc: any = doc(dbFirebase, "users", id);
    await deleteDoc(userDoc);
  } catch (error) {
    console.log(error);
  }
};
