import React from "react";

const StoreTrendingProduct = () => {
  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-8 md:px-16 lg:px-24 lg:me-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-xl overflow-hidden">
        {/* Text Section */}
        <div className="flex flex-col space-y-4 text-center md:text-left max-w-md">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            iPhone 6 Plus
          </h1>
          <p className="text-sm md:text-base lg:text-lg opacity-90">
            Performance and design. Taken right to the edge.
          </p>
        </div>

        {/* Image Section */}
        <div className="relative flex justify-center md:justify-end items-center w-full mt-16 md:mt-0">
          <img
            src="img/2_corousel_2x1.png" // replace with actual path
            alt="iPhone 6 Plus Front View"
            className="max-w-[290px] md:max-w-[300px] lg:max-w-[200px] transform -rotate-6 transition-transform duration-500 hover:scale-105 hover:rotate-0 shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default StoreTrendingProduct;
