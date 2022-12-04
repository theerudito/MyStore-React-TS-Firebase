import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../Footer/Footer";
import { Waves_Top } from "../../Helpers/Waves";
import { Header } from "../../Header/Header";
import { Burger } from "../../Burger/Burger";
import { getProducts } from "../../store/slices/products";
import { getDocs } from "firebase/firestore";
import { getCart } from "../../store/slices/cart";
import { getDataFirebase } from "../../Helpers/getDataFirebase";
import { products_DB } from "../../Helpers/firebaseTools";

export const MyStore = () => {
  const dispath = useDispatch();

  const { products = [] } = useSelector((state: any) => state.products);

  const fetchData = async () => {
    // enviar la referencia de la coleccion
    const data = await getDocs(products_DB)
      .then((querySnapshot) => {
        return getDataFirebase(querySnapshot);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    dispath(getProducts(data));
  };

  // GET DATA FROM FIREBASE ====================================================

  const addToCart = (item: any) => {
    dispath(getCart(item));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="containerMyStore">
      <Waves_Top />

      <Burger />

      <Header />

      <div className="containerCard">
        {products.map((item: any) => {
          return (
            <div className="bodyCard" key={item.id}>
              <div className="containerimg">
                <img src={item.image} alt="" />
              </div>

              <div className="containerInfor">
                <p>Product: {item.name} </p>
                <p>Brand: {item.brand} </p>
                <p>Description: {item.description} </p>
                <div className="containerprice">
                  <p>Price: {item.price} </p> <p>Desc: {item.desc}% </p>
                </div>
              </div>

              <div className="containerButtonStore">
                <button className="btn1" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
                {/* <button className="btn2">Show Product</button> */}
              </div>
            </div>
          );
        })}
      </div>

      <div className="containerPagination">
        <i className="fa-solid fa-circle-left"></i>
        <p>10 de 100 pag 100</p>
        <i className="fa-solid fa-circle-right"></i>
      </div>

      <div className="containerFooter">
        <Footer />
      </div>
    </div>
  );
};
