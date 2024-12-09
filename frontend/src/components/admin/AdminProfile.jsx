import React, { useContext, useEffect } from "react";
import { MdBrowserUpdated } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../../../MainContext";
import { logout } from "../../Pages/redux/reducers/adminSlice";
import Swal from 'sweetalert2';


export default function AdminProfile() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { notify } = useContext(context);

  const admin = useSelector((state) => state.admin?.data);


  const logOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You have no longer access on Admin Page.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, LogOut!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          logout()
        );
        Navigate("/admin/login");
        notify("LogOut Successfully", 1);
      }
    });
  };

  return (
    <div className="w-80 bg-gray-900 text-white rounded-lg p-6 shadow-lg">
      <div className="flex flex-col items-center">
        <div className="text-black bg-gray-500 rounded-full w-12 h-12 shadow-2xl flex justify-center items-center">
        <span className="text-3xl font-bold">{admin?.name.charAt(0)}</span>
        </div>
        <div className="mt-3 text-sm text-gray-300">
        {admin?.email}
        </div>
        <h2 className="mt-1 text-xl font-semibold">Hi, {admin?.name}!</h2>
      </div>

      <div className=" mt-6">
        <Link to={"/admin/profileUpdate"} className="flex w-full mb-6 items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg">
          <span className="text-lg">
            <MdBrowserUpdated />
          </span>
          <span className="text-sm">Update Profile</span>
        </Link>

        <button
          onClick={logOut}
          className="flex w-full items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
        >
          <span className="text-lg">
            <CiLogout />
          </span>
          <span className="text-sm">Log out</span>
        </button>
      </div>
    </div>
  );
}
