import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  products: [],
  mobiles: [],
  laptops: [],
  currentPage: 1,
  status: "start",
  error: null,
};

const url = "https://66aca538f009b9d5c732e515.mockapi.io/products";

export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
  const response = await axios.get(url);
  return response.data;
});

export const fetchProductsIsMobile = createAsyncThunk("product/fetchProductsIsMobile", async () => {
  const response = await axios.get(`${url}?type=mobile`);
  return response.data;
});

export const fetchProductsIsLaptop = createAsyncThunk("product/fetchProductsIsLaptop", async () => {
  const response = await axios.get(`${url}?type=laptop`);
  return response.data;
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "successed";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductsIsMobile.fulfilled, (state, action) => {
        state.status = "successed";
        state.mobiles = action.payload;
      })
      .addCase(fetchProductsIsLaptop.fulfilled, (state, action) => {
        state.status = "successed";
        state.laptops = action.payload;
      })
  },
});

export default productSlice.reducer;
