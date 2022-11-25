import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Burger } from "../../Burger/Burger";
import { dbFirebase } from "../../firebase/firebase";
import { Header } from "../../Header/Header";
import {
  getNumIvaCompany,
  setNumDocumentCompany,
} from "../../Helpers/getDataFactory";
import { DateNow, HourNow } from "../../Helpers/getDate_Hour";
import { handleInputChange } from "../../Helpers/handleChange";
import { imgStore } from "../../Helpers/imgControls";
import {
  dataClient,
  dataClientFinal,
  dataDocument,
} from "../../Helpers/initial_Values";
import { Waves_Top } from "../../Helpers/Waves";
import { deleteCart, getTotalBuy } from "../../store/slices/cart";
import { Footer } from "../Footer/Footer";

export const Cart = () => {
  const { cart = [], totalBuy } = useSelector((state: any) => state.cart);
  const cartFirebaseBD = collection(dbFirebase, "cartDB");
  const clientFirebaseDB = collection(dbFirebase, "clientsDB");
  const [docuInfor, setDocuInfor] = useState(dataDocument);
  const [clientInfor, setClientInfor] = useState(dataClient);
  const [clientFinal, setClientFinal] = useState(dataClientFinal);
  const [searchClient, setSearchClient] = useState(false);
  const [ivaCompany, setIvaCompany] = useState(0);
  const [numDocu, setNumDocu] = useState(0);

  console.log(numDocu);

  const getCompanyIva = async () => {
    const ivaCompany: any = await getNumIvaCompany();
    setIvaCompany(ivaCompany.iva);
  };

  const setDocumentCompany = async () => {
    await setNumDocumentCompany(docuInfor.numeroDocument);
    
  };

  const generateID = Math.random().toString(20).substr(2, 9);
  const distpach = useDispatch();
  const porsentajeIva = 1.12;

  const subtotal = totalBuy / `1.${ivaCompany}`;
  const total = totalBuy;
  const iva = total - subtotal;

  const getDNI = async (e: any) => {
    e.preventDefault();
    // buscar en la base de datos si existe el cliente
    const docRef = getDoc(doc(clientFirebaseDB, clientInfor.ci));
    const docSnap = await docRef;
    console.log("data", docSnap.data());

    if (docSnap.exists()) {
      console.log("El Cliente ya Existe");
      setClientInfor(docSnap.data());
      setSearchClient(true);
    } else {
      console.log("El Cliente no Existe");
      setSearchClient(false);
      setClientInfor(clientFinal);
    }
  };

  const newClient = async (e: any) => {
    e.preventDefault();
    try {
      if (searchClient === true) {
        await setDoc(doc(cartFirebaseBD), {
          id: generateID,
          registre: { DateNow, HourNow },
          DataCard: cart,
          DataClient: clientInfor,
          DataDocument: docuInfor,
          TotalBuy: { subtotal, total, iva },
        });
      } else {
        await setDoc(doc(clientFirebaseDB, clientInfor.ci), clientInfor);
        await setDoc(doc(cartFirebaseBD), {
          id: generateID,
          registre: { DateNow, HourNow },
          DataCard: cart,
          DataClient: clientInfor,
          DataDocument: docuInfor,
          TotalBuy: { subtotal, total, iva },
        });
      }
    } catch (error) {
      console.log(error);
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
                value={clientInfor.ci}
                onChange={(e) =>
                  handleInputChange(clientInfor, setClientInfor, e)
                }
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
                value={clientInfor.phone}
                name="phone"
                onChange={(e) =>
                  handleInputChange(clientInfor, setClientInfor, e)
                }
              />
            </div>
          </div>

          <div className="imputLarge">
            <input
              type="text"
              placeholder="First Name"
              className="inputLarge1"
              name="firstName"
              value={clientInfor.firstName}
              onChange={(e) =>
                handleInputChange(clientInfor, setClientInfor, e)
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              className="inputLarge2"
              name="lastName"
              value={clientInfor.lastName}
              onChange={(e) =>
                handleInputChange(clientInfor, setClientInfor, e)
              }
            />
          </div>

          <div className="imputLarge">
            <input
              type="email"
              placeholder="Email"
              className="inputLarge1"
              name="email"
              value={clientInfor.email}
              onChange={(e) =>
                handleInputChange(clientInfor, setClientInfor, e)
              }
            />
            <input
              type="text"
              placeholder="Direction"
              className="inputLarge2"
              name="direction"
              value={clientInfor.direction}
              onChange={(e) =>
                handleInputChange(clientInfor, setClientInfor, e)
              }
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
              name="dateDocument"
              value={docuInfor.dateDocument}
              onChange={(e) => handleInputChange(docuInfor, setDocuInfor, e)}
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
              name="numeroDocument"
              onClick={setDocumentCompany}
              value={docuInfor.numeroDocument}
              onChange={(e) => handleInputChange(docuInfor, setDocuInfor, e)}
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
