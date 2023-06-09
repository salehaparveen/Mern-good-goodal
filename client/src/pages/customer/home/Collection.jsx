import React from "react";

import Button from "../../../components/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { collectionImages } from "../../../assets/home/collection/collectionImages";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Collection = () => {
  return (
    <section className="flex w-full items-center bg-bgcolor md:min-h-screen">
      <div className="container mx-auto py-16 px-6 lg:px-16">
        <div className="space-y-14">
          {/* text div */}
          <div className="space-y-6 text-center">
            <h1 className="font-urbanist text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
              Goodal Collection
            </h1>

            <p className="font-gotu text-lg text-secondary md:text-2xl lg:text-3xl">
              Highly effective, simply natural.
            </p>
          </div>

          {/* slider div */}
          <div>
            <Swiper
              className="relative"
              modules={[Navigation]}
              loop={true}
              navigation={{
                nextEl: ".button-next-slide",
                prevEl: ".button-prev-slide",
              }}
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                "@0.75": {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                "@1.00": {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {collectionImages.map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <div className="flex flex-col items-center space-y-7 p-5 text-center">
                      <h3 className="font-urbanist text-2xl font-bold text-primary md:text-3xl">
                        {item.name}
                      </h3>

                      <img
                        className="h-96 w-full transform rounded-xl object-cover object-center shadow-lg transition duration-300 ease-out md:hover:scale-105"
                        src={item.img}
                        alt={item.img}
                      />

                      <Button
                        navigateTo="/products"
                        btnStyle="btn-card"
                        text="View Collection"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}

              <button className="button-prev-slide absolute top-[50%] left-0 z-10 grid h-10 w-10 place-items-center bg-zinc-900/90 text-bgcolor transition duration-300 ease-in hover:bg-zinc-900  hover:text-bgcolor2">
                <IoIosArrowBack />
              </button>

              <button className="button-next-slide absolute top-[50%] right-0 z-10 grid h-10 w-10 place-items-center bg-zinc-900/90 text-bgcolor transition duration-300 ease-in hover:bg-zinc-900  hover:text-bgcolor2">
                <IoIosArrowForward />
              </button>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
