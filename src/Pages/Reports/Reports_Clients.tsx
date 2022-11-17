import React from "react";
import { ReportHeader } from "./ReportHeader";

const Reports_Clients = () => {
  return (
    <div className="containerReportClients">
      <h1>Reporte de Clientes</h1>
      <ReportHeader />
      <div className="headerTable">
        <ul>
          <li>CODIGO</li>
          <li>DESCRIPTION</li>
          <li>CIUDAD</li>
          <li>PHONE</li>
          <li>EMAIl</li>
          <li>ACTION</li>
        </ul>
      </div>
      <div className="bodyTable">
        <ul>
          <li>1</li>
          <li>JORGE LOOR</li>
          <li>SANTO DOMINGO</li>
          <li>0999999</li>
          <li>email@gmail.com</li>
          <div className="containerAction">
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-trash-can"></i>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Reports_Clients;
