import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { context } from "../../../../MainContext";
import Swal from "sweetalert2";
import axios from "axios";
import SwitchButton from "./SwitchButton";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";

export default function View() {
  const { products, fetchProducts, notify, API_BASE_URL, PRODUCT_URL } =
    useContext(context);

  useEffect(() => {
    fetchProducts();
  }, []);

  const productDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this product?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_BASE_URL}${PRODUCT_URL}/delete/${id}`)
          .then((res) => {
            notify(res.data.msg, res.data.status);
            if (res.data.status === 1) {
              fetchProducts();
            }
          })
          .catch(() => {
            notify("Internal Server Error", 0);
          });
      }
    });
  };

  const productStatusUpdate = (id, flag) => {
    axios
      .patch(`${API_BASE_URL}${PRODUCT_URL}/updatestatus/${id}/${flag}`)
      .then((res) => {
        fetchProducts();
        notify(res.data.msg, res.data.status);
      })
      .catch((err) => {
        notify(err.message, 0);
      });
  };

  return (
    <>
      <div className="flex justify-end m-3">
        <Link
          to="/admin/product/add"
          className="rounded-md bg-green-600 py-2 px-4 text-center text-sm text-white shadow-md hover:bg-green-700"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Color
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) &&
              products.map((product, index) => (
                <tr className="border-b" key={index}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>{product.name}</div>
                    <div className="text-gray-500 text-xs">{product.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {product?.category_id?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <img
                      src={`${API_BASE_URL}/images/product/${product.main_image}`}
                      alt={product.name}
                      className="w-14 object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <ul className=" list-inside">
                      {product.colors.map((color, i) => (
                        <li key={i}>{color.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>Original: ${product.original_price}</div>
                    <div>Discounted: {product.discounted_price} %</div>
                    <div>Final: ${product.final_price}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <SwitchButton
                      isOn={product?.status}
                      label={"Status "}
                      productStatusUpdate={productStatusUpdate}
                      id={product._id}
                      flag={1}
                    />
                    <SwitchButton
                      isOn={product?.stock}
                      label={"Stock "}
                      productStatusUpdate={productStatusUpdate}
                      id={product._id}
                      flag={2}
                    />
                    <SwitchButton
                      isOn={product?.top_selling}
                      label={"Top Selling "}
                      productStatusUpdate={productStatusUpdate}
                      id={product._id}
                      flag={3}
                    />
                  </td>
                  <td className="flex gap-2 h-[150px] items-center text-sm">
                    <button
                      type="button"
                      onClick={() => productDelete(product._id)}
                      className="text-white block bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg p-2"
                    >
                      <MdDelete />
                    </button>
                    <Link
                      to={`/admin/product/edit/${product._id}`}
                      className="text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 w-fit"
                    >
                      <FaEdit />
                    </Link>
                    <Link
                      to={`/admin/product/multipal_images/${product._id}`}
                      className="text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 w-fit"
                    >
                      <RiImageAddFill />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
