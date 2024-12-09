import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Pages/redux/reducers/adminSlice";

export default function SideMenu() {
  const admin = useSelector((state) => state.admin?.data);
  const Navigete = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const lsAdmin = localStorage.getItem("adminData");

    if (admin == null && lsAdmin == undefined) {
      Navigete("/admin/login");
    }
  }, [admin]);

  return (
    <aside className=" h-screen sticky top-0 bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold">Admin Menu</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <Link to={"/admin"} className="block hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to={"/admin/category"} className="block hover:text-gray-300">
              Category
            </Link>
          </li>
          <li>
            <Link to={"/admin/product"} className="block hover:text-gray-300">
              Product
            </Link>
          </li>
          <li>
            <Link to={"/admin/color"} className="block hover:text-gray-300">
              Color
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
