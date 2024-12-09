import React, { useEffect, useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaCaretDown } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Pages/redux/reducers/userSlice";
import UserProfile from "./UserProfile";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="max-w-[1200px] m-auto">
      {isProfileOpen && (
        <div
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          // bg-black bg-opacity-30 backdrop-blur-sm
          className="fixed inset-0 z-30 cursor-pointer"
        ></div>
      )}
      <div
        className={`fixed inset-0 z-40 bg-transparent bg-opacity-50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div className="bg-transparent md:hidden shadow-xl">
        <div className="flex items-center justify-between m-auto mt-2 lg:container px-4 py-2">
          {/* Left Side: Language and Currency Selectors */}

          {/* Logo */}
          <div className="text-2xl font-bold text-red-600">
            <img
              src="img/iSHOP Logo.png"
              className="m-auto md:hidden"
              alt="Logo"
            />
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center">
            <FaBars
              className="text-2xl cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu (Slide In from Left) */}

      <div
        className={`fixed md:hidden w-full inset-y-0 left-0 z-50 backdrop-blur-md bg-gradient-to-b from-white/70 to-gray-200/50 shadow-lg transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center px-6 pt-4 pb-3">
          <FaTimes
            className="text-3xl cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-bold text-sm">EN</span>
            <FaCaretDown className="cursor-pointer" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4">
          <div className="relative">
            <input
              type="text"
              className="w-full py-2 px-4 rounded-full bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none"
              placeholder="Search"
            />
            <FaSearch className="absolute top-3 right-4 text-gray-500" />
          </div>
        </div>

        {/* Mobile Menu Links */}
        <nav className="space-y-6 px-6 py-4 text-center">
          <Link to="/" className="block text-gray-800 font-semibold text-lg">
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="w-full text-gray-800 font-semibold text-lg flex items-center justify-center">
              Store
              <FaCaretDown className="ml-2" />
            </button>
            {isDropdownOpen && (
              <div className="mt-2 space-y-2 bg-gray-100 rounded-md p-4 shadow-lg">
                <Link to="/" className="block text-gray-600">
                  AirPort & Wireless
                </Link>
                <Link to="/" className="block text-gray-600">
                  AppleCare
                </Link>
                <Link to="/" className="block text-gray-600">
                  Bags, Shells & Sleeves
                </Link>
                {/* Add more submenu items as needed */}
              </div>
            )}
          </div>
          <Link to="/" className="block text-gray-800 font-semibold text-lg">
            iPhone
          </Link>
          <Link to="/" className="block text-gray-800 font-semibold text-lg">
            iPad
          </Link>
          <Link to="/" className="block text-gray-800 font-semibold text-lg">
            MacBook
          </Link>
          <Link to="/" className="block text-gray-800 font-semibold text-lg">
            Accessories
          </Link>
        </nav>
      </div>

      <div className="bg-white hidden md:block">
        <div className="flex items-center justify-between m-auto mt-2 lg:container px-4 py-2">
          {/* Left Side: Text Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Link to={"/"} className="text-red-500 font-medium">
                IShop
              </Link>
            </div>
          </div>

          {/* Right Side: Profile, Cart, and Search */}
          <div className="flex items-center space-x-6 gap-6">
            <div className="flex gap-5">
              {/* Login / Logout */}
              {user ? (
                <div
                  onClick={() => {
                    dispatch(logout());
                  }}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <CiLogout className="text-xl" />
                  <span className="text-gray-700 text-sm font-bold">
                    Logout
                  </span>
                </div>
              ) : (
                <Link
                  to={"/login"}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <LuLogIn className="text-xl" />
                  <span className="text-gray-700 text-sm font-bold">Login</span>
                </Link>
              )}

              {/* Profile */}
              {user ? (
                <div className="reletive">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={toggleProfileMenu}
                  >
                    <RiAccountCircleLine className="text-xl" />
                    <span className="text-gray-700 text-sm font-bold">
                      My profile
                    </span>
                  </div>
                  {isProfileOpen && (
                    <>
                      <div className="absolute right-5 top-7 z-40 mt-5 bg-white text-black rounded-lg shadow-lg p-2">
                        <UserProfile setIsProfileOpen={setIsProfileOpen} />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                ""
              )}

              {/* Cart */}
              <Link to={"/cart"} className="relative cursor-pointer">
                <IoBagHandleOutline className="text-xl" />

                <span className="absolute top-[-4px] right-[-6px] bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                  {cart?.items?.length}
                </span>
              </Link>
            </div>

            {/* Search Icon */}
            {/* <div className="cursor-pointer">
              <FaSearch />
            </div> */}
          </div>
        </div>
      </div>

      <nav className="bg-white hidden md:block">
        <div className="lg:container mx-auto py-2 pt-9">
          <div className="text-2xl font-bold mt-3 text-red-600 w-full">
            <img src="img/iSHOP Logo.png" className="m-auto" alt="" />
          </div>
          <div className="flex justify-center mt-3 items-center w-full ">
            {/* Logo */}

            {/* Navigation Links */}
            <div className="flex space-x-12">
              <Link to="/" className="hover:text-gray-700">
                Home
              </Link>
              <div
                className="relative pb-6"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link to="/store" className="hover:text-gray-700">
                  Store
                </Link>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute z-20 left-[-330px] pb-5 w-[960px] top-full text-justify bg-white shadow-lg rounded-lg text-sm">
                    <div className="p-6 grid grid-cols-5 gap-5">
                      {/* First Column */}
                      <div className="col-span-2">
                        <h4 className="font-semibold text-[#C1C8CE] text-lg">
                          Accessories
                        </h4>
                        <div className="flex gap-16">
                          <ul className="mt-4 space-y-4 text-gray-600">
                            <li>
                              <Link to="/" className=" hover:text-gray-900">
                                AirPort & Wireless
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className=" hover:text-gray-900">
                                AppleCare
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className=" hover:text-gray-900">
                                Bags, Shells & Sleeves
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className=" hover:text-gray-900">
                                Business & Security
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className=" hover:text-gray-900">
                                Cables & Docks
                              </Link>
                            </li>
                          </ul>
                          <ul className="mt-4 space-y-4 text-gray-600">
                            <li>
                              <Link to="/" className=" hover:text-gray-900">
                                Cameras & Video
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className=" hover:text-gray-900">
                                Car & Travel
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className=" hover:text-gray-900">
                                Cases & Films
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Second Column */}
                      <div className="col-span-2">
                        <h4 className="font-semibold text-[#C1C8CE] text-lg">
                          Category
                        </h4>
                        <div className="flex gap-16">
                          <ul className="mt-4 space-y-4 text-gray-600">
                            <li>
                              <Link to="/" className="hover:text-gray-900">
                                Charging Devices
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="hover:text-gray-900">
                                Connected Home
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="hover:text-gray-900">
                                Device Care
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="hover:text-gray-900">
                                Display & Graphic
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="hover:text-gray-900">
                                Fitness & Sport
                              </Link>
                            </li>
                          </ul>
                          <ul className="mt-4 space-y-4 text-gray-600">
                            <li>
                              <Link to="/" className="hover:text-gray-900">
                                Headphones
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="hover:text-gray-900">
                                HealhKit
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Third Column */}
                      <div>
                        <h4 className="font-semibold text-[#C1C8CE] text-lg">
                          Category
                        </h4>
                        <ul className="mt-4 space-y-4 text-gray-600">
                          <li>
                            <Link to="/" className="hover:text-gray-900">
                              Mice & Keyboards
                            </Link>
                          </li>
                          <li>
                            <Link to="/" className="hover:text-gray-900">
                              Music Creation
                            </Link>
                          </li>
                          <li>
                            <Link to="/" className="hover:text-gray-900">
                              Networking & Server
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link to="/" className="hover:text-gray-700">
                iPhone
              </Link>
              <Link to="/" className="hover:text-gray-700">
                iPad
              </Link>
              <Link to="/" className="hover:text-gray-700">
                MacBook
              </Link>
              <Link to="/" className="hover:text-gray-700">
                Accessories
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
