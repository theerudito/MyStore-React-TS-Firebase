import { async } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { dbFirebase } from "../../firebase/firebase";
import { handleInputChange } from "../../Helpers/handleChange";
import { imgClient, imgProduct } from "../../Helpers/imgControls";
import { dataClient, dataProduct } from "../../Helpers/initial_Values";

export const ModalCreateProduct = ({ isOpenMProduct, closeMProduct }: any) => {
  const dataFirebase = collection(dbFirebase, "newProduct");
  const [product, setproduct] = useState(dataProduct);

  const newProduct = async (e: any) => {
    e.preventDefault();
    try {
      // create new client
      await setDoc(doc(dataFirebase), product);
      closeMProduct();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form>
      <Modal
        show={isOpenMProduct}
        onHide={closeMProduct}
        className="containerModalProduct"
      >
        <Modal.Header className="titleModalProduct" closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bodyModalProduct">
          <div className="containerImgProduct">
            <img src={imgProduct} alt="" />
            <input type="file" name="image" />
          </div>
          <div className="containerInputProduct">
            <div className="containerP1">
              <div>
                <label htmlFor="">BarCode</label>
                <input
                  type="search"
                  name="barcode"
                  value={product.barcode}
                  onChange={(e) => handleInputChange(product, setproduct, e)}
                />
              </div>

              <div>
                <label htmlFor="">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={(e) => handleInputChange(product, setproduct, e)}
                />
              </div>
            </div>

            <div className="containerP2">
              <div>
                <label htmlFor="">Marca</label>
                <input
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={(e) => handleInputChange(product, setproduct, e)}
                />
              </div>
              <div>
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  name="description"
                  value={product.description}
                  onChange={(e) => handleInputChange(product, setproduct, e)}
                />
              </div>
            </div>

            <div className="containerP3">
              <div>
                <label htmlFor="">Stock</label>
                <input
                  type="text"
                  name="stock"
                  value={product.stock}
                  onChange={(e) => handleInputChange(product, setproduct, e)}
                />
              </div>

              <div>
                <label htmlFor="">Precio</label>
                <input
                  type="text"
                  name="price"
                  value={product.price}
                  onChange={(e) => handleInputChange(product, setproduct, e)}
                />
              </div>

              <div>
                <label htmlFor="">Descuento</label>
                <input
                  type="text"
                  name="desc"
                  value={product.desc}
                  onChange={(e) => handleInputChange(product, setproduct, e)}
                />
              </div>
            </div>
          </div>
          <div className="footerModalProduct">
            <button className="btn1" onClick={closeMProduct}>
              Close
            </button>
            <button className="btn2" onClick={newProduct}>
              Save Changes
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </form>
  );
};

export const ModalCreateClient = ({ isOpenMClient, closeMClient }: any) => {
  const dataFirebase = collection(dbFirebase, "newClient");
  const [client, setClient] = useState(dataClient);
  const [oneClient, setOneClient] = useState({});

  const newClient = async (e: any) => {
    e.preventDefault();
    try {
      // create new client
      await setDoc(doc(dataFirebase, client.ci), client);
      closeMClient();
    } catch (error) {
      console.log(error);
    }
  };

  const searhClient = async (id: any) => {
    const idClient = id;
    const querySnapshot = await getDocs(dataFirebase);
    querySnapshot.forEach((doc) => {
      if (doc.id === idClient) {
        console.log(doc.data());
        // llenar los datos del formulario
        setOneClient(doc.data());
      } else {
        console.log("no existe");
      }
    });
  };

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
                <button type="submit" onClick={() => searhClient(client.ci)}>
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
            <button className="btn2" type="submit" onClick={newClient}>
              Save Changes
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </form>
  );
};
