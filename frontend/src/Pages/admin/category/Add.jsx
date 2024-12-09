import axios from "axios";
import React, { useContext, useRef } from "react";
import { context } from "../../../../MainContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Add() {
  const categoryName = useRef();
  const categorySlug = useRef();

  const { notify, API_BASE_URL, CATEGORY_URL } = useContext(context);

  const token = useSelector(state => state.admin.token);
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const formdata = new FormData();
    formdata.append("name", categoryName.current.value);
    formdata.append("slug", categorySlug.current.value);
    formdata.append("img_name", e.target.category_image.files[0])


    axios.post(API_BASE_URL + CATEGORY_URL + "/create", 
      formdata,
      {
        headers:{
          Authorization: token
        }
      }
    ).then(
      (succes) => {
        notify(succes.data.msg, succes.data.status)
        if (succes.data.status == 1) {
          e.target.reset()
        }

      }


    ).catch(
      (error) => {
        notify("Internal Server Error", 0)
      }
    )

  }

  function createSlug() {
    const slug = categoryName.current.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+|-+$/g, '')
    categorySlug.current.value = slug;

  }


  return (
    <>
      <nav className="flex ml-5 mt-3" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to={"/admin"}
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
            </Link>
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
                to={"/admin/category"}
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 "
              >
                Category
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
                Add
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="max-w-md mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-semibold mb-6">Add Category</h2>

          {/* Name Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              onChange={createSlug}
              ref={categoryName}
              placeholder="Enter category name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Slug Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="slug"
            >
              Slug
            </label>
            <input
              type="text"
              readOnly
              id="categorySlug"
              ref={categorySlug}
              placeholder="Enter category slug"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Image Upload Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Category Image
            </label>
            <input
              type="file"
              name="category_image"
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
