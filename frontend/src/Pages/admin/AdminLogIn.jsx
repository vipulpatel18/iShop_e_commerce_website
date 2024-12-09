import React, { useContext, useState } from "react";
import { context } from "../../../MainContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/reducers/adminSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";



export default function AdminLogIn() {
  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const { notify, API_BASE_URL, ADMIN_URL } = useContext(context);

  const [showPassword, setShowPassword] = useState(true)


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.email.value) {
      notify("Please Enter Email", 0);
    } else {
      if (!e.target.password.value) {
        notify("Please Enter Password", 0);
      } else {
        const data = {
          email: e.target.email.value,
          password: e.target.password.value,
        };

        axios
          .post(API_BASE_URL + ADMIN_URL + "/login", data)
          .then((responce) => {
            notify(responce.data.msg, responce.data.status);
            if (responce.data.status == 1) {
              dispatch(login({
                data : responce.data.admin,
                token : responce.data.token
              }))
              Navigate("/admin")
              e.target.reset();
            }
          })
          .catch((error) => {
            notify("Internal Server Error", 0);
          });
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto shadow-lg border border-gray-300 p-8 bg-white rounded-2xl"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Admin Login
        </h2>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            defaultValue={"vipul@gmail.com"}
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 transition duration-200 ease-in-out"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Password
          </label>
         <div className="relative">
         <input
            type={showPassword ? "password" : "text"}
            defaultValue={'123456'}
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
            placeholder="Enter your password"
          />
          {
            showPassword ?
            <FaEye onClick={()=>setShowPassword(false)} className="text-2xl text-gray-600 absolute right-2 top-[10px] cursor-pointer" />
            :
            <FaEyeSlash onClick={()=>setShowPassword(true)} className="text-2xl text-gray-600 absolute right-2 top-[10px] cursor-pointer" />
            }
         </div>
        </div>

        <div className="flex items-center mb-6">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500"
          />
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 transition duration-200 ease-in-out"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
