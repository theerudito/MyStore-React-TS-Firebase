import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouterData } from "../../Routes/Router";
import { useModal } from "../../Hook/useModal";
import { ModalCreateClient, ModalCreateProduct } from "../Modal/Modal";
import {
  imgAvatar,
  imgClient,
  imgProduct,
  imgReports,
  imgStore,
} from "../../Helpers/imgControls";

export const Account = () => {
  const navigate = useNavigate();
  const [isOpenMProduct, openMProduct, closeMProduct]: any = useModal();
  const [isOpenMClient, openMClient, closeMClient]: any = useModal();

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
            <input type="text" id="name" name="empresa" />
            <label htmlFor="name">PROPIETARIO</label>
            <input type="text" id="name" name="propietario" />
            <label htmlFor="name">RUC</label>
            <input type="text" id="name" name="ruc" />
          </div>

          <div className="input2">
            <label htmlFor="name">DIRECCION</label>
            <input type="text" id="name" name="direccion" />

            <label htmlFor="name">IVA</label>
            <input type="text" id="name" name="iva" />

            <label htmlFor="name">MONEDA</label>
            <input type="text" id="name" name="moneda" />
          </div>

          <div className="containerCretendialCreator">
            <div className="containerNameCompany">
              <label htmlFor="name">NAME EMPRESA</label>
              <input type="text" id="name" name="company" />
            </div>

            <div className="containerSelectorDB">
              <p>Selecion El Motor de BDD</p>
              <select name="" id="">
                <option value="">FIREBASE</option>
                <option value="">MYSQL</option>
                <option value="">MONGODB</option>
              </select>
            </div>

            <div className="containerActivator">
              <label htmlFor="name">ACTIVATOR</label>
              <input type="password" id="name" name="codeActivador" />
            </div>
          </div>
          <div className="containerButton">
            <button>GUARDAR CONFIGURACIONES</button>
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
