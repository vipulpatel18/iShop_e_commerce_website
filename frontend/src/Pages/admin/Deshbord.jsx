import React, { useContext, useEffect, useState } from "react";
import { context } from "../../../MainContext";
import axios from "axios";
import { IndCurrency } from "../../Help";

export default function Deshbord() {
  const [order_details, setOrder_details] = useState([]);
  const { API_BASE_URL, ORDER_URL } = useContext(context);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}${ORDER_URL}`)
      .then((response) => {
        setOrder_details(response.data.order);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [API_BASE_URL, ORDER_URL]);
  console.log(order_details);
  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome to the Admin Dashboard
      </h2>
      <p className="text-gray-600 mb-8">
        Select an option from the menu to manage your application.
      </p>

      {/* Total Orders Section */}
      {/* <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Total Orders
        </h3>
        <div className="flex justify-between items-center border-t pt-4">
          <div className="flex-1">
            <span className="block text-sm text-gray-600">Quantity</span>
            <span className="block font-medium text-gray-800">45</span>
          </div>
          <div className="flex-1">
            <span className="block text-sm text-gray-600">Product List</span>
            <span className="block font-medium text-gray-800">15 Items</span>
          </div>
          <div className="flex-1">
            <span className="block text-sm text-gray-600">Final Price</span>
            <span className="block font-medium text-gray-800">$1230</span>
          </div>
        </div>
      </div> */}

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Products</th>
                <th className="py-3 px-6 text-left">Payment</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {order_details?.map((data, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-6 text-left">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {data?.user_id?.full_name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {data?.user_id?.contact}
                      </span>
                      <span className="text-xs text-gray-500">
                        {data?.user_id?.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex flex-col">
                      <span>{data?.shipping_details?.addressLine1}</span>
                      <span>{data?.shipping_details?.addressLine2}</span>
                      <span>{data?.shipping_details?.city}</span>
                      <span>{data?.shipping_details?.postalCode}</span>
                      <span>{data?.shipping_details?.state}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    {data?.product_details?.map((products, i) => (
                      <div key={i}>
                        <span>{products?.product_id?.name}</span>
                        <span>({products?.quantity})</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {IndCurrency(data.order_total)}
                      </span>
                      <span className="text-xs text-gray-500">
                        Payment Method - {!data.payment_mode ? "COD" : "Online"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className="text-sm text-white bg-green-500 rounded-full px-3 py-1">
                      Delivered
                    </span>
                  </td>
                </tr>
              ))}
              {/* Repeat for other orders */}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
