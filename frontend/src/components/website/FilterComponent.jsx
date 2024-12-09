import React, { useState } from "react";

const FilterComponent = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Accessories"); // Default category

  const handleFilterChange = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  return (
    <div className="relative bg-gray-100 min-h-screen">
      {/* Filter Sidebar */}
      {isFilterOpen && (
        <div className="fixed left-0 top-0 h-full w-full bg-white shadow-lg border-r p-6 space-y-6 z-20 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              &larr; Close
            </button>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-3 gap-4 px-2 mb-6">
            {["Accessories", "Price", "Color"].map((category) => (
              <button
                key={category}
                className={`py-2 px-4 text-sm font-semibold rounded-lg transition-colors ${
                  activeCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filter Content */}
          <div className="space-y-6">
            {activeCategory === "Accessories" && (
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Accessories
                </h3>
                <ul className="space-y-2">
                  {["Apple Car", "Air port & wireless", "Cables & Docks", "Cases & Films"].map(
                    (item, index) => (
                      <li
                        key={index}
                        className="text-gray-600 hover:text-orange-500 cursor-pointer"
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            {activeCategory === "Price" && (
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Price
                </h3>
                <div className="space-y-3">
                  {[
                    "Rs. 10,000 and Below",
                    "Rs. 10,000 - Rs. 15,000",
                    "Rs. 15,000 - Rs. 20,000",
                    "Rs. 20,000 - Rs. 30,000",
                    "Rs. 30,000 and Above",
                  ].map((range, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox text-orange-500"
                        onChange={(e) =>
                          handleFilterChange("price", range, e.target.checked)
                        }
                      />
                      <span className="text-gray-600">{range}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            {activeCategory === "Color" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Color
                </h3>
                <div className="flex space-x-3">
                  {[
                    "#FF0000",
                    "#000000",
                    "#FFFFFF",
                    "#FFFF00",
                    "#FF00FF",
                    "#FFC0CB",
                  ].map((color, index) => (
                    <button
                      key={index}
                      className="w-8 h-8 rounded-full border shadow-md transform hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex items-center justify-between">
            <span className="text-gray-600 text-sm">10,334 products found</span>
            <button className="bg-orange-500 text-white py-2 px-6 rounded-md font-semibold shadow hover:bg-orange-600 transition">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
