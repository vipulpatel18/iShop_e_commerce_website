import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../../MainContext';
import { useParams, useSearchParams } from 'react-router-dom';


const ProductShortOut = () => {
  const { category_slug } = useParams();

  const [sortOption, setSortOption] = useState('Name');
  const [limit, setLimit] = useState(0);
  const [isGridView, setIsGridView] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams()

  const {fetchProducts, products } = useContext(context)

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    onSortChange && onSortChange(e.target.value);
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
    onViewToggle && onViewToggle(!isGridView);
  };

  useEffect(()=>{
    setSearchParams(limit)
    fetchProducts(null,limit,category_slug)
  },[limit,category_slug])

  return (
    <div className="flex items-center lg:container justify-between mt-10 p-4 bg-gray-100 rounded-md shadow-sm">
      
      <div className='hiddne w-2/3 lg:flex items-center gap-9 text-lg'>
        <div className=" text-gray-600 hidden lg:block">
         Items
      </div>

      <div className="hidden lg:flex items-center text-sm">
          <span className="mr-2 text-gray-600">Sort By</span>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="px-2 py-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="Name">Name</option>
            <option value="Price">Price</option>
            <option value="Date">Date</option>
          </select>
        </div>

        <div className="hidden items-center lg:flex text-sm ">
          <span className="mr-2 text-gray-600">Show</span>
          <select
            // value={limit}
            onChange={(e)=>setLimit(e.target.value)}
            className="px-2 pe-3 py-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={0}>All</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className='flex gap-6 items-center justify-end w-full me-4'>
     <div className='flex gap-4 ms-3'>
     <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsGridView(true)}
            className={`p-2 border rounded-md ${isGridView ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M4 4h5v5H4V4zm7 0h5v5h-5V4zm7 0h5v5h-5V4zM4 11h5v5H4v-5zm7 0h5v5h-5v-5zm7 0h5v5h-5v-5zM4 18h5v5H4v-5zm7 0h5v5h-5v-5zm7 0h5v5h-5v-5z" />
            </svg>
          </button>
          <button
            onClick={() => setIsGridView(false)}
            className={`p-2 border rounded-md ${!isGridView ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M4 4h16v2H4V4zm0 5h16v2H4V9zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center text-sm lg:hidden">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="px-1 pe-2 py-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="Name">Sort By</option>
            <option value="Name">Name</option>
            <option value="Price">Price</option>
            <option value="Date">Date</option>
          </select>
        </div>

        <div className="hidden items-center md:flex lg:hidden text-sm ">
          <select
            // value={limit}
            // onChange={(e)=>setLimit(e.target.value)}
            className="px-2 pe-3 py-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={0}>Show Product</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
     </div>

      <div className='lg:hidden'>
      <button
          onClick={() => setIsFilterOpen(true)}
          className="bg-orange-500 text-white py-2 px-6 rounded-md font-semibold shadow hover:bg-orange-600 transition"
        >
          Filters
        </button>
      </div>
      </div>
      
    </div>
  );
};

export default ProductShortOut;