import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { context } from "../../../MainContext";
import { IndCurrency } from "../../Help";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Pages/redux/reducers/cartSlice";

const BestSeller = () => {
  const { products, fetchProducts, API_BASE_URL } = useContext(context);
  const dispatch = useDispatch();

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Toggle "Show More" and "Show Less"
  const handleShowToggle = () => {
    setShowAll((prev) => !prev);
  };

  // Determine which products to display based on `showAll`
  const displayedProducts = showAll ? products : products?.slice(0, 8);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">BEST SELLER</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {displayedProducts?.map((product) =>
          product.top_selling ? (
            <ProductCard
              key={product._id}
              product={product}
              API_BASE_URL={API_BASE_URL}
              dispatch={dispatch}
            />
          ) : null
        )}
      </div>

      {/* Show More / Show Less Button */}
      <div className="flex items-center justify-center my-12 gap-4">
        <hr className="flex-grow border-t border-gray-300" />
        <button
          className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300"
          onClick={handleShowToggle}
        >
          <span className="flex items-center gap-2">
            {showAll ? "Show Less" : "Show All"}
          </span>
        </button>
        <hr className="flex-grow border-t border-gray-300" />
      </div>
    </div>
  );
};

export default BestSeller;

function ProductCard({ product, API_BASE_URL, dispatch }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="border w-64 m-auto rounded-lg shadow-md overflow-hidden relative transition transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hot Tag */}
      {product.top_selling && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
          Top Selling
        </div>
      )}

      {/* Product Image */}
      <div className="w-full h-[250px] flex justify-center items-center bg-gray-100">
        <img
          src={`${API_BASE_URL}/images/product/${product.main_image}`}
          alt={product?.name}
          className={`w-2/3 object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-20" : "opacity-100"
          }`}
        />

        {/* Hover icons */}
        {isHovered && (
          <div className="absolute inset-0 flex justify-center items-center pb-20 space-x-4">
            <button
              className="p-3 bg-white rounded-full shadow-lg text-blue-500"
              onClick={() =>
                dispatch(
                  addToCart({
                    product_id: product._id,
                    name: product.name,
                    price: product.final_price,
                    original_price: product.original_price,
                    main_image: product.main_image,
                  })
                )
              }
            >
              <FaShoppingCart size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{product?.name}</h3>

        {/* Pricing */}
        <div className="flex justify-center items-baseline space-x-2">
          <span className="text-red-500 text-xl font-bold">
            {IndCurrency(Number(product?.final_price))}
          </span>
          <span className="text-gray-400 line-through">
            {IndCurrency(Number(product?.original_price))}
          </span>
        </div>
      </div>
    </div>
  );
}
