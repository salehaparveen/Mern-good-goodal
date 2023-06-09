import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currImg: 0,
};

const sliderSlice = createSlice({
  initialState,
  name: "slider",
  reducers: {
    setCurrImg: (state, action) => {
      state.currImg = action.payload.currImg;
    },
  },
});

export const { setCurrImg } = sliderSlice.actions;
export default sliderSlice.reducer;
