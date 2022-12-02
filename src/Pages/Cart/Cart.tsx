import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Burger } from "../../Burger/Burger";

import { Header } from "../../Header/Header";
import {
  cartFirebaseDB,
  clientsFirebaseDB,
  dataBaseCompany,
} from "../../Helpers/firebaseTools";
import { getNumIvaCompany } from "../../Helpers/getDataFactory";
import { getDNIClient } from "../../Helpers/getDataFirebase";
import { DateNowFormat } from "../../Helpers/getDate_Hour";
import { handleInputChange } from "../../Helpers/handleChange";
import { imgStore } from "../../Helpers/imgControls";
import {
  dataClient,
  dataClientFinal,
  dataDocument,
} from "../../Helpers/initial_Values";
import { Waves_Top } from "../../Helpers/Waves";
import { ICart } from "../../interfaces/interfaces";
import { deleteCart, getTotalBuy } from "../../store/slices/cart";
import { searchDNI } from "../../store/slices/clients";
import { Footer } from "../Footer/Footer";

export const Cart = () => {
  const { cart = [], totalBuy } = useSelector((state: any) => state.cart);

  const [client, setClient] = useState(dataClient);
  const [clientFinal, setClientFinal] = useState(dataClientFinal);
  const [ivaCompany, setIvaCompany] = useState(0);
  const [numDocuFac, setNumDocuFac] = useState(0);
  const [dateDocument, setDateDocument] = useState(DateNowFormat);

  const { seachClientDNI } = useSelector((state: any) => state.clients);

  const getCompanyIva = async () => {
    const ivaCompany: any = await getNumIvaCompany();
    setIvaCompany(ivaCompany.iva);
    setNumDocuFac(ivaCompany.numfactura);
  };

  const setDocumentCompany = async () => {
    const Document = doc(dataBaseCompany, "1721457495");
    const numFactura = Number(numDocuFac) + 1;
    await updateDoc(Document, { numfactura: numFactura });
  };

  const generateID = Math.random().toString(20).substr(2, 9);
  const distpach = useDispatch();

  const subtotal = totalBuy / `1.${ivaCompany}`;
  const subtotalRedondeado = Number(subtotal.toFixed(2));
  const total = totalBuy;
  const iva = Math.round((totalBuy - subtotal) * 100) / 100;

  const newDataCart = async (e: any) => {
    e.preventDefault();
    setDocumentCompany();
    try {
      // guardar datos del cliente
      const dataClient = {
        ...client,
        id: generateID,
        dateDoCument: dateDocument,
        numfactura: numDocuFac,
        total: Number(total.toFixed(2)),
        subtotal: subtotalRedondeado,
        iva: iva,
        DataCart: cart,
        typeDocument: "FACTURA",
      };
      // guardar en firebase
      await setDoc(doc(cartFirebaseDB, generateID), dataClient);
      // guardar el cliente en firebase
      if (seachClientDNI === true) {
        await updateDoc(doc(clientsFirebaseDB, client.ci), client);
      } else {
        await setDoc(doc(clientsFirebaseDB, client.ci), client);
      }
      setClient(client);
    } catch (error) {
      console.log(error);
    }
  };

  const getDNI = async (e: any) => {
    e.preventDefault();
    const docRef = getDoc(doc(clientsFirebaseDB, client.ci));
    const docSnap = await docRef;
    const data = getDNIClient(docSnap.data());
    if (docSnap.exists()) {
      console.log("El Cliente ya Existe");
      distpach(searchDNI(true));
      setClient(data);
      distpach(searchDNI(true));
    } else {
      console.log("El Cliente no Existe");
      distpach(searchDNI(false));
      setClient(clientFinal);
    }
  };

  const deleteItem = (item: any) => {
    distpach(deleteCart(item));
  };

  useEffect(() => {
    getCompanyIva();
    distpach(getTotalBuy(cart));
  }, [distpach, cart, ivaCompany]);

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
        {cart.map((item: any) => (
          <ul key={item.id}>
            <li>{item.quantity} </li>
            <li>{item.name} </li>
            <li>{item.price} </li>
            <li>{item.priceTotal.toFixed(2)} </li>
            <i
              className="fa-solid fa-trash-can"
              onClick={() => deleteItem(item.id)}
            ></i>
          </ul>
        ))}
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
                name="ci"
                value={client.ci}
                onChange={(e) => handleInputChange(client, setClient, e)}
              />
              <button onClick={getDNI}>
                <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone"
                className="inputSmall2"
                value={client.phone}
                name="phone"
                onChange={(e) => handleInputChange(client, setClient, e)}
              />
            </div>
          </div>

          <div className="imputLarge">
            <input
              type="text"
              placeholder="First Name"
              className="inputLarge1"
              name="firstName"
              value={client.firstName}
              onChange={(e) => handleInputChange(client, setClient, e)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="inputLarge2"
              name="lastName"
              value={client.lastName}
              onChange={(e) => handleInputChange(client, setClient, e)}
            />
          </div>

          <div className="imputLarge">
            <input
              type="email"
              placeholder="Email"
              className="inputLarge1"
              name="email"
              value={client.email}
              onChange={(e) => handleInputChange(client, setClient, e)}
            />
            <input
              type="text"
              placeholder="Direction"
              className="inputLarge2"
              name="direction"
              value={client.direction}
              onChange={(e) => handleInputChange(client, setClient, e)}
            />
          </div>

          <div className="containerButton">
            <button onClick={newDataCart}>Buy</button>
          </div>
        </form>
        <div className="InforData">
          <div className="containerInforDocu">
            <p>Fecha {dateDocument} </p>
            <input
              type="date"
              className="inputDate"
              name="dateToday"
              value={dateDocument}
              onChange={(e: any) => setDateDocument(e.target.value)}
            />
            <p>Select Document </p>
            <select name="" id="">
              <option value="">Factura</option>
              <option value="">Proforma</option>
            </select>
            <p>#Document {numDocuFac} </p>
            <input
              type="number"
              className="inputDocument"
              name="numeroDocument"
              value={numDocuFac}
              onChange={(e: any) => setNumDocuFac(e.target.value)}
            />
          </div>
          <div className="containerTotal">
            <div className="subtotal12">
              <h6>SubTotal:</h6>
              <p>{subtotal.toFixed(4)} </p>
            </div>
            <div className="subtotal0">
              <h6>Iva 0%: </h6>
              <p>0.00</p>
            </div>

            <div className="iva12">
              <h6>Iva 12%: </h6>
              <p>{iva.toFixed(2)}</p>
            </div>

            <div className="descuento">
              <h6>Desc:</h6>
              <p>0%</p>
            </div>

            <h3>Total: {total.toFixed(2)} </h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
