import React, { useRef, useContext, useEffect } from "react";
import axios from "axios";
import { context } from "../../../../MainContext";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ColorEdit() {
  const { id } = useParams();

  const colorName = useRef();
  const colorCode = useRef();

  const navigate = useNavigate;

  const { color, fetchColor, notify, API_BASE_URL, COLOR_URL } =
    useContext(context);

  useEffect(() => {
    fetchColor(id);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: colorName.current.value,
      colorCode: colorCode.current.value,
    };

    axios
      .put(API_BASE_URL + COLOR_URL + "/update/" + id, data)
      .then((response) => {
        notify(response.data.msg, response.data.status);
        if (response.data.status === 1) {
            // navigate("/admin/color")
            e.target.reset();
        }
      })
      .catch(() => {
        notify("Internal Server Error", 0);
      });
  };

  // console.log(color?.colorCode)

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
                to={"/admin/color"}
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 "
              >
                Color
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
                Edit Color
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Form for Adding Color */}
      <div className="max-w-md mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-semibold mb-6">Edit Color</h2>

          {/* Color Name Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="colorName"
            >
              Color Name
            </label>
            <input
              type="text"
              id="colorName"
              ref={colorName}
              defaultValue={color?.name}
              placeholder="Enter color name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Color Hex Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="colorHex"
            >
              ColorCode
            </label>
            <input
             defaultValue={color?.colorCode}
              type="color"
              id="colorHex"
              ref={colorCode}
              className="shadow h appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit Color
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
