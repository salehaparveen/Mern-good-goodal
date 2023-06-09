import React from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setClearCart } from "../../../features/customer/cart/cartSlice";

const CartTop = ({ handleCartNav }) => {
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((store) => store.cart);

  const handleClearCart = () => {
    dispatch(setClearCart());
  };

  return (
    <div className="flex items-center justify-between bg-bgcolor p-4 font-urbanist drop-shadow-lg">
      <div className="flex items-center gap-2">
        <button className="rounded bg-primary p-1 transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary">
          <IoMdClose
            className="text-white md:h-5 md:w-5 "
            onClick={handleCartNav}
          />
        </button>
        <h1 className="font-bold text-primary">
          Your Cart ({cartTotalQuantity} Items)
        </h1>
      </div>

      <h1
        onClick={handleClearCart}
        className="cursor-pointer rounded bg-primary py-1 px-2 text-sm text-white transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary md:text-base"
      >
        Clear Cart
      </h1>
    </div>
  );
};

export default CartTop;
