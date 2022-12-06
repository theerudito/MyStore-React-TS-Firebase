import React, { useEffect, useState } from "react";
import { Field, Form, useFormik } from "formik";
import { deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { userDB } from "./firebaseTools";
import { getDataFirebase } from "./getDataFirebase";

export const initialValues = {
  name: "",
  age: "",
};
export const Formik = () => {
  const [users, setUser] = useState<any>([]);

  const getUser = async () => {
    const data = await getDocs(userDB)
      .then((querySnapshot) => {
        return getDataFirebase(querySnapshot);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    setUser(data);
  };

  const potsUser = async (data: any) => {
    try {
      if (data.id) {
        await updateDoc(doc(userDB, data.id), data);
      } else {
        await setDoc(doc(userDB), data);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    formik.resetForm();
    getUser();
  };

  const updateUser = async (item: any) => {
    const id = item.id;
    const data = await getDocs(userDB)
      .then((querySnapshot) => {
        return getDataFirebase(querySnapshot);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    const user = data.filter((item: any) => item.id === id);
    // enviar los datos a los inputs
    formik.setValues(user[0]);

    getUser();
  };

  const deleteUser = async (item: any) => {
    const id = item.id;
    // borra el documento
    await deleteDoc(doc(userDB, id));
    getUser();
  };

  useEffect(() => {
    getUser();
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit: potsUser,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="name"
          name="name"
          type="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <input
          id="age"
          name="age"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.age}
        />

        <button type="submit">Submit</button>
      </form>
      <hr />
      <div>
        {users.map((item: any) => (
          <ul key={item.id}>
            <li> {item.name}</li>
            <li> {item.age}</li>
            <li>
              <button onClick={() => updateUser(item)}>Update</button>

              <button onClick={() => deleteUser(item)}>DELETE</button>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};
