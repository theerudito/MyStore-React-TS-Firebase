import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../Footer/Footer";
import { Waves_Top } from "../../Helpers/Waves";
import { productArray } from "../../Helpers/initial_Values";
import { Header } from "../../Header/Header";
import { Burger } from "../../Burger/Burger";
import { getProducts } from "../../store/slices/products";
import { dbFirebase } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export const MyStore = () => {
  const dispath = useDispatch();
  const dataFirebase = collection(dbFirebase, "productsDB");
  const { products = [] } = useSelector((state: any) => state.products);

  const arraProducts = () => {
    dispath(getProducts(productArray));
  };

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

    dispath(getProducts(data));
  };

  // GET DATA FROM FIREBASE ====================================================

  const getAllProduct = () => {
    if (products) {
      fetchData();
    } else {
      arraProducts();
    }
  };

  useEffect(() => {
    getAllProduct();
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
                <button className="btn1">Add to Cart</button>
                <button className="btn2">Show Product</button>
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
