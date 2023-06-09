import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";

export const ProductGrid = ({ products, handleAddToCart }) => {
  function formatPrice(price) {
    // Get the user's locale from the browser
    const userLocale = navigator.language || "en-US";

    // Format the price value using the user's locale and currency
    const formattedPrice = Number(price).toLocaleString(userLocale, {
      style: "currency",
      currency: "USD",
    });

    return formattedPrice;
  }

  return (
    <div className="grid grid-cols-2 gap-5 md:px-3 lg:grid-cols-3">
      {products.productsData?.map((item) => (
        <div key={item._id} className="space-y-3 text-center">
          <div className="relative">
            <div className="group relative flex h-44 justify-center md:h-80">
              <Link
                to={`/products/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                state={{ item }}
              >
                <img
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-in-out group-hover:opacity-0 "
                  src={item.imgOne.url}
                  alt={item.name}
                />

                <img
                  className="absolute inset-0 h-full w-full rounded-lg object-cover opacity-0 shadow-xl transition duration-500 ease-in-out group-hover:opacity-100 "
                  src={item.imgTwo.url}
                  alt={item.name}
                />
              </Link>

              <button
                className="absolute bottom-2 hidden translate-y-3 transform rounded-sm bg-gray-700 py-3 px-12 font-urbanist text-xs font-extrabold text-bgcolor opacity-0 transition duration-300 ease-in-out hover:bg-gray-800 group-hover:translate-y-0 group-hover:opacity-100 md:block"
                onClick={() =>
                  handleAddToCart(
                    item._id,
                    item.category,
                    item.name,
                    item.price,
                    item.imgOne,
                    item.imgTwo
                  )
                }
              >
                + ADD TO CART
              </button>
            </div>

            <div className="absolute bottom-2 right-2 md:hidden">
              <HiOutlineShoppingBag
                onClick={() =>
                  handleAddToCart(
                    item._id,
                    item.category,
                    item.name,
                    item.price,
                    item.imgOne,
                    item.imgTwo
                  )
                }
                className="h-6 w-6 cursor-pointer rounded bg-gray-700 p-1 text-bgcolor transition-all duration-100 ease-in-out hover:bg-gray-800 active:scale-90 active:bg-gray-800"
              />
            </div>
          </div>

          <div className="flex h-14 items-center justify-center">
            <p className="font-urbanist text-base text-secondary md:text-lg lg:text-xl">
              {item.name}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <span className="font-urbanist text-base font-bold text-secondary md:text-lg lg:text-xl">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
