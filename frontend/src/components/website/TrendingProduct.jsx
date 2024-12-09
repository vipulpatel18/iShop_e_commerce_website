import React from "react";
import { Link } from "react-router-dom";

const TrendingProduct = () => {
  return (
    <div className="space-y-16">
      {/* Main Trending Product Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-8 md:px-16 lg:px-24 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-xl overflow-hidden">
        {/* Text Section */}
        <div className="flex flex-col space-y-4 text-center md:text-left max-w-md">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            iPhone 6 Plus
          </h1>
          <p className="text-sm md:text-base lg:text-lg opacity-90">
            Performance and design. Taken right to the edge.
          </p>
          <Link
            to={"/store"}
            className="inline-block text-center mt-4 px-6 py-2 text-sm font-semibold text-blue-500 bg-white rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
          >
            SHOP NOW
          </Link>
        </div>

        {/* Image Section */}
        <div className="relative flex justify-center md:justify-end items-center w-full mt-16 md:mt-0">
          <img
            src="img/2_corousel_2x1.png" // replace with actual path
            alt="iPhone 6 Plus Front View"
            className="max-w-[290px] md:max-w-[300px] lg:max-w-[400px] transform -rotate-6 transition-transform duration-500 hover:scale-105 hover:rotate-0 shadow-2xl"
          />
        </div>
      </div>

      {/* Feature Section */}
      <div className="flex flex-col md:flex-row justify-center md:justify-around items-center mx-12 sm:mx-0 px-6 md:px-16 lg:px-36 py-8 rounded-lg gap-8 md:gap-12 lg:gap-20">
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center space-y-2">
          <img
            src="img/shipping.svg"
            alt="Free Shipping Icon"
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <h3 className="text-sm md:text-lg font-semibold">FREE SHIPPING</h3>
          <p className="text-xs md:text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center space-y-2">
          <img
            src="img/refund.svg"
            alt="Refund Icon"
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <h3 className="text-sm md:text-lg font-semibold">100% REFUND</h3>
          <p className="text-xs md:text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center space-y-2">
          <img
            src="img/support.svg"
            alt="Support Icon"
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <h3 className="text-sm md:text-lg font-semibold">SUPPORT 24/7</h3>
          <p className="text-xs md:text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendingProduct;
