import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { authFirebase } from "../../firebase/firebase";
import { dataRegister } from "../../Helpers/initial_Values";
import { Waves_Button, Waves_Top } from "../../Helpers/Waves";

export const Register = ({ changeAuth, setchangeAuth }: any) => {
  const [dataUser, setDataUser] = useState(dataRegister);
  const handleInputChange = (e: any) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  const newUser = async (e: any) => {
    // logic to register with firebase
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        authFirebase,
        dataUser.email,
        dataUser.password
      );
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  const goLogin = () => {
    setchangeAuth(!changeAuth);
  };

  return (
    <div className="containerFormularioAuth">
      <Waves_Top />

      <div className="containerRegister">
        <form className="formRegister" onSubmit={newUser}>
          <p className="TitleForm">Register</p>

          <input
            placeholder="Name"
            type="text"
            name="name"
            value={dataUser.name}
            onChange={handleInputChange}
          />

          <input
            placeholder="Email"
            name="email"
            type="email"
            value={dataUser.email}
            onChange={handleInputChange}
          />

          <input
            placeholder="Password"
            name="password"
            type="password"
            value={dataUser.password}
            onChange={handleInputChange}
          />

          <div className="containerButtonRegister">
            <button className="btn1Auth">Register</button>
            <button className="btn2Auth" onClick={goLogin}>
              Go To Login
            </button>
          </div>
        </form>
      </div>

      <Waves_Button />
    </div>
  );
};
