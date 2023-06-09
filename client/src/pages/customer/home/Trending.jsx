import React from "react";

import { trendingImages } from "../../../assets/home/trending/trendingImages";

const Trending = () => {
  return (
    <section className="flex w-full items-center bg-bgcolor md:min-h-screen">
      <div className="container mx-auto py-16 px-6 lg:px-16">
        <div className="space-y-11">
          {/* text */}
          <div className="text-center md:px-48">
            <h1 className="font-gotu text-2xl font-bold text-primary md:text-4xl md:leading-relaxed">
              Curated Korean Skincare, from top shelf items to trending new
              arrivals.
            </h1>
          </div>

          {/* grid */}
          <div className="grid items-center gap-y-4 gap-x-3 md:grid-cols-4 md:grid-rows-4">
            {/* 1st */}
            <div className="group relative col-span-2 row-span-4 flex h-72 items-center justify-center overflow-hidden md:h-[592px]">
              <span className="absolute z-20 font-gotu text-2xl font-bold text-bgcolor2 md:text-4xl">
                Back in Stock
              </span>

              <div className="absolute inset-0 z-10">
                <div className="h-full w-full bg-black opacity-30"></div>
              </div>

              <img
                src={trendingImages[0].img}
                alt="img1"
                className="z-0 h-full w-full object-cover transition duration-500 ease-in group-hover:scale-110"
              />
            </div>

            {/* 2nd */}
            <div className="group relative col-span-2 row-span-2 flex h-72 items-center justify-center overflow-hidden">
              <span className="absolute z-20 font-gotu text-2xl font-bold text-bgcolor2 md:text-4xl">
                On Sale
              </span>

              <div className="absolute inset-0 z-10">
                <div className="h-full w-full bg-black opacity-30"></div>
              </div>

              <img
                src={trendingImages[1].img}
                alt="img2"
                className="z-0 h-full w-full object-cover transition duration-500 ease-in group-hover:scale-110"
              />
            </div>

            {/* 3rd */}
            <div className="group relative col-span-2 row-span-2 flex h-72 items-center justify-center overflow-hidden">
              <span className="absolute z-20 font-gotu text-2xl font-bold text-bgcolor2 md:text-4xl">
                Trending Now
              </span>

              <div className="absolute inset-0 z-10">
                <div className="h-full w-full bg-black opacity-30"></div>
              </div>

              <img
                src={trendingImages[2].img}
                alt="img3"
                className="z-0 h-full w-full object-cover transition duration-500 ease-in group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trending;
