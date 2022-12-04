import { getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { products_DB } from "../../Helpers/firebaseTools";
import { getDataFirebase } from "../../Helpers/getDataFirebase";
import { useModal } from "../../Hook/useModal";
import {
  changeImageProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  isEditProduct,
  isSaveProduct,
} from "../../store/slices/products";
import { ModalCreateProduct } from "../Modal/ModalProduct";
import { ReportHeader } from "./ReportHeader";

const Reports_Products = () => {
  const distpatch = useDispatch();

  const { products } = useSelector((state: any) => state.products);
  const [isOpenMProduct, openMProduct, closeMProduct]: any = useModal();

  const fetchData = async () => {
    const data = await getDocs(products_DB)
      .then((querySnapshot) => {
        return getDataFirebase(querySnapshot);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    distpatch(getProducts(data));
  };

  const openEditProduct = (item: any) => {
    openMProduct();
    distpatch(getOneProduct(item));
    distpatch(isSaveProduct(false));
    distpatch(isEditProduct(false));
    distpatch(changeImageProduct(false));
  };

  const deleteProductID = async (item: any) => {
    distpatch(deleteProduct(item));
    fetchData();
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
        isOpenMProduct={isOpenMProduct}
        closeMProduct={closeMProduct}
      />
    </div>
  );
};

export default Reports_Products;
