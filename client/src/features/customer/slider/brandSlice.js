import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currImg: 0,
};

const brandSlice = createSlice({
  initialState,
  name: "brand",
  reducers: {
    setCurrImg: (state, action) => {
      state.currImg = action.payload;
    },
  },
});

export const { setCurrImg } = brandSlice.actions;
export default brandSlice.reducer;
