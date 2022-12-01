import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dbFirebase } from "../../firebase/firebase";
import { useModal } from "../../Hook/useModal";
import {
  deleteClient,
  getClients,
  getOneClient,
} from "../../store/slices/clients";
import { ModalCreateClient } from "../Modal/ModalClient";
import { ReportHeader } from "./ReportHeader";

const Reports_Clients = () => {
  const [isOpenMClient, openMClient, closeMClient]: any = useModal();
  const dataFirebase = collection(dbFirebase, "clientsDB");
  const { clients = [] } = useSelector((state: any) => state.clients);
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
    dispath(getClients(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openEditClient = (item: any) => {
    openMClient();
    dispath(getOneClient(item));
    fetchData();
  };

  const deleteClientDB = (item: any) => {
    dispath(deleteClient(item));
    fetchData();
  };

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
        {clients.map((item: any) => (
          <ul key={item.id}>
            <li>{item.id} </li>
            <li>
              {item.firstName} {item.lastName}
            </li>
            <li>{item.direction} </li>
            <li>{item.phone} </li>
            <li>{item.email} </li>
            <div className="containerAction">
              <i
                className="fa-solid fa-eye"
                onClick={() => openEditClient(item)}
              ></i>
              <i
                className="fa-solid fa-trash-can"
                onClick={() => deleteClientDB(item)}
              ></i>
            </div>
          </ul>
        ))}
      </div>

      <ModalCreateClient
        isOpenMClient={isOpenMClient}
        closeMClient={closeMClient}
      />
    </div>
  );
};

export default Reports_Clients;
