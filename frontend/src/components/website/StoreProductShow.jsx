import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { context } from "../../../MainContext"; // Context providing product data.
// import ProductCard from "./ProductCard"; // Import the ProductCard component.
import { FaHeart, FaShoppingCart } from "react-icons/fa"; // Icons for actions.
import { addToCart } from "../../Pages/redux/reducers/cartSlice"; // Redux action.

const StoreProductShow = () => {
  const { fetchProducts, products, API_BASE_URL } = useContext(context); // Fetch products and API base URL from context.
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts.
  }, []);

  // console.log(products);

  return (
    <div className="lg:container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {products?.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            API_BASE_URL={API_BASE_URL}
            dispatch={dispatch}
          />
        ))}
      </div>

      {/* Pagination section (placeholder for now). */}
      {/* <div className="flex items-center justify-center my-12 gap-4">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <button className="px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100">
                Previous
              </button>
            </li>
            <li>
              <button className="px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100">
                1
              </button>
            </li>
            <li>
              <button className="px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100">
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div> */}
    </div>
  );
};

export default StoreProductShow;

const ProductCard = ({ product, API_BASE_URL, dispatch }) => {
  const [isHovered, setIsHovered] = useState(false); // Manage hover state.

  return (
    <div
      className="border w-64 m-auto rounded-lg shadow-md overflow-hidden relative transition-transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* "Top Selling" tag for popular products. */}
      {product.top_selling && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
          Top Selling
        </div>
      )}

      {/* Product image and hover icons. */}
      <div className="w-full h-[250px] flex justify-center items-center bg-gray-100">
        <img
          src={`${API_BASE_URL}/images/product/${product.main_image}`}
          alt={product.name}
          className={`w- object-cover transition-opacity ${
            isHovered ? "opacity-20" : "opacity-100"
          }`}
        />
        {isHovered && (
          <div className="absolute inset-0 flex justify-center items-center space-x-4">
            <button className="p-3 bg-white rounded-full shadow-lg text-blue-500">
              <FaHeart size={20} />
            </button>
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

      {/* Product details: name, rating, and prices. */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="flex justify-center items-center my-2">
          <span className="text-yellow-400">&#9733;</span>
          <span className="text-yellow-400">&#9733;</span>
          <span className="text-yellow-400">&#9733;</span>
          <span className="text-yellow-400">&#9733;</span>
          <span className="text-gray-300">&#9733;</span>
        </div>
        <div className="flex justify-center items-baseline space-x-2">
          <span className="text-red-500 text-xl font-bold">
            $ {product.final_price}
          </span>
          <span className="text-gray-400 line-through">
            $ {product.original_price}
          </span>
        </div>
      </div>
    </div>
  );
};
