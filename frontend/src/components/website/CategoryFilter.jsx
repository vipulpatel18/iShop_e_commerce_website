import React, { useContext, useEffect, useState } from "react";
import {context} from "../../../MainContext";
import { Link } from "react-router-dom";

const CategoryFilter = () => {

  const { fetchCategory, category, fetchColor, color } = useContext(context);

  useEffect(() => {
    fetchCategory();
    fetchColor();
  }, []);
 

  return (
    <div className="p-4 w-64 space-y-8 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Accessories Section */}
      <div>
        <h3 className="font-semibold text-gray-700 uppercase mb-4">
          Accessories
        </h3>
        <ul className="space-y-2 text-sm">
        <Link to={`/store`} className="flex justify-between text-gray-600 hover:text-blue-600 cursor-pointer">
              <h2 >All</h2>
            </Link>
          {category?.map((cat) => (
            <Link to={`/store/${cat.slug}`} key={cat._id} className="flex justify-between text-gray-600 hover:text-blue-600 cursor-pointer">
              <h2>{cat.name}</h2>
              <span>{cat.productCount}</span>
            </Link>
          ))}
        </ul>
      </div>

      {/* Price Range Section */}
      {/* <div>
        <h3 className="font-semibold text-gray-700 uppercase mb-4">Prices</h3>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Min</label>
            <input
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="p-2 border rounded-md w-20 text-center"
              min="0"
              step="0.01"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Max</label>
            <input
              type="number"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="p-2 border rounded-md w-20 text-center"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div> */}

      {/* Color Section */}
      <div>
        <h3 className="font-semibold text-gray-700 uppercase mb-4">Color</h3>
        <div className="flex space-x-4">
          {color?.map(color => (
            <button
              key={color._id}
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: color.colorCode }}
            />
          ))}
        </div>
      </div>

      {/* Brand Section */}
      <div>
        <h3 className="font-semibold text-gray-700 uppercase mb-4">Brand</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between text-gray-600 hover:text-blue-600 cursor-pointer">
            <span>Apple</span>
            <span>99</span>
          </li>
          <li className="flex justify-between text-gray-600 hover:text-blue-600 cursor-pointer">
            <span>LG</span>
            <span>99</span>
          </li>
          <li className="flex justify-between text-gray-600 hover:text-blue-600 cursor-pointer">
            <span>Samsung</span>
            <span>99</span>
          </li>
          <li className="flex justify-between text-gray-600 hover:text-blue-600 cursor-pointer">
            <span>Siemens</span>
            <span>99</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilter;
