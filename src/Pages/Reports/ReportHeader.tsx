import React from "react";
import { imgPDF, imgPrinter, imgStore } from "../../Helpers/imgControls";

export const ReportHeader = () => {
  return (
    <div className="containerHeaderReport">
      <div className="containerLogo">
        <img src={imgStore} alt="" />
        <img src={imgPrinter} alt="" />
        <img src={imgPDF} alt="" />
      </div>
      <div className="containerSearching">
        <input type="search" placeholder="Searching" />
        <button>BUSCAR</button>
      </div>
      <div className="containerDate">
        <p>DESDE</p>
        <input type="date" />

        <p>HASTA</p>
        <input type="date" />

        <button>GENERAR</button>
      </div>
    </div>
  );
};
