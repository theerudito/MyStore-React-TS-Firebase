import React from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { PDF_CART_COMPONENT } from "./PDF";
import { imgStore } from "../../Helpers/imgControls";

const PDF_CART = () => {
  return (
    <div className="containerDocument">
      <div className="containerInforCompany">
        <div className="containerCompanyInfor1">
          <div className="containerCompanyInforLogo">
            <img src={imgStore} />
          </div>

          <div className="containerCompanyInforData">
            <h5>BY HERE</h5>
            <div className="box1">
              <span>Direction Matrix:</span>
              <p>Libertad del Toachi Km 8</p>
            </div>

            <div className="box1">
              <span>Direction Sucursal:</span>
              <p>Libertad del Toachi Km 8</p>
            </div>
            <span>OBLIGADO A LLEVAR CONTABILIDAD: SI:</span>
            <p>Agente de Retencion No. 1</p>
          </div>
        </div>

        <div className="containerCompanyInfor2">
          <div className="box1">
            <span>R.U.C:</span>
            <p>1721457495</p>
          </div>
          <h4>FACTURA</h4>
          <div className="box1">
            <span>Nro FACTURA:</span>
            <p>001-001-00000001</p>
          </div>

          <span>NUMERO DE AUTORIZACION:</span>
          <p>4545887887878787875465464654</p>
          <div className="box1">
            <span>FECHA DE AUTORIZACION:</span>
            <p>10/12/2002</p>
          </div>

          <div className="box1">
            <span>AMBIENTE:</span>
            <p>Produccion</p>
          </div>

          <div className="box1">
            <span>EMISION:</span>
            <p>Normal</p>
          </div>

          <div className="box2">
            <span>CLAVE DE ACCESO</span>
            <p>||||||||||||||||||||||||||||||</p>
            <p>4545887887878787875465464654</p>
          </div>
        </div>
      </div>

      <div className="conpanyinfoClient">
        <div className="conpanyinfoClient1">
          <span>Razon Social / Nombres y Apellidos:</span>
          <p>Loor Mantuano Erudito Jorge</p>
          <span>Fecha Emision:</span>
          <p>10/12/2002</p>
        </div>

        <div className="conpanyinfoClient2">
          <span>Identificacion</span>
          <p>1721457498</p>
          <span>Guia de Remision</span>
          <p>Ninguna</p>
        </div>
      </div>

      <div className="contaiderDetails">
        <div className="containerUL1">
          <ul>
            <li>CANT</li>
            <li className="descriptionUl">DESCRIPCION</li>
            <li>P.UNIT</li>
            <li>DESCUENTO</li>
            <li>PRECIO TOTAL</li>
          </ul>
        </div>

        <div className="containerUL2">
          <ul>
            <li className="cantU2">1</li>
            <li className="descriptionU2">Producto 1</li>
            <li className="priceUnitariU2">10.00</li>
            <li className="descUl">0.00</li>
            <li className="priceTotalU2">10.00</li>
          </ul>
        </div>
      </div>

      <div className="containerDetailsData">
        <div className="containerInfoAditional">
          <div>
            <p className="infoAditional">INFORMACION ADICIONAL</p>
            <div className="box2">
              <span>Direction:</span>
              <p>Libertad del Toachi</p>
            </div>
            <div className="box2">
              <span>Telefono:</span>
              <p>0999999999</p>
            </div>
            <div className="box2">
              <span>Email:</span>
              <p>micorreo@gmail.com</p>
            </div>
          </div>
          <div className="containerFormaPago">
            <div>
              <ul>
                <li>FORMA DE PAGO</li>
                <li>FECHA DE PAGO</li>
                <li>TOTAL</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Contado</li>
                <li>10/12/2002</li>
                <li>10.00</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="containerInfoPrices">
          <p>SUBTOTAL 12%:</p>
          <p>SUNTOTAL 0%:</p>
          <p>SUBTOTAL NO IVA:</p>
          <p>DESCUENTO:</p>
          <p>SUBTOTAL SIN INPUESTOS:</p>
          <p>ICE</p>
          <p>IVA 12%</p>
          <p>VALOR TOTAL:</p>
        </div>
      </div>
    </div>
  );
};

export default PDF_CART;
