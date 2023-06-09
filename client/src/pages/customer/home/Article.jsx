import React from "react";

import Button from "../../../components/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { articleImages } from "../../../assets/home/article/articleImages";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Article = () => {
  return (
    <section className="flex w-full items-center bg-bgcolor md:min-h-screen">
      <div className="container mx-auto py-16 px-6 lg:px-16">
        <div className="space-y-4 md:space-y-8">
          {/* text div */}
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-0">
            <h1 className="font-gotu text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
              On the Blog
            </h1>

            <Button
              navigateTo="/about"
              btnStyle="btn-primary"
              text="See more articles"
            />
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
              {articleImages.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="flex flex-col items-center space-y-7 p-5">
                    <img
                      className="h-60 w-full object-cover object-center shadow-lg"
                      src={item.img}
                      alt={item.img}
                    />

                    <div className="space-y-7">
                      <h3 className="font-urbanist text-xl font-bold text-primary">
                        {item.name}
                      </h3>

                      <p className="text-base text-secondary line-clamp-3 md:text-lg">
                        When you shop with goodal, it’s like spending time with
                        a good friend, a friend who knows her skincare and
                        always has great recommendations. Our online store is
                        carefully merchandised to make your experience
                        effortless and enjoyable, with in-depth product
                        descriptions and detailed images that let you know
                        exactly what you’re getting.
                      </p>

                      <button className="text-sm font-bold text-secondary underline underline-offset-4 transition duration-300 ease-in hover:text-primary md:text-base">
                        READ MORE
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <button className="button-prev-slide absolute top-[23%] left-0 z-10 grid h-10 w-10 place-items-center bg-zinc-900/90 text-bgcolor transition duration-300 ease-in  hover:bg-zinc-900 hover:text-bgcolor2">
                <IoIosArrowBack />
              </button>

              <button className="button-next-slide absolute top-[23%] right-0 z-10 grid h-10 w-10 place-items-center bg-zinc-900/90 text-bgcolor transition duration-300 ease-in hover:bg-zinc-900  hover:text-bgcolor2">
                <IoIosArrowForward />
              </button>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Article;
