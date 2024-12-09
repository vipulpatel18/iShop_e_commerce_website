import axios from "axios";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { context } from "../../../MainContext";
import { useNavigate } from "react-router-dom";

const UpdateAdminProfile = () => {
  const admin = useSelector((state) => state.admin?.data) || {};
  const id = admin?._id;
  const navigate = useNavigate();

  const [name, setName] = useState(admin?.name || "");
  const [email, setEmail] = useState(admin?.email || "");
  const [contact, setContact] = useState(admin?.contact || "");
  const [errors, setErrors] = useState({ email: "", contact: "" });

  const { notify, API_BASE_URL, ADMIN_URL } = useContext(context);

  const fetchAdmin = () => {
    let API = API_BASE_URL + ADMIN_URL;
    if (id != null) {
      API += `/${id}`;
    }
    axios
      .get(API)
      .then((success) => {
        localStorage.setItem("adminData", JSON.stringify(success.data.admin));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validateFields = () => {
    let valid = true;
    const newErrors = { email: "", contact: "" };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    // Contact validation (must be numeric and 10 digits)
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
      newErrors.contact = "Contact must be a 10-digit number.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      notify("Please correct the errors before submitting.", 0);
      return;
    }

    const data = {
      name: name,
      email: email,
      contact: contact,
    };

    axios
      .put(API_BASE_URL + ADMIN_URL + "/update/" + id, data)
      .then((response) => {
        notify(response.data.msg, response.data.status);
        if (response.data.status === 1) {
          e.target.reset();
          fetchAdmin();
        }
      })
      .catch(() => {
        notify("Internal Server Error", 0);
      });
  };

  return (
    <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full mt-1 px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.email
                  ? "focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="contact"
              className="block text-sm font-semibold text-gray-600"
            >
              Contact
            </label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={`w-full mt-1 px-4 py-2 border ${
                errors.contact ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.contact
                  ? "focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              placeholder="Enter your contact number"
              required
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 font-semibold"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAdminProfile;
