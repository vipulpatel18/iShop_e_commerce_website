import React from "react";

export default function SwitchButton({ isOn, label, productStatusUpdate, id, flag }) {
  // console.log(isOn)
  return (
    <div className="flex justify-between space-x-3 mt-2">
      <span className="text-sm font-medium text-gray-700">{label}:-</span>
      <div
      onClick={()=>{productStatusUpdate(id,flag)}}
        className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${
          isOn ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
            isOn ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </div>
    </div>
  );
}
