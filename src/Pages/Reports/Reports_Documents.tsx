import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dbFirebase } from "../../firebase/firebase";
import Calendar from "../../Helpers/Calendar";
import { DateNow } from "../../Helpers/getDate_Hour";
import { getCartInfor } from "../../store/slices/cart";
import { ReportHeader } from "./ReportHeader";

export const Reports_Documents = () => {
  const dispath = useDispatch();
  const dataFirebase = collection(dbFirebase, "cartDB");
  const { cardInfor = [], total } = useSelector((state: any) => state.cart);

  console.log(cardInfor);

  const fetchData = async () => {
    const data = await getDocs(dataFirebase)
      .then((querySnapshot) => {
        const data: any = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data() });
        });
        return data;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    dispath(getCartInfor(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="containerReportDocuments">
      <h1>Reporte de Documentos</h1>

      {/* <div className="containerCalendar">
        <Calendar />
      </div> */}

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
        {cardInfor.map((item: any) => (
          <ul key={item.id}>
            <li>
              {item.DataClient.firstName} {item.DataClient.lastName}{" "}
            </li>
            <li>{item.DataDocument.numDocuFac} </li>
            <li>{item.Date} </li>
            <li>{item.TotalBuy.total.toFixed(2)} </li>
            <div className="containerAction">
              <i className="fa-solid fa-eye"></i>
              <i className="fa-solid fa-trash-can"></i>
            </div>
          </ul>
        ))}
      </div>

      <div>
        <h1>{total} </h1>
      </div>
    </div>
  );
};
