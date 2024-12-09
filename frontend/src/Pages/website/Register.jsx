import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { context } from "../../../MainContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducers/userSlice";

export default function Register() {
  const { API_BASE_URL, USER_URL, notify } = useContext(context);
  const [searchParam] = useSearchParams();

  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelSubmit = (e) => {
    e.preventDefault();
    const data = {
      full_name: e.target.full_name.value,
      email: e.target.email.value,
      contact: e.target.contact.value,
      password: e.target.password.value,
      confirm_password: e.target.confirm_password.value,
    };

    axios
      .post(`${API_BASE_URL}${USER_URL}/register`, data)
      .then((responce) => {
        notify(responce.data.msg, responce.data.status);
        if (responce.data.status == 1) {
          // console.log(responce.data);
          dispatch(
            login({
              data: responce.data.user,
              token: responce.data.token,
            })
          );
          if (searchParam.get("ref") == "checkout") {
            navigate("/checkout");
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handelSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Contact
                </label>
                <input
                  type="contact"
                  name="contact"
                  id="contact"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "password" : "text"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                  {showPassword ? (
                    <FaEye
                      onClick={() => setShowPassword(false)}
                      className="text-2xl text-gray-600 absolute right-2 top-[10px] cursor-pointer"
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={() => setShowPassword(true)}
                      className="text-2xl text-gray-600 absolute right-2 top-[10px] cursor-pointer"
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type={showPassword ? "password" : "text"}
                  name="confirm_password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500">
                    I accept the{" "}
                    <a
                      className="font-medium text-blue-600 hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
