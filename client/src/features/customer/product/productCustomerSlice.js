import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  sortOrder: "",
  search: "",
  filterCategory: "All",
  page: 1,

  productsStatus: "idle",
  products: {},
  error: null, // for errors
};

// READ products
export const readCustomerProducts = createAsyncThunk(
  "productsCustomer/readCustomerProducts",
  async (_, thunkAPI) => {
    const { sortOrder, search, filterCategory, page } =
      thunkAPI.getState().productsCustomer;

    // let base_url = "http://localhost:7001/api/products";

    let base_url = "https://goodal-mern.onrender.com/api/products";

    try {
      base_url = `${base_url}?page=${page}&sort=${sortOrder}&category=${filterCategory.toString()}&search=${search}`;

      console.log(base_url);

      const response = await fetch(base_url);
      const data = await response.json();

      console.log(data);

      if (response.ok) {
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const productCustomerSlice = createSlice({
  initialState,
  name: "productsCustomer",
  reducers: {
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // READ products
      .addCase(readCustomerProducts.pending, (state) => {
        state.productsStatus = "loading";
      })
      .addCase(readCustomerProducts.fulfilled, (state, action) => {
        state.productsStatus = "succeeded";
        state.products = action.payload;
        state.error = null;
      })
      .addCase(readCustomerProducts.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.error = action.payload.error;
      });
  },
});

export const { setSortOrder, setSearch, setFilterCategory, setPage } =
  productCustomerSlice.actions;
export default productCustomerSlice.reducer;
