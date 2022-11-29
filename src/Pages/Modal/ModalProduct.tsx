import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { dbFirebase, storageFirebase } from "../../firebase/firebase";
import { DateNowFormat } from "../../Helpers/getDate_Hour";
import { handleInputChange } from "../../Helpers/handleChange";
import { imgClient, imgProduct } from "../../Helpers/imgControls";
import {
  dataClient,
  dataClientFinal,
  dataProduct,
} from "../../Helpers/initial_Values";

export const ModalCreateProduct = ({
  isOpenMProduct,
  closeMProduct,
  editProduct,
}: any) => {
  const productBaseFirebase = collection(dbFirebase, "productsDB");
  const [product, setproduct] = useState(dataProduct);

  console.log(editProduct);

  useEffect(() => {
    if (editProduct) {
      setproduct(editProduct);
    }
  }, [editProduct]);

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
              setDoc(doc(productBaseFirebase, product.barcode), {
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
