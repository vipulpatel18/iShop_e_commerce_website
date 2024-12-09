import React from "react";
import { useParams } from "react-router-dom";

const ThankYouPage = () => {
  const { order_id } = useParams();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600">Thank You!</h1>
        <p className="mt-2 text-gray-700">
          Your order has been successfully placed.
        </p>
        <p className="mt-4 text-sm text-gray-500">Order ID:</p>
        <p className="text-lg font-semibold text-gray-800">{order_id}</p>
        <p className="mt-6 text-gray-600">
          We appreciate your purchase! Feel free to explore more products.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
