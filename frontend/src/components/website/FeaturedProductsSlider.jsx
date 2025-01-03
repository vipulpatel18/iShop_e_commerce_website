import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaStar } from "react-icons/fa";

export default function FeaturedProductsSlider() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
      partialVisibilityGutter: 100,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <>
      <div className="max-w-[1100px] mx-auto pb-[80px]">
        <h1 className="text-3xl font-semibold text-[#22262A] text-center pb-5">
          FEATURED PRODUCTS
        </h1>

        <Carousel
          responsive={responsive}
          swipeable
          draggable
          showDots
          infinite
          autoPlay
          autoPlaySpeed={3000}
          keyBoardControl
          transitionDuration={300}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
        >
          {/* Product Card 1 */}
          <div className="py-10 shadow-inner flex justify-evenly gap-6 px-3">
            <div className="flex items-center shadow-md p-3">
              <img src="img/2_corousel@2x.png" alt="Beats Solo 2" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-xl pb-3">
                Beats Solo 2 On Ear Headphones - Black
              </h1>
              <div className="flex gap-1 text-xl pb-3">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-[#C1C8CE]" />
              </div>
              <div className="text-[#FF4858] text-xl ">
                $499 <span className="text-[#C1C8CE]">$599</span>
              </div>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="py-10 shadow-inner flex justify-evenly gap-6 px-3">
            <div className="flex items-center shadow-md p-3">
              <img src="img/2_corousel@2x.png" alt="Beats Solo 2" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-xl pb-3">
                Beats Solo 2 On Ear Headphones - Black
              </h1>
              <div className="flex gap-1 text-xl pb-3">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-[#C1C8CE]" />
              </div>
              <div className="text-[#FF4858] text-xl ">
                $499 <span className="text-[#C1C8CE]">$599</span>
              </div>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="py-10 shadow-inner flex justify-evenly gap-6 px-3">
            <div className="flex items-center shadow-md p-3">
              <img src="img/2_corousel@2x.png" alt="Beats Solo 2" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-xl pb-3">
                Beats Solo 2 On Ear Headphones - Black
              </h1>
              <div className="flex gap-1 text-xl pb-3">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-[#C1C8CE]" />
              </div>
              <div className="text-[#FF4858] text-xl ">
                $499 <span className="text-[#C1C8CE]">$599</span>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
}
