import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateNow, DateNowFormat } from "../../Helpers/getDate_Hour";
import { imgPDF, imgPrinter, imgStore } from "../../Helpers/imgControls";

export const ReportHeader = () => {
  const [startDate1, setStartDate1] = useState(DateNowFormat);
  const [startDate2, setStartDate2] = useState(DateNowFormat)



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
        <input
          type="date"
          onChange={(e) => setStartDate1(e.target.value)}
          value={startDate1}
        />
        <p>HASTA</p>
        <input
          type="date"
          onChange={(e) => setStartDate2(e.target.value)}
          value={startDate2}
        />
        <button>GENERAR</button>
      </div>
    </div>
  );
};
