import React, { useState } from "react";
import AdminProfile from "./AdminProfile";
import { useSelector } from "react-redux";



const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const admin = useSelector((state) => state.admin?.data);


  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {isProfileOpen && (
        <div
          onClick={toggleProfileMenu}
          className="absolute z-10 top-0 left-0 w-full h-screen backdrop-blur-sm cursor-pointer"
        ></div>
      )}
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="relative">
        <button
          className="bg-gray-500 p-2 rounded-full"
          onClick={toggleProfileMenu}
        >
          <div className="text-white w-10 h-10 flex justify-center items-center">
            <span className="text-3xl text-black font-bold">{admin?.name.charAt(0)}</span>
          </div>
        </button>
        {isProfileOpen && (
          <>
            <div className="absolute right-0 z-20 mt-5 bg-white text-black rounded-lg shadow-lg p-2">
              <AdminProfile />
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
