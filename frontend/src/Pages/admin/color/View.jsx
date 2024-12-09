import React, { useContext, useEffect } from "react";
import { context } from "../../../../MainContext";
import Swal from 'sweetalert2';
import axios from "axios";
import { Link } from "react-router-dom";


export default function View() {
  const { color, fetchColor, notify, API_BASE_URL, COLOR_URL } = useContext(context);

  useEffect(() => {
    fetchColor();
  }, []);



  const colorStatusUpdate = (id) => {
    axios.patch(`${API_BASE_URL}${COLOR_URL}/updatestatus/${id}`)
      .then(res => {
        fetchColor();
        notify(res.data.msg, res.data.status);
      })
      .catch(err => notify(err.message, 0));
  };

  const deleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_BASE_URL}${COLOR_URL}/delete/${id}`)
          .then(res => {
            fetchColor();
            notify(res.data.msg, res.data.status);
          })
          .catch(err => notify(err.message, 0));
      }
    });
  };

  return (
    <>
     <div className="flex justify-end m-3">
    <Link to={"/admin/color/add"}
        className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        type="button"
      >
        Add Color
      </Link>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Color</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Edit</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(color) && color.map((data, index) => (
            <tr className="border-b" key={index}>
              <td className="px-6 py-4 text-sm text-gray-900">{data.name}</td>
              <td className="px-4 py-4 text-sm" style={{ backgroundColor: data.colorCode }}>
                <span className="inline-block text-xl"  >{data.colorCode}</span>
              </td>
              <td className="px-6 py-4 text-sm">
                {data.status ? (
                  <button
                    className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                    onClick={() => colorStatusUpdate(data._id, data.status)}
                  >
                    Active
                  </button>
                ) : (
                  <button
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    onClick={() => colorStatusUpdate(data._id, data.status)}
                  >
                    Inactive
                  </button>
                )}
              </td>
              <td className="px-6 py-4 text-sm">
                <Link
                  to={`/admin/color/edit/${data._id}`}
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Edit
                </Link>
              </td>
              <td className="px-6 py-4 text-sm">
                <button
                  className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded mr-2"
                  onClick={() => deleteCategory(data._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
