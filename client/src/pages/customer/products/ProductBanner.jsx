import React from "react";

export const ProductBanner = ({ filteredBanners }) => {
  return (
    <>
      {filteredBanners.category === "All" ? (
        <div className="relative flex items-center justify-end pt-28 md:pt-14">
          <h1 className="absolute mr-6 font-urbanist text-lg font-bold uppercase text-primary sm:mr-5 sm:text-3xl md:mr-6 md:text-4xl lg:mr-52 lg:text-5xl">
            {filteredBanners.name}
          </h1>

          <img src={filteredBanners.image} alt="banner" className="" />
        </div>
      ) : (
        filteredBanners.map((item) => (
          <div
            key={item.id}
            className={
              item.category === "Apple Aha" || item.category === "Heart Leaf"
                ? "relative flex items-center justify-center pt-28 md:pt-14"
                : "relative flex items-center justify-end pt-28 md:pt-14"
            }
          >
            <h1
              className={
                item.category === "Apple Aha" || item.category === "Heart Leaf"
                  ? "absolute font-urbanist text-lg font-bold uppercase text-primary sm:text-3xl md:text-4xl lg:text-5xl"
                  : "absolute mr-6 font-urbanist text-lg font-bold uppercase text-primary sm:mr-5 sm:text-3xl md:mr-6 md:text-4xl lg:mr-52 lg:text-5xl"
              }
            >
              {item.name}
            </h1>
            <img src={item.image} alt="banner" />
          </div>
        ))
      )}
    </>
  );
};
