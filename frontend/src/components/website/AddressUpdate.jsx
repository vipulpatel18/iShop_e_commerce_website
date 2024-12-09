import axios from "axios";
import React, { useContext } from "react";
import { context } from "../../../MainContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Pages/redux/reducers/userSlice";

const AddressUpdate = () => {
  const [searchParam] = useSearchParams();
  const { API_BASE_URL, USER_URL } = useContext(context);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(searchParam.get("ref"));

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      contact: e.target.contact.value,
      addressLine1: e.target.addressLine1.value,
      addressLine2: e.target.addressLine2.value,
      city: e.target.city.value,
      state: e.target.state.value,
      postalCode: e.target.postalCode.value,
      country: e.target.country.value,
    };
    axios
      .post(`${API_BASE_URL}${USER_URL}/add-address/${id}`, data)
      .then((responce) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h2 className="text-xl font-bold mb-4">Add Shipping Address</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="contact"
          className="block text-gray-700 font-medium mb-2"
        >
          Contact
        </label>
        <input
          type="tel"
          id="contact"
          name="contact"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="addressLine1"
          className="block text-gray-700 font-medium mb-2"
        >
          Address Line 1
        </label>
        <input
          type="text"
          id="addressLine1"
          name="addressLine1"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="addressLine2"
          className="block text-gray-700 font-medium mb-2"
        >
          Address Line 2
        </label>
        <input
          type="text"
          id="addressLine2"
          name="addressLine2"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
          State
        </label>
        <input
          type="text"
          id="state"
          name="state"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="postalCode"
          className="block text-gray-700 font-medium mb-2"
        >
          Postal Code
        </label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="country"
          className="block text-gray-700 font-medium mb-2"
        >
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Address
      </button>
    </form>
  );
};

export default AddressUpdate;
