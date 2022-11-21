import { collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Burger } from "../../Burger/Burger";
import { dbFirebase } from "../../firebase/firebase";
import { Header } from "../../Header/Header";
import { handleInputChange } from "../../Helpers/handleChange";
import { imgStore } from "../../Helpers/imgControls";
import { dataCart } from "../../Helpers/initial_Values";
import { Waves_Top } from "../../Helpers/Waves";
import { Footer } from "../Footer/Footer";

export const Cart = () => {
  const state: any = useSelector((state: any) => state.account.nameBusiness);
  const dataBaseFirebase = collection(dbFirebase, "cartDB");
  const [cart, setCart] = useState(dataCart);
  const distpach = useDispatch();
  const a: any = 1;

  const newClient = async (e: any) => {
    e.preventDefault();
    try {
      // create new factura
      await setDoc(doc(dataBaseFirebase, cart.document), { cart, a });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="containerCart">
      <Waves_Top />
      <Burger />
      <Header />
      <div className="containerContols">
        <ul>
          <li>Cant </li>
          <li>Description </li>
          <li>P_Unitary</li>
          <li>P_Total</li>
          <li>Action </li>
        </ul>
      </div>
      <div className="containerBody">
        <ul>
          <li>2 </li>
          <li>Coca Cola 3 Litros </li>
          <li>0.50</li>
          <li>1.00</li>
          <i className="fa-solid fa-trash-can"></i>
        </ul>
      </div>

      <div className="containerForm">
        <div className="containerImage">
          <img src={imgStore} alt="" />
        </div>

        <form>
          <div className="imputSmall">
            <div className="containerIdClient">
              <input
                type="search"
                placeholder="CI"
                className="inputSmall1"
                name="id"
                value={cart.id}
                onChange={(e) => handleInputChange(cart, setCart, e)}
              />
              <button>
                <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone"
                className="inputSmall2"
                value={cart.phone}
                name="phone"
                onChange={(e) => handleInputChange(cart, setCart, e)}
              />
            </div>
          </div>

          <div className="imputLarge">
            <input
              type="text"
              placeholder="First Name"
              className="inputLarge1"
              name="firstName"
              value={cart.firstName}
              onChange={(e) => handleInputChange(cart, setCart, e)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="inputLarge2"
              name="lastName"
              value={cart.lastName}
              onChange={(e) => handleInputChange(cart, setCart, e)}
            />
          </div>

          <div className="imputLarge">
            <input
              type="email"
              placeholder="Email"
              className="inputLarge1"
              name="email"
              value={cart.email}
              onChange={(e) => handleInputChange(cart, setCart, e)}
            />
            <input
              type="text"
              placeholder="Direction"
              className="inputLarge2"
              name="direction"
              value={cart.direction}
              onChange={(e) => handleInputChange(cart, setCart, e)}
            />
          </div>

          <div className="containerButton">
            <button onClick={newClient}>Buy</button>
          </div>
        </form>
        <div className="InforData">
          <div className="containerInforDocu">
            <p>Fecha</p>
            <input
              type="date"
              className="inputDate"
              name="date"
              value={cart.date}
              onChange={(e) => handleInputChange(cart, setCart, e)}
            />
            <p>Select Document </p>
            <select name="" id="">
              <option value="">Factura</option>
              <option value="">Proforma</option>
            </select>
            <p>#Document</p>
            <input
              type="number"
              className="inputDocument"
              name="document"
              value={cart.document}
              onChange={(e) => handleInputChange(cart, setCart, e)}
            />
          </div>
          <div className="containerTotal">
            <div className="subtotal12">
              <h6>SubTotal 12%:</h6>
              <p>0.88</p>
            </div>
            <div className="subtotal0">
              <h6>SubTotal 0%:</h6>
              <p>0.00</p>
            </div>

            <div className="iva12">
              <h6>Iva 12%:</h6>
              <p>0.12</p>
            </div>

            <div className="descuento">
              <h6>Desc:</h6>
              <p>0%</p>
            </div>

            <h3>Total: 1.00</h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
