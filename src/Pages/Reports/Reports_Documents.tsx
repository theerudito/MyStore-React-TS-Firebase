import React from "react";
import { ReportHeader } from "./ReportHeader";

export const Reports_Documents = () => {
  return (
    <div className="containerReportDocuments">
      <h1>Reporte de Documentos</h1>
      <ReportHeader />
      <div className="headerTable">
        <ul>
          <li>CLIENTE</li>
          <li>#DOCUMENTO</li>
          <li>FECHA</li>
          <li>TOTAL</li>
          <li>ACTION</li>
        </ul>
      </div>
      <div className="bodyTable">
        <ul>
          <li>JORGE LOOR</li>
          <li>41455445</li>
          <li>14/11/2002</li>
          <li>3000</li>
          <div className="containerAction">
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-trash-can"></i>
          </div>
        </ul>
      </div>
    </div>
  );
};
