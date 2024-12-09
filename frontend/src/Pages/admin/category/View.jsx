import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { context } from "../../../../MainContext";
import Swal from 'sweetalert2';
import axios from "axios";

export default function View() {
  const { category, fetchCategory , notify, API_BASE_URL, CATEGORY_URL } = useContext(context);

 

  useEffect(() => {
    fetchCategory();
  }, []);




  const categoryStatusUpdate = (id) => {
    axios
      .patch(`${API_BASE_URL}${CATEGORY_URL}/updatestatus/${id}`)
      .then((res) => {
        fetchCategory();
        // console.log(res);
        notify(res.data.msg, res.data.status);
      })
      .catch((err) => {
        // console.log(err);
        notify(err.message, 0);
      });
  };


  const categoryDelete = (id) => {
    Swal.fire({
      title: "Are you sure for Category delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });

        axios.delete(API_BASE_URL + CATEGORY_URL + `/delete/${id}`).then(
          (res) => {
            notify(res.data.msg, res.data.status)
            console.log(res.data.status)
            if (res.data.status == 1) {
              fetchCategory()
            }

          }
        ).catch(
          (error) => {
            notify("Internal Server Error", 0)
          }
        )



      }
    });

  }

  
  return (
    <>
    <div className="flex justify-end m-3">
    <Link to={"/admin/category/add"}
        className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        type="button"
      >
        Add Category
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
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Img
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Disable Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Delete Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Edit Category
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(category) &&
            category.map((data, index) => (
              <tr className="border-b" key={index}>
                <td className="px-6 py-4 text-sm text-gray-900">{data.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{data.slug}</td>

                <td className="px-6 w-36 py-4 text-sm text-gray-900">
                <img src={API_BASE_URL + "/images/category/" + data.img_name} alt="" />
                </td>

                <td className={`px-6 py-4 text-sm`}>
                  {data.status ? (
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={()=>{categoryStatusUpdate(data._id)}}
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={()=>{categoryStatusUpdate(data._id)}}
                    >
                      Active
                    </button>
                  )}
                </td>
                <td className={`px-6 py-4 text-sm`}>
                  <button
                    type="button"
                    onClick={()=>{categoryDelete(data._id)}}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </td>
                <td className={`px-6 py-4 text-sm`}>
                  <Link
                    to={`/admin/category/edit/${data._id}`}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Edit
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

