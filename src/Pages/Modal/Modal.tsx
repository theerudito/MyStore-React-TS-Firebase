import { async } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { dbFirebase, storageFirebase } from "../../firebase/firebase";
import { DateNowFormat } from "../../Helpers/getDate_Hour";
import { handleInputChange } from "../../Helpers/handleChange";
import { imgClient, imgProduct } from "../../Helpers/imgControls";
import { dataClient, dataProduct } from "../../Helpers/initial_Values";

export const ModalCreateProduct = ({ isOpenMProduct, closeMProduct }: any) => {
  const dataBaseFirebase = collection(dbFirebase, "productsDB");

  const [product, setproduct] = useState(dataProduct);

  // CONSTAS UPLOAD IMAGE TO FIREBASE ==========================================
  const [imageUpLoad, setImageUpLoad] = useState(null);
  const bucketFirebase = ref(storageFirebase, `empresa/`);
  const generateID = Math.random().toString(20).substr(2, 9);
  const [changeImage, setChangeImage] = useState(false);
  const [prewImage, setprewImage] = useState(null);
  // CONSTAS UPLOAD IMAGE TO FIREBASE ==========================================

  const newProduct = async (e: any) => {
    e.preventDefault();
    try {
      if (imageUpLoad === null) return;
      const imageRef = ref(bucketFirebase, `${generateID}`);

      uploadBytes(imageRef, imageUpLoad).then((snapshot) => {
        console.log("Uploaded complete!");
        getDownloadURL(imageRef).then(async (url) => {
          console.log(url);
          new Promise((resolve, reject) => {
            resolve(
              setDoc(doc(dataBaseFirebase, product.barcode), {
                barcode: product.barcode,
                name: product.name,
                brand: product.brand,
                description: product.description,
                desc: product.desc,
                price: product.price,
                stock: product.stock,
                refImage: generateID,
                image: url,
                Date: DateNowFormat,
              })
            );
            closeMProduct();
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // PREVIEW IMAGE ============================================================
  const handleChangeImage = (e: any) => {
    const selectedImage = e.target.files[0];
    console.log(selectedImage);
    const ALLOWED_TYPES = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/svg+xml",
      "image/webp",
    ];
    if (selectedImage && ALLOWED_TYPES.includes(selectedImage.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImageUpLoad(selectedImage);
        setChangeImage(true);
        setprewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      alert("file not supported");
    }
  };
  // PREVIEW IMAGE ============================================================

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
            <input type="file" name="image" onChange={handleChangeImage} />
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
  const state: any = useSelector((state: any) => state.account.nameBusiness);
  const dataBaseFirebase = collection(dbFirebase, "clientsDB");
  const [client, setClient] = useState(dataClient);
  const [oneClient, setOneClient] = useState({});
  const distpach = useDispatch();

  const newClient = async (e: any) => {
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

      await setDoc(doc(dataBaseFirebase, client.ci), newClient);
      closeMClient();
    } catch (error) {
      console.log(error);
    }
  };

  const searhClient = async (id: any) => {
    const idClient = id;
    const querySnapshot = await getDocs(dataBaseFirebase);
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
