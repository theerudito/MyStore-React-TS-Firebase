import React, { useEffect, useState } from "react";
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
import { dataConfigStore } from "../../Helpers/initial_Values";
import { doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { ModalCreateProduct } from "../Modal/ModalProduct";
import { ModalCreateClient } from "../Modal/ModalClient";
import { DateNowFormat } from "../../Helpers/getDate_Hour";
import { getDataFirebase } from "../../Helpers/getDataFirebase";
import { getBusiness } from "../../store/slices/account";
import { handleInputChange } from "../../Helpers/handleChange";
import { company_DB, myCompany } from "../../Helpers/firebaseTools";

export const Account = () => {
  const navigate = useNavigate();
  const [isOpenMProduct, openMProduct, closeMProduct]: any = useModal();
  const [isOpenMClient, openMClient, closeMClient]: any = useModal();
  const [store, setStore] = useState(dataConfigStore);
  const data = myCompany === null ? myCompany : `${store.nameDB}DB`;

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

  const createStore = async () => {
    // e.preventDefault();

    const newCompany = {
      nameStore: store.nameStore,
      propetary: store.propetary,
      dni: Number(store.dni),
      direction: store.direction,
      iva: Number(store.iva),
      currency: store.current,
      serie1: Number(store.serie1),
      serie2: Number(store.serie2),
      numfactura: Number(store.numfactura),
      numproforma: Number(store.numproforma),
      numnotadeventa: Number(store.numnotadeventa),
      codeActivator: store.codeActivator,
      date: DateNowFormat,
      nameDB: data,
    };
    const { nameDB, dni } = newCompany;
    localStorage.setItem("nameBusiness", JSON.stringify({ nameDB, dni }));
    try {
      // save data the company in firebase
      await setDoc(doc(company_DB, store.dni), newCompany);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSecuenceDocument = async (e: any) => {
    e.preventDefault();
    try {
      const newSecuence = {
        serie1: Number(store.serie1),
        serie2: Number(store.serie2),
        numfactura: Number(store.numfactura),
        numproforma: Number(store.numproforma),
        numnotadeventa: Number(store.numnotadeventa),
      };
      // update the secuence of the documents in the company
      await updateDoc(doc(company_DB, store.dni), newSecuence);
    } catch (error) {
      console.log(error);
    }
  };

  const getDNI_Company = async (e: any) => {
    e.preventDefault();
    try {
      const data = await getDocs(company_DB)
        .then((querySnapshot) => {
          return getDataFirebase(querySnapshot);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      const [res]: any = data;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const defaultData = {
      dni: 1721457495,
      nameDB: "EruditoDB",
    };
    localStorage.setItem("nameBusiness", JSON.stringify(defaultData));
  }, []);

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
              id="nameStore"
              type="text"
              name="nameStore"
              className="inputNameCompany"
              value={store.nameStore}
              onChange={(e) => handleInputChange(store, setStore, e)}
            />
          </div>

          <div className="contenedorSearch">
            <label htmlFor="" className="labelDNICompany">
              RUC
            </label>

            <input
              id="age"
              name="dni"
              type="number"
              className="inputDNICompany"
              value={store.dni}
              onChange={(e) => handleInputChange(store, setStore, e)}
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
            id="direction"
            className="inputDirectionCompany"
            name="direction"
            value={store.direction}
            onChange={(e) => handleInputChange(store, setStore, e)}
          />
          <label htmlFor="" className="labelOwnerCompany">
            PROPIETARIO
          </label>
          <input
            type="text"
            className="inputOwnerCompany"
            name="propetary"
            id="propetary"
            value={store.propetary}
            onChange={(e) => handleInputChange(store, setStore, e)}
          />
        </div>
        <div className="contaierCompany3">
          <label htmlFor="" className="labelCompany">
            EMPRESA_DB
          </label>
          <input
            type="text"
            className="inputCompany"
            name="nameDB"
            id="nameDB"
            value={store.nameDB}
            onChange={(e) => handleInputChange(store, setStore, e)}
          />
          <label htmlFor="" className="labelIvaCompany">
            IVA
          </label>
          <input
            type="number"
            name="iva"
            className="inputIvaCompany"
            id="iva"
            value={store.iva}
            onChange={(e) => handleInputChange(store, setStore, e)}
          />
          <select
            name="current"
            id="current"
            onChange={(e) => handleInputChange(store, setStore, e)}
          >
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
            id="codeActivator"
            value={store.codeActivator}
            onChange={(e) => handleInputChange(store, setStore, e)}
          />
        </div>
        <div className="contaierCompany4">
          <p>Selecion El Motor de BDD</p>
          <select
            name="dataBase"
            id="dataBase"
            onChange={(e) => handleInputChange(store, setStore, e)}
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
            type="number"
            name="serie1"
            id="serie1"
            className="inputSerie1"
            value={store.serie1}
            onChange={(e) => handleInputChange(store, setStore, e)}
          />
          <label htmlFor="">SERIE#2</label>
          <input
            type="number"
            name="serie2"
            className="inputSerie2"
            id="serie2"
            value={store.serie2}
            onChange={(e) => handleInputChange(store, setStore, e)}
          />
          <label htmlFor="">#FACTURA</label>
          <input
            type="number"
            className="secuenceDocument"
            name="numfactura"
            id="numfactura"
            value={store.numfactura}
            onChange={(e) => handleInputChange(store, setStore, e)}
          />
          <label htmlFor="">#NOTA_VENTA</label>
          <input
            type="number"
            className="secuenceDocument"
            name="numnotadeventa"
            id="numnotadeventa"
            value={store.numnotadeventa}
            onChange={(e) => handleInputChange(store, setStore, e)}
          />
          <label htmlFor="">#PROFORMA</label>
          <input
            type="number"
            className="secuenceDocument"
            name="numproforma"
            id="numproforma"
            value={store.numproforma}
            onChange={(e) => handleInputChange(store, setStore, e)}
          />
          <button onClick={updateSecuenceDocument}>
            <i className="fa-solid fa-floppy-disk"></i>
          </button>
        </div>
        <div className="containerButton">
          <button type="submit" onClick={createStore}>
            GUARDAR CONFIGURACIONES
          </button>
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
