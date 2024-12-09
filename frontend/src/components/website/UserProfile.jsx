import React, { useContext, useEffect } from "react";
import { MdBrowserUpdated } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../../../MainContext";
import { logout } from "../../Pages/redux/reducers/adminSlice";
import Swal from "sweetalert2";

export default function UserProfile({ setIsDropdownOpen }) {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { notify } = useContext(context);

  const user = useSelector((state) => state.user?.data);

  return (
    <div className="relative overflow-hidden">
      {/* <div className="w-[1400px] h-screen bg-red-400 absolute top-0 right-0 z-0"></div> */}
      <div className="w-80 bg-gray-900 text-white rounded-lg p-6 shadow-lg z-10">
        <div className="flex flex-col items-center">
          <div className="text-black bg-gray-500 rounded-full w-12 h-12 shadow-2xl flex justify-center items-center">
            <span className="text-3xl font-bold">
              {user?.full_name.charAt(0)}
            </span>
          </div>
          <div className="mt-3 text-sm text-gray-300">{user?.email}</div>
          <h2 className="mt-1 text-xl font-semibold">Hi, {user?.full_name}!</h2>
        </div>

        <div className=" mt-6">
          <Link
            to={"/user/profileUpdate"}
            className="flex w-full mb-6 items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
          >
            <span className="text-lg">
              <MdBrowserUpdated />
            </span>
            <span className="text-sm">Update Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
