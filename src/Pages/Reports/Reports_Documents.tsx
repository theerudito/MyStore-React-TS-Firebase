import { getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_DB } from "../../Helpers/firebaseTools";

import { getDataFirebase } from "../../Helpers/getDataFirebase";
import { getCartInfor } from "../../store/slices/cart";
import { ReportHeader } from "./ReportHeader";

export const Reports_Documents = () => {
  const dispath = useDispatch();
  const { cardInfor = [], total } = useSelector((state: any) => state.cart);

  const fetchData = async () => {
    const data = await getDocs(cart_DB)
      .then((querySnapshot) => {
        return getDataFirebase(querySnapshot);
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
              {item.firstName} {item.lastName}{" "}
            </li>
            <li>
              {item.serie1}-{item.serie2}-{item.numfactura}
            </li>
            <li>{item.dateDocument} </li>
            <li>{item.total.toFixed(2)} </li>
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
