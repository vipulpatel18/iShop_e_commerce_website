import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const context = createContext();

export default function MainContext(props) {
  const notify = (msg, flag) =>
    toast(msg, { type: flag == true ? "success" : "error" });

  const [category, setCategory] = useState(null);
  const [color, setColor] = useState(null);
  const [products, setProduct] = useState(null);
  const [user, setUser] = useState(null);

  const API_BASE_URL = "http://localhost:5000";
  const CATEGORY_URL = "/category";
  const COLOR_URL = "/color";
  const PRODUCT_URL = "/product";
  const ADMIN_URL = "/admin";
  const USER_URL = "/user";
  const ORDER_URL = "/order";

  const fetchCategory = (id) => {
    let API = API_BASE_URL + CATEGORY_URL;
    if (id != null) {
      API += `/${id}`;
    }

    axios
      .get(API)
      .then((succes) => {
        setCategory(succes.data.category);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchColor = (id) => {
    let API = API_BASE_URL + COLOR_URL;
    if (id != null) {
      API += `/${id}`;
    }

    axios
      .get(API)
      .then((succes) => {
        setColor(succes.data.color);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchProducts = (
    id = null,
    limit = null,
    category_slug = null,
    product_color = null
  ) => {
    let API = API_BASE_URL + PRODUCT_URL;
    if (id != null) {
      API += `/${id}`;
    }

    const query = new URLSearchParams();
    if (limit !== null) query.append("limit", Number(limit));
    if (category_slug) query.append("category_slug", category_slug);
    if (product_color) query.append("product_color", product_color);

    axios
      .get(API + "?" + query)
      .then((succes) => {
        setProduct(succes.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUser = (id) => {
    let API = API_BASE_URL + USER_URL;
    if (id != null) {
      API += `/${id}`;
    }

    axios
      .get(API)
      .then((succes) => {
        setUser(succes.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <context.Provider
      value={{
        fetchCategory,
        category,
        notify,
        API_BASE_URL,
        CATEGORY_URL,
        COLOR_URL,
        fetchColor,
        color,
        fetchProducts,
        PRODUCT_URL,
        products,
        ADMIN_URL,
        USER_URL,
        fetchUser,
        user,
        ORDER_URL,
      }}
    >
      {props.children}
      <ToastContainer />
    </context.Provider>
  );
}

export { context };
