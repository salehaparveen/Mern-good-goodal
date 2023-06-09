import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { heroImages } from "../../../assets/home/hero/heroImages";

import { setCurrImg } from "../../../features/customer/slider/brandSlice";
import Button from "../../../components/Button";

const Hero = () => {
  const dispatch = useDispatch();
  const { currImg } = useSelector((store) => store.brand);

  const slideNext = () => {
    currImg === heroImages.length - 1
      ? dispatch(setCurrImg(0))
      : dispatch(setCurrImg(currImg + 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      slideNext();
    }, 2500);

    return () => clearTimeout(timer);
  });

  return (
    <section className="flex w-full items-center bg-bgcolor2 md:min-h-screen">
      <div className="w-full">
        <div className="relative flex flex-col items-center justify-center font-urbanist">
          {/* image */}
          <div className="min-h-screen w-full">
            <img
              src={heroImages[currImg].img}
              alt="heroImages"
              className="min-h-screen w-full object-cover md:h-[600px]"
            />

            {/* image darker overlay */}
            <div className="absolute inset-0 z-0 h-full w-full bg-black opacity-30"></div>
          </div>

          {/* text */}
          <div className="absolute z-10 space-y-10 px-10 text-center md:px-24 lg:px-64">
            <h1 className="text-sm font-bold uppercase tracking-widest text-white md:text-base">
              {heroImages[currImg].desc1}
            </h1>
            <p className="font-gotu text-3xl text-white lg:text-6xl lg:leading-snug">
              {heroImages[currImg].desc2}
            </p>
          </div>

          <div className="absolute bottom-32 md:bottom-40">
            <Button
              navigateTo="/products"
              btnStyle="btn-secondary"
              text={heroImages[currImg].buttonDesc}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
