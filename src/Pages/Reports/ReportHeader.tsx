import React from "react";
import { useNavigate } from "react-router-dom";
import { imgPDF, imgPrinter, imgStore } from "../../Helpers/imgControls";

export const ReportHeader = () => {
  const navigate = useNavigate();
  const goStore = () => {
    navigate("/store");
  };
  return (
    <div className="containerHeaderReport">
      <div className="containerLogo">
        <img src={imgStore} alt="" onClick={goStore} />
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
