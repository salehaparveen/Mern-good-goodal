import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const url = "http://localhost:7001/api/products/";

const url = "https://goodal-mern.onrender.com/api/products/";

const initialState = {
  productData: {
    category: "",
    name: "",
    price: "",
    imgOne: "",
    imgTwo: "",
    description: [
      {
        detailOne: "",
        detailTwo: "",
      },
    ],
  },

  sortOrder: "",
  search: "",
  filterCategory: "All",
  currentId: null,

  productsStatus: "idle",
  loadingCreate: false, //  for create button in AdminAddForm
  loadingUpdate: false, //  for create button in AdminAddForm
  loadingDelete: false, // for delete button in AdminProducts
  products: [],
  error: null, // for errors
  emptyFields: [], // for input fields in AdminAddForm
};

// CREATE product
export const createAdminProduct = createAsyncThunk(
  "productsAdmin/createAdminProduct",
  async (product, thunkAPI) => {
    const { admin } = thunkAPI.getState().admin;

    if (!admin) {
      return thunkAPI.rejectWithValue({
        error: "User is not logged in.",
        emptyFields: [],
      });
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        thunkAPI.dispatch(setClearInputs());
        return data;
      } else {
        return thunkAPI.rejectWithValue({
          error: data.error,
          emptyFields: data.emptyFields,
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// READ products
export const readAdminProducts = createAsyncThunk(
  "productsAdmin/readAdminProducts",
  async (admin, thunkAPI) => {
    const { sortOrder, search, filterCategory } =
      thunkAPI.getState().productsAdmin;

    // let base_url = "http://localhost:7001/api/products";

    let base_url = "https://goodal-mern.onrender.com/api/products";

    try {
      base_url = `${base_url}?sort=${sortOrder}&category=${filterCategory.toString()}&search=${search}`;

      console.log(base_url);

      const response = await fetch(base_url, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
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

// UPDATE product
export const updateAdminProduct = createAsyncThunk(
  "productsAdmin/updateAdminProduct",
  async (dataObj, thunkAPI) => {
    const { admin } = thunkAPI.getState().admin;

    if (!admin) {
      return thunkAPI.rejectWithValue({
        error: "User is not logged in.",
      });
    }

    try {
      const response = await fetch(url + dataObj.currentId, {
        method: "PATCH",
        body: JSON.stringify(dataObj.productData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        thunkAPI.dispatch(setClearInputs());
        return data;
      } else {
        return thunkAPI.rejectWithValue({
          error: data.error,
          emptyFields: data.emptyFields,
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// DELETE product
export const deleteAdminProduct = createAsyncThunk(
  "productsAdmin/deleteAdminProduct",
  async (id, thunkAPI) => {
    const { admin } = thunkAPI.getState().admin;

    if (!admin) {
      return;
    }

    try {
      const response = await fetch(url + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        thunkAPI.dispatch(setClearInputs());
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const productAdminSlice = createSlice({
  initialState,
  name: "productsAdmin",
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
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
    setProductData: (state, action) => {
      state.productData = action.payload;
    },
    setClearErrors: (state) => {
      state.error = null;
      state.emptyFields = [];
    },
    setClearInputs: (state) => {
      state.productData = initialState.productData;
    },
  },
  extraReducers: (builder) => {
    builder

      // CREATE product
      .addCase(createAdminProduct.pending, (state) => {
        state.productsStatus = "loading";
        state.loadingCreate = true;
      })
      .addCase(createAdminProduct.fulfilled, (state, action) => {
        state.productsStatus = "succeeded";
        state.loadingCreate = false;
        state.products.productsData = [
          action.payload,
          ...state.products.productsData,
        ];
        state.error = null;
        state.emptyFields = [];
      })
      .addCase(createAdminProduct.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.loadingCreate = false;
        state.error = action.payload.error;
        state.emptyFields = action.payload.emptyFields;
      })

      // READ products
      .addCase(readAdminProducts.pending, (state) => {
        state.productsStatus = "loading";
      })
      .addCase(readAdminProducts.fulfilled, (state, action) => {
        state.productsStatus = "succeeded";
        state.products = action.payload;
        state.error = null;
      })
      .addCase(readAdminProducts.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.error = action.payload.error;
      })

      // UPDATE product
      .addCase(updateAdminProduct.pending, (state) => {
        state.productsStatus = "loading";
        state.loadingUpdate = true;
      })
      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        state.productsStatus = "succeeded";
        state.loadingUpdate = false;
        state.products.productsData = state.products.productsData.map(
          (product) =>
            product._id === action.payload._id ? action.payload : product
        );
        state.currentId = null;
        state.error = null;
        state.emptyFields = [];
      })
      .addCase(updateAdminProduct.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.loadingUpdate = false;
        state.error = action.payload.error;
        state.emptyFields = action.payload.emptyFields;
      })

      // DELETE product
      .addCase(deleteAdminProduct.pending, (state) => {
        state.productsStatus = "loading";
        state.loadingDelete = true;
      })
      .addCase(deleteAdminProduct.fulfilled, (state, action) => {
        state.productsStatus = "succeeded";
        state.loadingDelete = false;
        state.products.productsData = state.products.productsData.filter(
          (product) => product._id !== action.payload._id
        );
        state.error = null;
      })
      .addCase(deleteAdminProduct.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.loadingDelete = false;
        state.error = action.payload.error;
      });
  },
});

export const {
  setSortOrder,
  setSearch,
  setFilterCategory,
  setCurrentId,
  setProductData,
  setClearErrors,
  setClearInputs,
} = productAdminSlice.actions;
export default productAdminSlice.reducer;
