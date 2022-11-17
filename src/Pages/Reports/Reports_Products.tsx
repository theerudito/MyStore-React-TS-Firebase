import React from "react";
import { imgProduct } from "../../Helpers/imgControls";
import { ReportHeader } from "./ReportHeader";

const Reports_Products = () => {
  return (
    <div className="containerReportProduct">
      <h1>Reporte de Productos</h1>

      <ReportHeader />

      <div className="headerTable">
        <ul>
          <li>CODIGO</li>
          <li>CANTIDAD</li>
          <li>DESCRIPTION</li>
          <li>V_UNITARY</li>
          <li>DESCUENTO</li>
          <li>ACTION</li>
        </ul>
      </div>
      <div className="bodyTable">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>Bebida Fanta 065 GR</li>
          <li>1.50</li>
          <li>0%</li>
          <div className="containerAction">
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-trash-can"></i>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Reports_Products;
