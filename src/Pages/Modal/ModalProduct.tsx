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
import { dbFirebase } from "../../firebase/firebase";
import { handleInputChange } from "../../Helpers/handleChange";
import { imgClient, imgProduct } from "../../Helpers/imgControls";
import { dataProduct } from "../../Helpers/initial_Values";
import {
  changeImageProduct,
  createNewProduct,
  editProduct,
  isEditProduct,
  prewImageProduct,
  searchProductDB,
  uploadImageProduct,
} from "../../store/slices/products";

export const ModalCreateProduct = ({ isOpenMProduct, closeMProduct }: any) => {
  const [product, setproduct] = useState(dataProduct);
  const {
    oneProduct = {},
    updateProduct = false,
    changeImage = false,
    prewImage = null,
    imageUpLoad = null,
  } = useSelector((state: any) => state.products);
  const distpatch = useDispatch();
  const clientFirebaseDB = collection(dbFirebase, "productsDB");

  const createProductFirebase = async (e: any) => {
    e.preventDefault();
    if (imageUpLoad === null) return;
    try {
      distpatch(createNewProduct(product));
      distpatch(isEditProduct(false));
      distpatch(changeImageProduct(false));
      closeMProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const updateProductFirebase = async (e: any) => {
    e.preventDefault();

    try {
      distpatch(editProduct(product));
      // if (imageUpLoad === null) {
      //   updateDoc(doc(productBaseFirebase, product.barcode), {
      //     barcode: product.barcode,
      //     name: product.name,
      //     brand: product.brand,
      //     description: product.description,
      //     desc: product.desc,
      //     price: product.price,
      //     stock: product.stock,
      //     Date: DateNowFormat,
      //   });
      //   closeMProduct();
      // } else {
      //   const imageOld = ref(productImagesBusket, `${oneProduct.refImage}`);
      //   deleteObject(imageOld);
      //   const imageRef = ref(productImagesBusket, `${generateID}`);
      //   uploadBytes(imageRef, imageUpLoad).then((snapshot) => {
      //     console.log("Uploaded complete!");
      //     getDownloadURL(imageRef).then(async (url) => {
      //       console.log(url);
      //       new Promise((resolve, reject) => {
      //         resolve(
      //           setDoc(doc(productBaseFirebase, product.barcode), {
      //             barcode: product.barcode,
      //             name: product.name,
      //             brand: product.brand,
      //             description: product.description,
      //             desc: product.desc,
      //             price: product.price,
      //             stock: product.stock,
      //             refImage: generateID,
      //             image: url,
      //             Date: DateNowFormat,
      //           })
      //         );
      //         closeMProduct();
      //         setChangeImage(false);
      //       });
      //     });
      //   });
      //}
      distpatch(isEditProduct(false));
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
    distpatch(changeImageProduct(false));
    if (oneProduct) {
      setproduct(oneProduct);
      distpatch(prewImageProduct(oneProduct.urlImage));
      distpatch(changeImageProduct(true));
    }
  }, [oneProduct]);

  // PREVIEW IMAGE ============================================================
  const handleChangeImage = (e: any) => {
    const selectedImage = e.target.files[0];
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
        distpatch(uploadImageProduct(selectedImage));
        distpatch(changeImageProduct(true));
        distpatch(prewImageProduct(reader.result));
      };
      reader.readAsDataURL(selectedImage);
    } else {
      alert("file not supported");
    }
  };
  // PREVIEW IMAGE ============================================================

  const changeImageEdit = () => {
    distpatch(changeImageProduct(true));
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
            <img src={changeImage === true ? prewImage : imgProduct} />
            <input
              type="file"
              name="image"
              onChange={handleChangeImage}
              onClick={changeImageEdit}
            />
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
            {updateProduct ? (
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
