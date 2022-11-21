import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dbFirebase } from "../../firebase/firebase";
import { getCart } from "../../store/slices/cart";
import { ReportHeader } from "./ReportHeader";

export const Reports_Documents = () => {
  const dispath = useDispatch();
  const dataFirebase = collection(dbFirebase, "cartDB");
  const { card=[], total } = useSelector((state: any) => state.card);

  const fetchData = async () => {
    const data = await getDocs(dataFirebase)
      .then((querySnapshot) => {
        const data: any = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        return data;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    dispath(getCart(data));
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
        {card.map((item: any) => (
          <ul key={item.id}>
            <li>
              {item.firstName} {item.lastName}{" "}
            </li>
            <li>{item.document} </li>
            <li>{item.date} </li>
            <li>3000</li>
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
