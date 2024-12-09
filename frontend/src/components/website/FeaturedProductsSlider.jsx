import React, { useState } from "react";

const featuredProducts = [
  {
    id: 1,
    name: "Beats Solo 2 On Ear Headphones - Black",
    price: "$499",
    originalPrice: "$599",
    rating: 4,
    image: "img/2_corousel@2x.png", // Replace with actual path
  },
  {
    id: 4,
    name: "Beats Solo 2 On Ear Headphones - Black",
    price: "$499",
    originalPrice: "$599",
    rating: 4,
    image: "img/2_corousel@2x.png", // Replace with actual path
  },
  {
    id: 5,
    name: "Beats Solo 2 On Ear Headphones - Black",
    price: "$499",
    originalPrice: "$599",
    rating: 4,
    image: "img/2_corousel@2x.png", // Replace with actual path
  },
  {
    id: 6,
    name: "Beats Solo 2 On Ear Headphones - Black",
    price: "$499",
    originalPrice: "$599",
    rating: 4,
    image: "img/2_corousel@2x.png", // Replace with actual path
  },
  {
    id: 2,
    name: "H-Squared tvTray",
    price: "$499",
    originalPrice: "$599",
    rating: 4,
    image: "img/2_corousel@2x.png", // Replace with actual path
  },
  {
    id: 3,
    name: "Netatmo Rain Gauge",
    price: "$499",
    originalPrice: "$599",
    rating: 4,
    image: "img/2_corousel@2x.png", // Replace with actual path
  },
  // Add more products as needed
];

const FeaturedProductsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredProducts.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-5xl mx-auto my-20">
      <h2 className="text-2xl font-semibold text-center mb-6">
        FEATURED PRODUCTS
      </h2>

      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 p-3 bg-white rounded-full shadow-md hover:bg-gray-200"
        >
          <span className="text-2xl">❮</span>
        </button>

        {/* Product Cards */}
        <div className="flex justify-center px-16 space-x-16 overflow-hidden cursor-pointer">
          {featuredProducts
            .slice(currentIndex, currentIndex + 3)
            .map((product) => (
              <div
                key={product.id}
                className="bg-white flex gap-3 p-4 rounded-lg shadow-lg text-center transition transform hover:scale-105"
              >
                <img
                  src={product.image}
                  // alt={product.name}
                  className="w-1/2 object-contain self-center"
                />
                <div>
                  <h3 className="text-sm font-semibold">{product.name}</h3>
                  <div className="flex justify-center space-x-1 text-yellow-400 mb-2">
                    {"★".repeat(product.rating)}
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="text-red-500 text-lg font-bold">
                      {product.price}
                    </div>
                    <div className="text-gray-500 line-through">
                      {product.originalPrice}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 p-3 bg-white rounded-full shadow-md hover:bg-gray-200"
        >
          <span className="text-2xl">❯</span>
        </button>
      </div>
    </div>
  );
};

export default FeaturedProductsSlider;
