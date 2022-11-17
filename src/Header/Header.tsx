import React, { useState } from "react";
import ImageCart from "../Image/controls/cart.png";
import { RouterData } from "../Routes/Router";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const [goCart, setGoCart] = useState(false);
  const navigate = useNavigate();

  const operCart = () => {
    navigate(RouterData.cart);
  };

  return (
    <div className="containerSearch">
      <div className="Title">
        <h1>My Store</h1>
      </div>

      <p>Search: </p>
      <input type="search" placeholder="Searching" />
      <button>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      <div className="containerShooping" onClick={operCart}>
        <p>0</p>
        <img src={ImageCart} alt="" />
      </div>
    </div>
  );
};
