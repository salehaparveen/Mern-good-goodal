import React, { useState } from "react";

import Button from "../../../../components/Button";

import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";

import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddItemToCart,
  setAddItemToCartTwo,
  setPreAdd,
  setPreDecrease,
} from "../../../../features/customer/cart/cartSlice";

import {
  ProductItemDescription,
  ProductItemIngredients,
  ProductItemHowToUse,
  ProductItemShare,
} from "./";

const ProductItem = () => {
  const { state } = useLocation();
  const { item } = state;
  const { _id, category, name, price, imgOne, imgTwo } = item;

  const { cartItems, testQuant } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const itemIndex = cartItems.findIndex((item) => item._id === _id);

  console.log("quantity", cartItems[itemIndex]?.quantity);

  console.log("testQuant", testQuant);

  console.log(cartItems);

  const handleIncrease = () => {
    dispatch(setPreAdd());
  };

  const handleDecrease = () => {
    dispatch(setPreDecrease({ _id }));
  };

  const [activeSection, setActiveSection] = useState("description");
  const productNavItemClass =
    "font-urbanist font-bold text-sm md:text-base text-zinc-600 transition duration-200 ease-in-out cursor-pointer hover:text-primary";

  let detailSection;
  if (activeSection === "description") {
    detailSection = <ProductItemDescription item={item} />;
  } else if (activeSection === "ingredients") {
    detailSection = <ProductItemIngredients />;
  } else if (activeSection === "howtouse") {
    detailSection = <ProductItemHowToUse />;
  } else if (activeSection === "share") {
    detailSection = <ProductItemShare />;
  }

  const handleAddToCart = () => {
    const items = { _id, category, name, price, imgOne, imgTwo };

    dispatch(setAddItemToCartTwo(items));
  };

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
    <main className="min-h-screen w-full bg-[#FFFFFF]">
      <div className="container mx-auto py-16 px-6 lg:px-16">
        <div className="mt-3 flex flex-col items-start gap-8 md:mt-20 md:flex-row">
          {/* img */}
          <div className="group relative flex h-[400px] w-full justify-center md:h-[700px]">
            <img
              className="absolute h-full w-full object-cover transition duration-500 ease-in-out group-hover:opacity-0"
              src={item.imgOne.url}
              alt={item.name}
            />

            <img
              className="absolute h-full w-full rounded-lg object-cover opacity-0 shadow-xl transition duration-500 ease-in-out group-hover:opacity-100"
              src={item.imgTwo.url}
              alt={item.name}
            />
          </div>

          {/* name */}
          <div className="flex h-full w-full flex-col justify-center space-y-6 text-left">
            <p className="font-urbanist text-xl font-bold text-primary md:text-4xl lg:text-5xl">
              {item.name}
            </p>

            <span className="inline-block font-gotu text-lg text-secondary md:text-2xl lg:text-3xl">
              {formatPrice(item.price)}
            </span>

            <div className="flex items-center justify-between space-x-4 md:justify-start">
              <Button
                navigateTo="/products"
                btnStyle="btn-primary"
                text="Back"
              />

              <div className="flex w-min items-center justify-start border border-zinc-300">
                <button
                  onClick={handleDecrease}
                  className="p-2 transition-all duration-100 ease-in-out"
                >
                  <FaMinus className="h-3 text-zinc-600" />
                </button>

                <span className="flex items-center justify-center py-0.5 px-4 text-sm font-semibold tracking-widest text-zinc-700 md:h-5 md:w-5 md:py-4 md:px-8">
                  {testQuant}
                </span>

                <button
                  onClick={handleIncrease}
                  className="p-2 transition-all duration-100 ease-in-out"
                >
                  <FaPlus className="h-3 text-zinc-600" />
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn-secondary">
                Add to cart
              </button>
            </div>

            <div className="space-y-5">
              <ul className="flex space-x-5 border-b border-zinc-300 pb-0.5">
                <li
                  onClick={() => setActiveSection("description")}
                  className={`${productNavItemClass} ${
                    activeSection === "description" &&
                    "text-pink-600 underline decoration-2 underline-offset-8 hover:text-pink-600"
                  }`}
                >
                  Description
                </li>
                <li
                  onClick={() => setActiveSection("ingredients")}
                  className={`${productNavItemClass} ${
                    activeSection === "ingredients" &&
                    "text-pink-600 underline decoration-2 underline-offset-8 hover:text-pink-600"
                  }`}
                >
                  Ingredients
                </li>
                <li
                  onClick={() => setActiveSection("howtouse")}
                  className={`${productNavItemClass} ${
                    activeSection === "howtouse" &&
                    "text-pink-600 underline decoration-2 underline-offset-8 hover:text-pink-600"
                  }`}
                >
                  How To Use
                </li>
                <li
                  onClick={() => setActiveSection("share")}
                  className={`${productNavItemClass} ${
                    activeSection === "share" &&
                    "text-pink-600 underline decoration-2 underline-offset-8 hover:text-pink-600"
                  }`}
                >
                  Share
                </li>
              </ul>

              {detailSection}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductItem;
