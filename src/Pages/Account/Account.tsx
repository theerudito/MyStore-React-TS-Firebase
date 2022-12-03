import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouterData } from "../../Routes/Router";
import { useModal } from "../../Hook/useModal";
import { useDispatch, useSelector } from "react-redux";
import {
  imgAvatar,
  imgClient,
  imgProduct,
  imgReports,
  imgStore,
} from "../../Helpers/imgControls";
import { credentialStore, dataConfigStore } from "../../Helpers/initial_Values";
import { handleInputChange } from "../../Helpers/handleChange";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { ModalCreateProduct } from "../Modal/ModalProduct";
import { ModalCreateClient } from "../Modal/ModalClient";
import { DateNowFormat } from "../../Helpers/getDate_Hour";
import {
  clientsFirebaseDB,
  dataBaseCompany,
} from "../../Helpers/firebaseTools";
import { getDNICompany } from "../../Helpers/getDataFirebase";
import { searchDNI } from "../../store/slices/clients";

export const Account = () => {
  const navigate = useNavigate();
  const [isOpenMProduct, openMProduct, closeMProduct]: any = useModal();
  const [isOpenMClient, openMClient, closeMClient]: any = useModal();
  const [dataAccount, setDataAccount] = useState(dataConfigStore);
  const [dataDataBase, setDataDataBase] = useState(credentialStore);
  const nameBusinessDB = `${dataDataBase.nameStore}DB`;
  const distpach = useDispatch();

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

    const newCompany = {
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

    try {
      await setDoc(doc(dataBaseCompany, newCompany.dni), newCompany);
    } catch (error) {
      console.log(error);
    }
  };

  const getDNI_Company = async (e: any) => {
    e.preventDefault();
    const docRef = getDoc(doc(clientsFirebaseDB, dataAccount.dni));
    const docSnap = await docRef;
    const data = getDNICompany(docSnap.data());
    if (docSnap.exists()) {
      console.log("El Cliente ya Existe");
      distpach(searchDNI(true));
      setDataAccount(data);
      setDataDataBase(data);
      distpach(searchDNI(true));
    } else {
      console.log("El Cliente no Existe");
      distpach(searchDNI(false));
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
        <div className="contaierCompany1">
          <div className="input1Company">
            <label htmlFor="name" className="labelNameCompany">
              NOMBRE EMPRESA
            </label>
            <input
              type="text"
              name="nameStore"
              className="inputNameCompany"
              value={dataAccount.nameStore}
              onChange={(e) =>
                handleInputChange(dataAccount, setDataAccount, e)
              }
            />
          </div>

          <div className="contenedorSearch">
            <label htmlFor="" className="labelDNICompany">
              RUC
            </label>
            <input
              type="search"
              name="dni"
              className="inputDNICompany"
              value={dataAccount.dni}
              onChange={(e) =>
                handleInputChange(dataAccount, setDataAccount, e)
              }
            />
            <button onClick={getDNI_Company}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <div className="contaierCompany2">
          <label htmlFor="" className="labelDirectionCompany">
            DIRECCION
          </label>
          <input
            type="text"
            className="inputDirectionCompany"
            name="direction"
            value={dataAccount.direction}
            onChange={(e) => handleInputChange(dataAccount, setDataAccount, e)}
          />
          <label htmlFor="" className="labelOwnerCompany">
            PROPIETARIO
          </label>
          <input
            type="text"
            className="inputOwnerCompany"
            name="propetary"
            value={dataAccount.propetary}
            onChange={(e) => handleInputChange(dataAccount, setDataAccount, e)}
          />
        </div>
        <div className="contaierCompany3">
          <label htmlFor="" className="labelCompany">
            EMPRESA_DB
          </label>
          <input
            type="text"
            className="inputCompany"
            name="nameStore"
            value={dataDataBase.nameStore}
            onChange={(e) =>
              handleInputChange(dataDataBase, setDataDataBase, e)
            }
          />
          <label htmlFor="" className="labelIvaCompany">
            IVA
          </label>
          <input
            type="text"
            name="iva"
            className="inputIvaCompany"
            value={dataAccount.iva}
            onChange={(e) => handleInputChange(dataAccount, setDataAccount, e)}
          />

          <select name="durrent">
            <option>Dollar USD</option>
            <option>Peso CO</option>
            <option>EURO EU</option>
          </select>

          <label htmlFor="" className="labelActivatorCompany">
            ACTIVATOR
          </label>
          <input
            type="password"
            className="inputActivatorCompany"
            name="codeActivator"
            value={dataDataBase.codeActivator}
            onChange={(e) =>
              handleInputChange(dataDataBase, setDataDataBase, e)
            }
          />
        </div>
        <div className="contaierCompany4">
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
        <div className="containerSecuence">
          <h4>Config Secuence</h4>
        </div>

        <div className="contaierCompany5">
          <label htmlFor="">SERIE#1</label>
          <input
            type="text"
            name="serie1"
            className="inputSerie1"
            value={dataAccount.numfactura}
            onChange={(e) => handleInputChange(dataAccount, setDataAccount, e)}
          />
          <label htmlFor="">SERIE#2</label>
          <input
            type="text"
            name="serie2"
            className="inputSerie2"
            value={dataAccount.numfactura}
            onChange={(e) => handleInputChange(dataAccount, setDataAccount, e)}
          />
          <label htmlFor="">#FACTURA</label>
          <input
            type="text"
            className="secuenceDocument"
            name="numfactura"
            value={dataAccount.numfactura}
            onChange={(e) => handleInputChange(dataAccount, setDataAccount, e)}
          />
          <label htmlFor="">#NOTA_VENTA</label>
          <input
            type="text"
            className="secuenceDocument"
            name="numnotadeventa"
            value={dataAccount.numnotadeventa}
            onChange={(e) => handleInputChange(dataAccount, setDataAccount, e)}
          />
          <label htmlFor="">#PROFORMA</label>
          <input
            type="text"
            className="secuenceDocument"
            name="numproforma"
            value={dataAccount.numproforma}
            onChange={(e) => handleInputChange(dataAccount, setDataAccount, e)}
          />
          <button>
            <i className="fa-solid fa-floppy-disk"></i>
          </button>
        </div>
        <div className="containerButton">
          <button onClick={createStore}>GUARDAR CONFIGURACIONES</button>
        </div>
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
