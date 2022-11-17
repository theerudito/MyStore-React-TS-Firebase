import React from "react";

import { Link } from "react-router-dom";
import { RouterData } from "../Routes/Router";
import { imgStore } from "../Helpers/imgControls";

export const Burger = () => {
  return (
    <div className="containerBurger">
      <ul className="ulMenu">
        <Link className="Link" to={RouterData.home}>
          <img src={imgStore} alt="" />
        </Link>

        <li>
          <Link className="Link" to={RouterData.index}>
            PRODUCT 1
          </Link>
        </li>
        <li>PRODUCT 2</li>
        <li>PRODUCT 3</li>
        <li>PRODUCT 4</li>
        <li>PRODUCT 5</li>
        <li>PRODUCT 6</li>
        <li>PRODUCT 7</li>
        <li>
          <Link className="Link" to={RouterData.account}>
            ACCOUNT
          </Link>
        </li>
      </ul>
    </div>
  );
};
