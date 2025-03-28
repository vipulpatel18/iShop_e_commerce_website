import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WebsiteLayout from "./Pages/website/Layout";
import Home from "./Pages/website/Home";
import ProductsStore from "./Pages/website/ProductsStore";
import UpdateUserProfile from "./components/website/UpdateUserProfile";
import AddressUpdate from "./components/website/AddressUpdate";

import AdminLogIn from "./Pages/admin/AdminLogIn";
import UpdateAdminProfile from "./components/admin/UpdateAdminProfile";

import AdminLayout from "./Pages/admin/Layout";
import Deshbord from "./Pages/admin/Deshbord";

import ProductAdd from "./Pages/admin/product/Add";
import ProductView from "./Pages/admin/product/View";
import ProductEdit from "./Pages/admin/product/ProductEdit";
import ProductMultipalImages from "./Pages/admin/product/MultipalImages";

import ColorAdd from "./Pages/admin/color/Add";
import ColorView from "./Pages/admin/color/View";
import ColorEdit from "./Pages/admin/color/ColorEdit";

import CategoryAdd from "./Pages/admin/category/Add";
import CategoryView from "./Pages/admin/category/View";
import CategoryEdit from "./Pages/admin/category/CategoryEdit";

import Cart from "./components/website/Cart";
import Checkout from "./components/website/Checkout";

import UserLogin from "./Pages/website/Login";
import UserRegister from "./Pages/website/Register";
import ThankYouPage from "./components/website/ThankYouPage";
import NotFound from "./Pages/website/Notfound";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WebsiteLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/store/:category_slug?",
          element: <ProductsStore />,
        },
        {
          path: "/user/profileUpdate",
          element: <UpdateUserProfile />,
        },
        {
          path: "/user/addressUpdate/:id?",
          element: <AddressUpdate />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <Deshbord />,
        },
        {
          path: "/admin/product",
          element: <ProductView />,
        },
        {
          path: "/admin/product/add",
          element: <ProductAdd />,
        },
        {
          path: "/admin/product/edit/:id",
          element: <ProductEdit />,
        },
        {
          path: "/admin/product/multipal_images/:id",
          element: <ProductMultipalImages />,
        },
        {
          path: "/admin/color",
          element: <ColorView />,
        },
        {
          path: "/admin/color/add",
          element: <ColorAdd />,
        },
        {
          path: "/admin/color/edit/:id",
          element: <ColorEdit />,
        },
        {
          path: "/admin/category",
          element: <CategoryView />,
        },
        {
          path: "/admin/category/add",
          element: <CategoryAdd />,
        },
        {
          path: "/admin/category/edit/:id",
          element: <CategoryEdit />,
        },
      ],
    },
    {
      path: "/admin/login",
      element: <AdminLogIn />,
    },
    {
      path: "/admin/profileUpdate",
      element: <UpdateAdminProfile />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/thank-you/:order_id?",
      element: <ThankYouPage />,
    },
    {
      path: "/login",
      element: <UserLogin />,
    },
    {
      path: "/register",
      element: <UserRegister />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}
