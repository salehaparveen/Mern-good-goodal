import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGetTotals } from "../../../features/customer/cart/cartSlice";
import { CartTop, CartEmpty, CartFilled, CartBottom } from "./index";

const Cart = ({ handleCartNav }) => {
  const dispatch = useDispatch();
  const { cartState, cartItems } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(setGetTotals());
  }, [cartItems, dispatch]);

  return (
    <>
      {/* overlay */}
      {cartState ? (
        <div
          onClick={handleCartNav}
          className="fixed top-0 left-0 z-50 h-screen w-full bg-black/70"
        ></div>
      ) : null}

      {/* cart menu */}
      <div
        className={`fixed top-0 z-50 flex h-screen w-[300px] flex-col justify-between bg-[#FFFFFF] duration-300 md:w-[500px]
          ${cartState ? "right-0 " : "right-[-100%]"}`}
      >
        {/* top */}
        <CartTop handleCartNav={handleCartNav} />

        {cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <>
            <div className="h-[81vh] overflow-y-scroll scroll-smooth">
              {cartItems.map((item, i) => (
                <CartFilled key={i} item={item} />
              ))}
            </div>
          </>
        )}

        {/* bottom */}
        <CartBottom />
      </div>
    </>
  );
};

export default Cart;
