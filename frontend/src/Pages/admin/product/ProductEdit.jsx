import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../../../MainContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

export default function ProductEdit() {
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

  const { id } = useParams();

  const Navigate = useNavigate();

  const [sel_color, setSel_color] = useState([]);
  const [sel_category, setSel_category] = useState([]);

  const { notify, API_BASE_URL, PRODUCT_URL, fetchCategory, category, fetchColor, color, products, fetchProducts } = useContext(context);

  useEffect(() => {
    fetchProducts(id);
    fetchColor();
    fetchCategory();
  }, []);

  useEffect(() => {
    if (products) {
      const initialColors = color?.filter(clr => products.colors?.includes(clr._id));
      setSel_color(initialColors?.map(clr => ({ value: clr._id, label: clr.name })));
    }
  }, [products, color]);

  useEffect(() => {
    if (products?.category_id) {
      const matchedCategory = category?.find(cat => cat._id === products.category_id);
      setSel_category(matchedCategory ? { value: matchedCategory._id, label: matchedCategory.name } : null);
    }
  }, [category, products]);

  const calFinalPrice = () => {
    const op = original_price.current.value;
    const dp = discounted_price.current.value;

    const final = op - op * (dp / 100);
    final_price.current.value = final;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(sel_category?.value)

    const formData = new FormData();
    formData.append("name", name.current.value);
    formData.append("slug", slug.current.value);
    formData.append("category_id", sel_category?.value);
    formData.append("colors", JSON.stringify(sel_color.map(color => color.value)));
    formData.append("original_price", original_price.current.value);
    formData.append("discounted_price", discounted_price.current.value);
    formData.append("final_price", final_price.current.value);
    formData.append("long_description", long_description.current.value);
    formData.append("short_description", short_description.current.value);
    formData.append("status", status.current.checked ? 1 : 0);
    formData.append("stock", stock.current.checked ? 1 : 0);
    formData.append("top_selling", top_selling.current.checked ? 1 : 0);
    formData.append("main_image", e.target.product_image.files[0]);

    axios
      .put(API_BASE_URL + PRODUCT_URL + "/update/" + id, formData)
      .then((success) => {
        notify(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          Navigate("/admin/product")
            // console.log(success.data.status)
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
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="/admin"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 "
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Admin
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <Link
                to={"/admin/product"}
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 "
              >
                Product
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                Edit Product
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="max-w-4xl mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Add Product</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                ref={name}
                defaultValue={products?.name}
                placeholder="Enter product name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Slug Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Slug</label>
              <input
                type="text"
                ref={slug}
                defaultValue={products?.slug}
                placeholder="Enter product slug"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Category Select */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <Select
                value={sel_category} // Set selected category here
                onChange={setSel_category} // Update state on change
                options={
                  Array.isArray(category) &&
                  category.map(cat => ({
                    value: cat._id,
                    label: cat.name,
                  }))
                }
                className="shadow outline-none appearance-none border border-gray-300 rounded-lg w-full"
              />
            </div>

            {/* Color Multi-select */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Color</label>
               <Select
              isMulti
              closeMenuOnSelect={false}
              value={sel_color}
              onChange={(selectedOptions) => setSel_color(selectedOptions)}
              options={color?.map(clr => ({ value: clr._id, label: clr.name }))}
              name="colors"
             className="shadow outline-none appearance-none border border-gray-300 rounded-lg w-full"
            />
            </div>

            {/* Original Price Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Original Price</label>
              <input
                type="number"
                ref={original_price}
                onChange={calFinalPrice}
                defaultValue={products?.original_price}
                placeholder="Original Price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Discounted Price Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Discounted Price</label>
              <input
                type="number"
                ref={discounted_price}
                defaultValue={products?.discounted_price}
                placeholder="Add Discount in %"
                onChange={calFinalPrice}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Final Price (Read-only) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Final Price</label>
              <input
                readOnly
                type="number"
                ref={final_price}
                defaultValue={products?.final_price}
                placeholder="Final Price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Long Description Textarea */}
            <div className="mb-4 md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Long Description</label>
              <textarea
                ref={long_description}
                defaultValue={products?.short_description}
                placeholder="Enter long description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Short Description Textarea */}
            <div className="mb-4 md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Short Description</label>
              <textarea
                ref={short_description}
                defaultValue={products?.long_description}
                placeholder="Enter short description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Status Checkbox */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                ref={status}
                defaultChecked={products?.status}
                className="form-checkbox cursor-pointer h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Status</span>
            </div>

            {/* Stock Checkbox */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                ref={stock}
                defaultChecked={products?.stock}
                className="form-checkbox cursor-pointer h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Stock</span>
            </div>

            {/* Top Selling Checkbox */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                ref={top_selling}
                defaultChecked={products?.top_selling}
                className="form-checkbox cursor-pointer h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Top Selling</span>
            </div>
          </div>

          {/* Product Image Upload */}
          <div className="mb-4 mt-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Product Image</label>
            <input
              type="file"
              name="product_image"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <h3 className='mt-4'>current image</h3>
            <img className='w-24' src={API_BASE_URL + "/images/product/" + products?.main_image} alt="current image" />
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
