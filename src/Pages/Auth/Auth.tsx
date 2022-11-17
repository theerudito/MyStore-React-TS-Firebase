import React, { useState } from "react";
import { Register } from "./Register";
import { Login } from "./Login";

export const Auth = () => {
  const [changeAuth, setchangeAuth] = useState<any>(true);

  return (
    <>
      {changeAuth ? (
        <Register changeAuth={changeAuth} setchangeAuth={setchangeAuth} />
      ) : (
        <Login changeAuth={changeAuth} setchangeAuth={setchangeAuth} />
      )}
    </>
  );
};
