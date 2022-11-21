import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dbFirebase } from "../../firebase/firebase";
import { getReportClients } from "../../store/slices/reports";
import { ReportHeader } from "./ReportHeader";

const Reports_Clients = () => {
  const dataFirebase = collection(dbFirebase, "clientsDB");
  const { reportClients = [] } = useSelector((state: any) => state.reports);
  const dispath = useDispatch();

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
    dispath(getReportClients(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="containerReportClients">
      <h1>Reporte de Clientes</h1>
      <ReportHeader />
      <div className="headerTable">
        <ul>
          <li>CODIGO</li>
          <li>DESCRIPTION</li>
          <li>DIRECTION</li>
          <li>PHONE</li>
          <li>EMAIl</li>
          <li>ACTION</li>
        </ul>
      </div>
      <div className="bodyTable">
        {reportClients.map((item: any) => (
          <ul key={item.id}>
            <li>{item.id} </li>
            <li>
              {item.firstName} {item.lastName}
            </li>
            <li>{item.direction} </li>
            <li>{item.phone} </li>
            <li>{item.email} </li>
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

export default Reports_Clients;
