import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { dbFirebase, storageFirebase } from "../../firebase/firebase";
import { DateNowFormat } from "../../Helpers/getDate_Hour";
import { handleInputChange } from "../../Helpers/handleChange";
import { imgProduct } from "../../Helpers/imgControls";
import { dataProduct } from "../../Helpers/initial_Values";
import {
  changeImageProduct,
  editProduct,
  isSaveProduct,
  prewImageProduct,
  searchProductDB,
} from "../../store/slices/products";

export const ModalCreateProduct = ({ isOpenMProduct, closeMProduct }: any) => {
  const [product, setproduct] = useState(dataProduct);

  const productBaseFirebase = collection(dbFirebase, "productsDB");
  const productImagesBusket = ref(storageFirebase, `empresa/`);
  const generateID = Math.random().toString(20).substr(2, 9);

  const [imageUpLoad, setimageUpLoad] = useState(null);
  const [changeImage, setchangeImage] = useState(false);
  const [prewImage, setprewImage] = useState(null);
  const [editImagen, seteditImagen] = useState(false);

  const {
    oneProduct = {},
    updateProduct = false,
    saveProduct = false,
  } = useSelector((state: any) => state.products);

  const distpatch = useDispatch();

  const clientFirebaseDB = collection(dbFirebase, "productsDB");

  const createProductFirebase = async (e: any) => {
    e.preventDefault();
    try {
      const { barcode, name, brand, description, desc, price, stock } = product;

      if (imageUpLoad === null) return;

      const imageRef = ref(productImagesBusket, `${generateID}`);
      // guardar la imagen en el storage
      uploadBytes(imageRef, imageUpLoad).then((snapshot) => {
        console.log("Uploaded complete!");
        getDownloadURL(imageRef).then(async (url) => {
          console.log(url);
          new Promise((resolve, reject) => {
            resolve(
              setDoc(doc(productBaseFirebase, barcode), {
                barcode: barcode,
                name: name,
                brand: brand,
                description: description,
                desc: desc,
                price: price,
                stock: stock,
                refImage: generateID,
                image: url,
                Date: DateNowFormat,
              })
            );
            reject("Error al guardar el producto");
          });
          closeMProduct();
          setproduct(dataProduct);
          setchangeImage(false);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateProductFirebase = async (e: any) => {
    e.preventDefault();
    try {
      distpatch(editProduct(product));
      distpatch(isSaveProduct(false));
      const { barcode, name, brand, description, desc, price, stock } = product;

      // eliminar la imagen anterior
      if (editImagen) {
        const imageRef = ref(productImagesBusket, `${oneProduct.refImage}`);
        deleteDoc(doc(clientFirebaseDB, barcode));
        deleteObject(imageRef);
      }

      // sino se eligio una nueva imagen
      if (imageUpLoad === null) {
        updateDoc(doc(clientFirebaseDB, barcode), {
          barcode: barcode,
          name: name,
          brand: brand,
          description: description,
          desc: desc,
          price: price,
          stock: stock,
          Date: DateNowFormat,
        });
        closeMProduct();
      } else {
        // si se eligio una nueva imagen se guarda en el storage y se actualiza en la base de datos
        const imageRef = ref(productImagesBusket, `${generateID}`);
        uploadBytes(imageRef, imageUpLoad).then((snapshot) => {
          // progeso de la subida de la imagen en el storage

          console.log("Uploaded complete!");
          getDownloadURL(imageRef).then(async (url) => {
            console.log(url);
            new Promise((resolve, reject) => {
              resolve(
                updateDoc(doc(clientFirebaseDB, barcode), {
                  barcode: barcode,
                  name: name,
                  brand: brand,
                  description: description,
                  desc: desc,
                  price: price,
                  stock: stock,
                  refImage: generateID,
                  image: url,
                  Date: DateNowFormat,
                })
              );
              reject("Error al guardar el producto");
            });
            closeMProduct();
            setproduct(dataProduct);
            setchangeImage(false);
          });
        });
      }

      closeMProduct();
      setproduct(dataProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const searchProduct = async (e: any) => {
    e.preventDefault();
    const docRef = getDoc(doc(clientFirebaseDB, product.barcode));
    const docSnap = await docRef;
    if (docSnap.exists()) {
      distpatch(searchProductDB(docSnap.data()));
    } else {
      console.log("No existe");
    }
  };

  useEffect(() => {
    distpatch(isSaveProduct(false));
    if (updateProduct === false) {
      setproduct(oneProduct);
      distpatch(prewImageProduct(oneProduct.image));
      distpatch(isSaveProduct(true));
    }
  }, [oneProduct]);

  // PREVIEW IMAGE ============================================================
  const handleChangeImage = (e: any) => {
    const { files } = e.target;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      // enviar imagen a  redux
      //distpatch(uploadImageProduct(file));
      setimageUpLoad(file);
      // previsualizar imagen
      reader.onload = (e: any) => {
        //distpatch(prewImageProduct(e.target.result));
        setprewImage(e.target.result);
      };
      reader.readAsDataURL(file);
      // cambiar estado de imagen
      //distpatch(changeImageProduct(true));
      setchangeImage(true);
    }

    // const selectedImage = e.target.files && e.target.files[0];
    // if (!selectedImage) {
    //   return;
    // }
    // console.log(selectedImage);
    // const ALLOWED_TYPES = [
    //   "image/png",
    //   "image/jpeg",
    //   "image/jpg",
    //   "image/gif",
    //   "image/svg+xml",
    //   "image/webp",
    // ];
    // if (selectedImage && ALLOWED_TYPES.includes(selectedImage.type)) {
    //   let reader = new FileReader();
    //   reader.onloadend = () => {
    //     distpatch(uploadImageProduct(selectedImage));
    //     distpatch(prewImageProduct(reader.result));
    //     distpatch(changeImageProduct(true));
    //   };
    //   reader.readAsDataURL(selectedImage);
    // } else {
    //   alert("file not supported");
    // }
  };
  // PREVIEW IMAGE ============================================================

  const changeImageEdit = () => {
    console.log("cambiar imagen");
    // si cambia la imagen
    if (changeImage) {
      seteditImagen(true);
    } else {
      seteditImagen(false);
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
            <img src={changeImage ? prewImage : imgProduct} />
            <input
              type="file"
              id="inputImage"
              accept="image/*"
              onChange={handleChangeImage}
              onClick={changeImageEdit}
            />
          </div>
          <div className="containerInputProduct">
            <div className="containerP1">
              <div>
                <label htmlFor="">BarCode</label>
                <input
                  required
                  type="search"
                  name="barcode"
                  value={product.barcode}
                  onChange={(e) => handleInputChange(product, setproduct, e)}
                />
                <button type="submit" onClick={searchProduct}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
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
            {saveProduct === true ? (
              <button className="btn2" onClick={updateProductFirebase}>
                Edit Product
              </button>
            ) : (
              <button className="btn2" onClick={createProductFirebase}>
                Save Product
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </form>
  );
};
