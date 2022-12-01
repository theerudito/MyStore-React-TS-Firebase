import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouterData } from "../../Routes/Router";
import { useModal } from "../../Hook/useModal";
import {
  imgAvatar,
  imgClient,
  imgProduct,
  imgReports,
  imgStore,
} from "../../Helpers/imgControls";
import { credentialStore, dataConfigStore } from "../../Helpers/initial_Values";
import { handleInputChange } from "../../Helpers/handleChange";
import { collection, doc, setDoc } from "firebase/firestore";
import { dbFirebase } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness } from "../../store/slices/account";
import { ModalCreateProduct } from "../Modal/ModalProduct";
import { ModalCreateClient } from "../Modal/ModalClient";
import { DateNowFormat } from "../../Helpers/getDate_Hour";

export const Account = () => {
  const navigate = useNavigate();
  const [isOpenMProduct, openMProduct, closeMProduct]: any = useModal();
  const [isOpenMClient, openMClient, closeMClient]: any = useModal();
  const [dataAccount, setDataAccount] = useState(dataConfigStore);
  const [dataDataBase, setDataDataBase] = useState(credentialStore);
  const nameBusinessDB = `${dataDataBase.nameStore}DB`;
  const distpatch = useDispatch();
  const dataBaseFirebase = collection(dbFirebase, nameBusinessDB);

  const openGOSTORE = () => {
    navigate(RouterData.store);
  };

  const openReport_Products = () => {
    navigate(RouterData.r_Products);
  };

  const openReport_Clients = () => {
    navigate(RouterData.r_Clients);
  };

  const openReport_Documents = () => {
    navigate(RouterData.r_Ducuments);
  };

  const createStore = async (e: any) => {
    e.preventDefault();

    const {
      nameStore,
      propetary,
      dni,
      direction,
      iva,
      coin,
      numfactura,
      numnotadeventa,
      numproforma,
    } = dataAccount;
    const { dataBase, codeActivator } = dataDataBase;

    const newBusiness = {
      propetary,
      nameStore,
      dni,
      direction,
      iva,
      coin,
      nameBusinessDB,
      dataBase,
      numfactura,
      numnotadeventa,
      numproforma,
      codeActivator,
      date: DateNowFormat,
    };
    distpatch(getBusiness(nameBusinessDB));
    localStorage.setItem("nameBusinessDB", nameBusinessDB);

    try {
      await setDoc(doc(dataBaseFirebase, dataAccount.dni), newBusiness);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="containerAccount">
      <div className="containerTitleAccount">
        <h4>Config Account</h4>
      </div>

      <div className="containerData">
        <div className="block1">
          <h5>STORE</h5>
          <img src={imgStore} alt="" />
          <p>Shooping Card</p>
          <button onClick={openGOSTORE}>GO SHOOPING</button>
        </div>
        <div className="block2">
          <h5>DATA USER</h5>
          <img src={imgAvatar} alt="" />
          <p>Jorge Loor</p>
          <p>erudito.tv@gmail.com</p>
          <p>ID 1213</p>
        </div>
        <div className="block3">
          <h5>CREATE PRODUCTS</h5>
          <img src={imgProduct} alt="" />
          <p>create new Product</p>
          <button onClick={openMProduct}>OPEN</button>
        </div>
        <div className="block4">
          <h5>CREATE CLIENTS</h5>
          <img src={imgClient} alt="" />
          <p>create new Clients</p>
          <button onClick={openMClient}>OPEN</button>
        </div>
        <div className="block5">
          <h5>REPORTS</h5>
          <img src={imgReports} alt="" />
          <button onClick={openReport_Products}>REPORT PRODUCTS</button>
          <button onClick={openReport_Clients}>REPORT CLIENTS</button>
          <button onClick={openReport_Documents}>REPORT DOCUMENTS</button>
        </div>
      </div>

      <div className="containerStore">
        <h4>Configuracion Store</h4>
      </div>

      <div className="containerFormConfig">
        <form>
          <div className="input1">
            <label htmlFor="name">NOMBRE EMPRESA</label>
            <input
              type="text"
              name="nameStore"
              value={dataAccount.nameStore}
              onChange={(e) =>
                handleInputChange(dataAccount, setDataAccount, e)
              }
            />
            <label htmlFor="">PROPIETARIO</label>
            <input
              type="text"
              name="propetary"
              value={dataAccount.propetary}
              onChange={(e) =>
                handleInputChange(dataAccount, setDataAccount, e)
              }
            />
            <label htmlFor="">RUC</label>
            <input
              type="text"
              name="dni"
              value={dataAccount.dni}
              onChange={(e) =>
                handleInputChange(dataAccount, setDataAccount, e)
              }
            />
          </div>

          <div className="input2">
            <label htmlFor="">DIRECCION</label>
            <input
              type="text"
              name="direction"
              value={dataAccount.direction}
              onChange={(e) =>
                handleInputChange(dataAccount, setDataAccount, e)
              }
            />

            <label htmlFor="">IVA</label>
            <input
              type="text"
              name="iva"
              value={dataAccount.iva}
              onChange={(e) =>
                handleInputChange(dataAccount, setDataAccount, e)
              }
            />

            <label htmlFor="">MONEDA</label>
            <input
              type="text"
              name="coin"
              value={dataAccount.coin}
              onChange={(e) =>
                handleInputChange(dataAccount, setDataAccount, e)
              }
            />
          </div>

          <div className="containerCretendialCreator">
            <div className="containerNameCompany">
              <label htmlFor="">NAME EMPRESA</label>
              <input
                type="text"
                name="nameStore"
                value={dataDataBase.nameStore}
                onChange={(e) =>
                  handleInputChange(dataDataBase, setDataDataBase, e)
                }
              />
            </div>

            <div className="containerSelectorDB">
              <p>Selecion El Motor de BDD</p>
              <select
                name="dataBase"
                onChange={(e) =>
                  handleInputChange(dataDataBase, setDataDataBase, e)
                }
              >
                <option>FIREBASE</option>
                <option>MYSQL</option>
                <option>MONGODB</option>
              </select>
            </div>

            <div className="containerActivator">
              <label htmlFor="">ACTIVATOR</label>
              <input
                type="password"
                name="codeActivator"
                value={dataDataBase.codeActivator}
                onChange={(e) =>
                  handleInputChange(dataDataBase, setDataDataBase, e)
                }
              />
            </div>
          </div>

          <div className="containerSecuence">
            <h4>#Secuence</h4>
            <label htmlFor="">#FACTURA</label>
            <input
              type="text"
              name="numfactura"
              value={dataAccount.numfactura}
              onChange={(e) =>
                handleInputChange(dataAccount, setDataAccount, e)
              }
            />
            <label htmlFor="">#NOTA DE VENTA</label>
            <input
              type="text"
              name="numnotadeventa"
              value={dataAccount.numnotadeventa}
              onChange={(e) =>
                handleInputChange(dataAccount, setDataAccount, e)
              }
            />
            <label htmlFor="">#PROFORMA</label>
            <input
              type="text"
              name="numproforma"
              value={dataAccount.numproforma}
              onChange={(e) =>
                handleInputChange(dataAccount, setDataAccount, e)
              }
            />
          </div>
          <div className="containerButton">
            <button onClick={createStore}>GUARDAR CONFIGURACIONES</button>
          </div>
        </form>
      </div>

      <div className="containerButtonLogout">
        <button>LOGOUT</button>
      </div>

      <ModalCreateProduct
        isOpenMProduct={isOpenMProduct}
        closeMProduct={closeMProduct}
      />

      <ModalCreateClient
        isOpenMClient={isOpenMClient}
        closeMClient={closeMClient}
      />
    </div>
  );
};
