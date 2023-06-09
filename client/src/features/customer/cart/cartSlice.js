import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartState: false,
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
  testQuant: 1,
};

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    setOpenCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },

    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },

    setAddItemToCartTwo: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        if (state.testQuant > 0) {
          state.cartItems[itemIndex].quantity += state.testQuant;
        }

        toast.success("Cart Updated");
      } else {
        const temp = { ...action.payload, quantity: state.testQuant };
        state.cartItems.push(temp);

        toast.success(`${action.payload.name} added to your Cart`);
      }

      state.testQuant = 1;

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setPreAdd: (state, action) => {
      state.testQuant += 1;

      toast.success("Item quantity increased");

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setPreDecrease: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].quantity > 1) {
        state.testQuant -= 1;
        toast.success("Item quantity decreased");
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setAddItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      console.log(itemIndex);

      // -1 more than or equal 0
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        toast.success("Item quantity increased");
      } else {
        const temp = { ...action.payload, quantity: 1 };
        state.cartItems.push(temp);

        toast.success(`${action.payload.name} added to your Cart`);
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setIncreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        toast.success("Item quantity increased");
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setDecreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
        toast.success("Item quantity decreased");
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setRemoveItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      state.cartItems = removeItem;

      toast.success(`${action.payload.name} removed from your Cart`);

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setClearCart: (state) => {
      state.cartItems = [];

      toast.success("Cart Cleared");

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setGetTotals: (state) => {
      let { totalAmount, totalQuantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          cartTotal.totalAmount += cartItem.price * cartItem.quantity;
          cartTotal.totalQuantity += cartItem.quantity;

          return cartTotal;
        },
        {
          totalAmount: 0,
          totalQuantity: 0,
        }
      );

      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQuantity;

      ////////////////////////////////////////////////////////

      // let totalAmount = 0;
      // let totalQuantity = 0;

      // state.cartItems.forEach((cartItem) => {
      //   totalAmount += cartItem.quantity * cartItem.price;
      //   totalQuantity += cartItem.quantity;
      // });

      // state.cartTotalAmount = totalAmount;
      // state.cartTotalQuantity = totalQuantity;
    },
  },
});

export const {
  setOpenCart,
  setCloseCart,
  setAddItemToCart,
  setRemoveItemFromCart,
  setClearCart,
  setIncreaseItemQTY,
  setDecreaseItemQTY,
  setGetTotals,
  setPreAdd,
  setPreDecrease,
  setAddItemToCartTwo,
} = cartSlice.actions;
export default cartSlice.reducer;
