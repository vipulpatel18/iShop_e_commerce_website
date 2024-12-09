import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../../../MainContext";
import { Link } from "react-router-dom";
import Select from "react-select";

export default function Add() {
  const name = useRef();
  const slug = useRef();
  const category_id = useRef();
  const original_price = useRef();
  const discounted_price = useRef();
  const final_price = useRef();
  const long_description = useRef();
  const short_description = useRef();
  const status = useRef();
  const stock = useRef();
  const top_selling = useRef();

  const [sel_color, setSel_color] = useState([]);

  const {
    notify,
    API_BASE_URL,
    PRODUCT_URL,
    fetchCategory,
    category,
    fetchColor,
    color,
  } = useContext(context);

  useEffect(() => {
    fetchColor();
    fetchCategory();
  }, []);

  const calFinalPrice = () => {
    const op = original_price.current.value;
    const dp = discounted_price.current.value;

    const final = op - op * (dp / 100);
    final_price.current.value = final;
  };

  function createSlug() {
    const Newslug = name.current.value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+|-+$/g, "");
    slug.current.value = Newslug;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name.current.value);
    formData.append("slug", slug.current.value);
    formData.append("category_id", e.target.category.value);
    formData.append(
      "colors",
      JSON.stringify(sel_color.map((color) => color.value))
    );
    formData.append("original_price", Math.round(original_price.current.value));
    formData.append("discounted_price", discounted_price.current.value);
    formData.append("final_price", Math.round(final_price.current.value));
    formData.append("long_description", long_description.current.value);
    formData.append("short_description", short_description.current.value);
    formData.append("status", status.current.checked ? 1 : 0);
    formData.append("stock", stock.current.checked ? 1 : 0);
    formData.append("top_selling", top_selling.current.checked ? 1 : 0);
    formData.append("main_image", e.target.product_image.files[0]);

    axios
      .post(API_BASE_URL + PRODUCT_URL + "/create", formData)
      .then((success) => {
        notify(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          e.target.reset();
        }
      })
      .catch(() => {
        notify("Internal Server Error", 0);
      });
  };

  return (
    <>
      <nav className="flex ml-5 mt-3" aria-label="Breadcrumb">
        {/* Breadcrumb navigation here */}
      </nav>

      <div className="max-w-4xl mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Add Product
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                onChange={createSlug}
                ref={name}
                placeholder="Enter product name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Slug Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Slug
              </label>
              <input
                type="text"
                readOnly
                ref={slug}
                placeholder="Enter product slug"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Category Select */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <Select
                ref={category_id}
                options={
                  Array.isArray(category) &&
                  category.map((category) => ({
                    value: category._id,
                    label: category.name,
                  }))
                }
                name="category"
                className="shadow outline-none appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-300 hover:bg-gray-100 transition duration-150 ease-in-out"
              />
            </div>

            {/* Color Multi-select */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Color
              </label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                options={
                  Array.isArray(color) &&
                  color.map((color) => ({
                    value: color._id,
                    label: color.name,
                  }))
                }
                onChange={(selectedOptions) => setSel_color(selectedOptions)}
                name="category_id"
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-300 hover:bg-gray-100 transition duration-150 ease-in-out"
              />
            </div>

            {/* Original Price Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Original Price
              </label>
              <input
                type="number"
                ref={original_price}
                onChange={calFinalPrice}
                placeholder="Original Price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Discounted Price Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Discounted Price
              </label>
              <input
                type="number"
                ref={discounted_price}
                placeholder="Add Discount in %"
                onChange={calFinalPrice}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Final Price (Read-only) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Final Price
              </label>
              <input
                readOnly
                type="number"
                ref={final_price}
                placeholder="Final Price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Long Description Textarea */}
            <div className="mb-4 md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Long Description
              </label>
              <textarea
                ref={long_description}
                placeholder="Enter long description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Short Description Textarea */}
            <div className="mb-4 md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Short Description
              </label>
              <textarea
                ref={short_description}
                placeholder="Enter short description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Status Checkbox */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                ref={status}
                className="form-checkbox cursor-pointer h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Status</span>
            </div>

            {/* Stock Checkbox */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                ref={stock}
                className="form-checkbox cursor-pointer h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Stock</span>
            </div>

            {/* Top Selling Checkbox */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                ref={top_selling}
                className="form-checkbox cursor-pointer h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Top Selling</span>
            </div>
          </div>

          {/* Product Image Upload */}
          <div className="mb-4 mt-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Image
            </label>
            <input
              type="file"
              name="product_image"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
