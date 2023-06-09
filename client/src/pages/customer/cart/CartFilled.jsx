import React from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  setDecreaseItemQTY,
  setIncreaseItemQTY,
  setRemoveItemFromCart,
} from "../../../features/customer/cart/cartSlice";

const CartFilled = ({
  item: { _id, category, name, price, imgOne, imgTwo, quantity },
}) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(setRemoveItemFromCart({ _id, name }));
  };

  const handleIncreaseItemQuantity = () => {
    dispatch(setIncreaseItemQTY({ _id }));
  };

  const handleDecreaseItemQuantity = () => {
    dispatch(setDecreaseItemQTY({ _id }));
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
    <div className="flex-1 border-b border-zinc-300">
      <div className="grid grid-cols-5 gap-3 p-4 font-urbanist">
        {/* image */}
        <div className="group relative col-span-2 flex items-center">
          <img
            src={imgOne.url}
            alt={name}
            className="absolute object-cover transition duration-500 ease-in-out group-hover:opacity-0"
          />

          <img
            src={imgTwo.url}
            alt={name}
            className="absolute rounded-lg object-cover opacity-0 shadow-xl transition duration-500 ease-in-out group-hover:opacity-100"
          />
        </div>

        {/* name */}
        <div className="col-span-3 space-y-3">
          <h1 className="text-base font-bold text-primary md:text-2xl">
            {name}
          </h1>

          <p className="text-base text-primary md:text-2xl">{category}</p>

          <h2 className="text-base font-bold text-primary md:text-2xl">
            {formatPrice(price * quantity)}
          </h2>

          <div className="flex space-x-3">
            <div className="flex w-min items-center justify-start border border-zinc-300">
              <button
                onClick={handleDecreaseItemQuantity}
                className="p-1 transition-all duration-100 ease-in-out md:p-2"
              >
                <FaMinus className="h-3 text-zinc-600" />
              </button>

              <span className="flex items-center justify-center py-0.5 px-4 text-xs font-semibold tracking-widest text-zinc-700 md:h-5 md:w-5 md:py-4 md:px-8 md:text-sm">
                {quantity}
              </span>

              <button
                onClick={handleIncreaseItemQuantity}
                className="p-1 transition-all duration-100 ease-in-out md:p-2"
              >
                <FaPlus className="h-3 text-zinc-600" />
              </button>
            </div>

            <div className="flex items-center justify-center">
              <button
                onClick={handleRemoveItem}
                className="rounded bg-primary p-1.5 transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary"
              >
                <FaTrashAlt className="h-3 w-3 text-white md:h-4 md:w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartFilled;
