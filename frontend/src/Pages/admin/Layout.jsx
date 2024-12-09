import React from "react";
import Header from "../../components/admin/Header";
import SideMenu from "../../components/admin/SideMenu";
import Footer from "../../components/admin/Footer";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <div className="grid grid-cols-5">
        <SideMenu />
        <div className="col-span-4">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}
