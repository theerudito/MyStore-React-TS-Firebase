import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dbFirebase } from "../../firebase/firebase";
import { getReportProducts } from "../../store/slices/reports";
import { ReportHeader } from "./ReportHeader";

const Reports_Products = () => {
  const dispath = useDispatch();
  const dataFirebase = collection(dbFirebase, "productsDB");
  const { reportProducts = [] } = useSelector((state: any) => state.reports);


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
    dispath(getReportProducts(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        {reportProducts.map((item: any) => (
          <ul key={item.barcode}>
            <li>{item.barcode} </li>
            <li> {item.stock}</li>
            <li>
              {item.name} {item.brand} {item.description}{" "}
            </li>
            <li>{item.price} </li>
            <li>{item.desc}% </li>
            <div className="containerAction">
              <i className="fa-solid fa-eye"></i>
              <i className="fa-solid fa-trash-can"></i>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Reports_Products;
