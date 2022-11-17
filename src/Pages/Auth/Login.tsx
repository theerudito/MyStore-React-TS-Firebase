import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { authFirebase } from "../../firebase/firebase";
import { dataLogin, dataRegister } from "../../Helpers/initial_Values";
import { useNavigate } from "react-router-dom";
import { Waves_Top } from "../../Helpers/Waves";

export const Login = ({ changeAuth, setchangeAuth }: any) => {
  const [dataUser, setDataUser] = useState(dataLogin);

  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  const userLogin = async (e: any) => {
    // logic to register with firebase
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        authFirebase,
        dataUser.email,
        dataUser.password
      );

      if (userCredential) {
        navigate("/account");
      } else {
        alert("Error");
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goRegister = () => {
    setchangeAuth(!changeAuth);
  };

  return (
    <div className="containerFormularioAuth">
      <Waves_Top />
      <div className="containerLogin">
        <form className="formLogin" onSubmit={userLogin}>
          <p className="TitleForm">Login</p>

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
            <button className="btn1Auth">Login</button>

            <button className="btn2Auth" onClick={goRegister}>
              Go To Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
