import React from "react";

export default function MainImg() {
  return (
    <div
      style={{
        background:
          "linear-gradient(67deg, #E71D3A 0%, #ECC7C1 45%, #EFCAC4 58%, #E4BDB8 70%, #42A8FE 100%)",
      }}
      className="bg-no-repeat p-4 h-[463px] sm:h-[300px] md:h-[400px] lg:h-[463px] w-full relative flex justify-center items-center"
    >
    <div className="max-w-[1200px] mx-auto">
    <img
        src="img/2_corousel@2x.png"
        alt=""
        className="h-[80%] sm:h-[60%] md:h-[90%] lg:h-[100%] absolute right-0 bottom-0 sm:right-12 md:right-24 lg:right-36"
      />
    </div>
    </div>
  );
}
