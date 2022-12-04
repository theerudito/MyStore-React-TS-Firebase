import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clients_DB } from "../../Helpers/firebaseTools";
import { getDNIClient } from "../../Helpers/getDataFirebase";
import { DateNowFormat } from "../../Helpers/getDate_Hour";
import { handleInputChange } from "../../Helpers/handleChange";
import { imgClient, imgProduct } from "../../Helpers/imgControls";
import { dataClient, dataClientFinal } from "../../Helpers/initial_Values";
import { searchDNI } from "../../store/slices/clients";

export const ModalCreateClient = ({ isOpenMClient, closeMClient }: any) => {
  const {
    oneClient = {},
    saveClient = true,
    seachClientDNI,
  } = useSelector((state: any) => state.clients);

  const [client, setClient] = useState(dataClient);
  const [clientFinal, setClientFinal] = useState(dataClientFinal);
  const distpach = useDispatch();

  const createClientFirebase = async (e: any) => {
    e.preventDefault();
    try {
      // create new client
      const { ci, firstName, lastName, phone, direction, city, email } = client;
      const newClient = {
        ci,
        firstName,
        lastName,
        phone,
        direction,
        city,
        email,
        Date: DateNowFormat,
      };

      // save client in firebase
      if (seachClientDNI === true) {
        await updateDoc(doc(clients_DB, newClient.ci), newClient);
      } else {
        await setDoc(doc(clients_DB, newClient.ci), newClient);
      }
      closeMClient();
    } catch (error) {
      console.log(error);
    }
  };

  const updateClientFirebase = async (e: any) => {
    e.preventDefault();
    // edit client in firebase
    await updateDoc(doc(clients_DB, client.ci), client);
    closeMClient();
  };

  const getDNI = async (e: any) => {
    e.preventDefault();
    const docRef = getDoc(doc(clients_DB, client.ci));
    const docSnap = await docRef;
    const data = getDNIClient(docSnap.data());
    if (docSnap.exists()) {
      console.log("El Cliente ya Existe");
      distpach(searchDNI(true));
      setClient(data);
      distpach(searchDNI(true));
    } else {
      console.log("El Cliente no Existe");
      distpach(searchDNI(false));
      setClient(clientFinal);
    }
  };

  useEffect(() => {
    if (oneClient) {
      setClient(oneClient);
    }
  }, [oneClient]);

  return (
    <form>
      <Modal
        show={isOpenMClient}
        onHide={closeMClient}
        className="containerModalClient"
      >
        <Modal.Header closeButton className="titleModalClient">
          <Modal.Title>Create Client</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bodyModalClient">
          <div className="containerImgClient">
            <img src={imgClient} alt="" />
          </div>
          <div className="containerInputClient">
            <div className="containerC1">
              <div>
                <label htmlFor="">CI</label>
                <input
                  type="search"
                  name="ci"
                  value={client.ci}
                  onChange={(e) => handleInputChange(client, setClient, e)}
                />
                <button type="submit" onClick={getDNI}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div>
                <label htmlFor="">Telefono</label>
                <input
                  type="text"
                  name="phone"
                  value={client.phone}
                  onChange={(e) => handleInputChange(client, setClient, e)}
                />
              </div>
            </div>

            <div className="containerC2">
              <div>
                <label htmlFor="">Nombres</label>
                <input
                  type="text"
                  name="firstName"
                  value={client.firstName}
                  onChange={(e) => handleInputChange(client, setClient, e)}
                />
              </div>
              <div>
                <label htmlFor="">Apellidos</label>
                <input
                  type="text"
                  name="lastName"
                  value={client.lastName}
                  onChange={(e) => handleInputChange(client, setClient, e)}
                />
              </div>
            </div>

            <div className="containerC3">
              <label htmlFor="">Direccion</label>
              <input
                type="text"
                name="direction"
                value={client.direction}
                onChange={(e) => handleInputChange(client, setClient, e)}
              />
            </div>

            <div className="containerC4">
              <div>
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  value={client.email}
                  onChange={(e) => handleInputChange(client, setClient, e)}
                />
              </div>
              <div>
                <label htmlFor="">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  value={client.city}
                  onChange={(e) => handleInputChange(client, setClient, e)}
                />
              </div>
            </div>
          </div>
          <div className="footerModalClient">
            <button className="btn1" onClick={closeMClient}>
              Close
            </button>
            {saveClient ? (
              <button
                className="btn2"
                type="submit"
                onClick={createClientFirebase}
              >
                Save Client
              </button>
            ) : (
              <button
                className="btn2"
                type="submit"
                onClick={updateClientFirebase}
              >
                Edit Client
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </form>
  );
};
