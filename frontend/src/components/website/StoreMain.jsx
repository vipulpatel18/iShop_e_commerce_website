import React, { useContext, useEffect, useState } from "react";
import { context } from "../../../MainContext";
import { Link, useParams, useSearchParams } from "react-router-dom";
import StoreTrendingProduct from "../../components/website/StoreTrendingProduct";
import StoreProductShow from "../../components/website/StoreProductShow";

export default function StoreMain() {
  const { category_slug } = useParams();

  const [sortOption, setSortOption] = useState("Name");
  const [limit, setLimit] = useState(null);
  const [product_color, setProduct_color] = useState(null);
  const [isGridView, setIsGridView] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    fetchCategory,
    category,
    fetchColor,
    color,
    fetchProducts,
    products,
  } = useContext(context);

  useEffect(() => {
    fetchCategory();
    fetchColor();
  }, []);

  useEffect(() => {
    const query = {};
    query["limit"] = limit;
    if (product_color != null) {
      query["product_color"] = product_color;
    }
    setSearchParams(query);
    fetchProducts(null, limit, category_slug, product_color);
  }, [limit, category_slug, product_color]);

  return (
    <div className="lg:grid grid-cols-4 lg:container m-auto mt-6">
      {/* CategoryFilter */}
      <div className="hidden lg:block ps-10">
        <div className="p-4 w-64 space-y-8 bg-white border border-gray-200 rounded-lg shadow-md">
          {/* Accessories Section */}
          <div>
            <h3 className="font-semibold text-gray-700 uppercase mb-4">
              Accessories
            </h3>
            <ul className="space-y-2 text-sm">
              <Link
                to={`/store`}
                className="flex justify-between text-gray-600 hover:text-blue-600 cursor-pointer"
              >
                <h2>All</h2>
                {/* category Section */}
              </Link>
              {category?.map((cat) => (
                <Link
                  to={`/store/${cat.slug}`}
                  key={cat._id}
                  onClick={() => setProduct_color(null)}
                  className="flex justify-between text-gray-600 hover:text-blue-600 cursor-pointer"
                >
                  <h2>{cat.name}</h2>
                  <span>{cat.productCount}</span>
                </Link>
              ))}
            </ul>
          </div>

          {/* Color Section */}
          <div>
            <h3 className="font-semibold text-gray-700 uppercase mb-4">
              Color
            </h3>
            <div className="flex space-x-4 flex-wrap">
              {color?.map((color) => (
                <button
                  key={color._id}
                  onClick={(e) => setProduct_color(color._id)}
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: color.colorCode }}
                />
              ))}
              <button
                onClick={() => setProduct_color(null)}
                className="px-2 rounded-lg border text-black"
              >
                All{" "}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-3">
        <StoreTrendingProduct />

        <div className="flex items-center lg:container justify-between mt-10 p-4 bg-gray-100 rounded-md shadow-sm">
          {/* <div className="hiddne w-2/3 lg:flex items-center gap-9 text-lg">
            <div className=" text-gray-600 hidden lg:block">Items</div>

            <div className="flex items-center text-sm">
              <span className="mr-2 text-gray-600">Sort By</span>
              <select
                value={sortOption}
                onChange={(e)=>setSortOption(e.target.value)}
                className="px-2 py-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Name">Name</option>
                <option value="Price">Price</option>
                <option value="Date">Date</option>
              </select>
            </div>

            <div className="items-center flex text-sm ">
              <span className="mr-2 text-gray-600">Show</span>
              <select
                // value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="px-2 pe-3 py-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value={0}>All</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div> */}

          <div className="flex gap-6 items-center justify-between w-full me-4">
            <div className="flex gap-4 ms-3">
              {/* Limit   */}
              <div className="items-center flex text-sm cursor-pointer">
                <span className="mr-2 text-gray-600">Show</span>
                <select
                  // value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="px-2 pe-3 py-1 cur bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value={0}>All</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
            {/* filter btn   */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="bg-orange-500 text-white py-2 px-6 rounded-md font-semibold shadow hover:bg-orange-600 transition"
              >
                Filters
              </button>
            </div>
          </div>
        </div>

        <StoreProductShow />
        {/* <FilterComponent/>   */}
      </div>
    </div>
  );
}
