import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dbFirebase, storageFirebase } from "../../firebase/firebase";
import { useModal } from "../../Hook/useModal";
import {
  deleteProduct,
  getOneProduct,
  getProducts,
} from "../../store/slices/products";
import { ModalCreateProduct } from "../Modal/ModalProduct";
import { ReportHeader } from "./ReportHeader";

const Reports_Products = () => {
  const dispath = useDispatch();
  const productBaseFirebase = collection(dbFirebase, "productsDB");
  const { products } = useSelector((state: any) => state.products);
  const [isOpenMProduct, openMProduct, closeMProduct]: any = useModal();
  const [product, setProduct] = useState({});

  const fetchData = async () => {
    const data = await getDocs(productBaseFirebase)
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
    dispath(getProducts(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openEditProduct = (item: any) => {
    dispath(getOneProduct(item));
    openMProduct();
  };

  const deleteProductID = async (item: any) => {
    dispath(deleteProduct(item));
    fetchData();
  };

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
        {products.map((item: any) => (
          <ul key={item.barcode}>
            <li>{item.barcode} </li>
            <li> {item.stock}</li>
            <li>
              {item.name} {item.brand} {item.description}{" "}
            </li>
            <li>{item.price} </li>
            <li>{item.desc}% </li>
            <div className="containerAction">
              <i
                className="fa-solid fa-eye"
                onClick={() => openEditProduct(item)}
              ></i>
              <i
                className="fa-solid fa-trash-can"
                onClick={() => deleteProductID(item)}
              ></i>
            </div>
          </ul>
        ))}
      </div>
      <ModalCreateProduct
        editProduct={product}
        isOpenMProduct={isOpenMProduct}
        closeMProduct={closeMProduct}
      />
    </div>
  );
};

export default Reports_Products;
