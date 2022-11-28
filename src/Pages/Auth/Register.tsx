import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { authFirebase } from "../../firebase/firebase";
import { handleInputChange } from "../../Helpers/handleChange";
import { dataRegister } from "../../Helpers/initial_Values";
import { Waves_Button, Waves_Top } from "../../Helpers/Waves";
import { useNavigate } from "react-router-dom";

export const Register = ({ changeAuth, setchangeAuth }: any) => {
  const [dataUser, setDataUser] = useState(dataRegister);
  const navigate = useNavigate();

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
      navigate("/account");
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
            onChange={(e) => handleInputChange(dataUser, setDataUser, e)}
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={dataUser.email}
            onChange={(e) => handleInputChange(dataUser, setDataUser, e)}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={dataUser.password}
            onChange={(e) => handleInputChange(dataUser, setDataUser, e)}
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
