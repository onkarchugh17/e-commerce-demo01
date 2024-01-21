import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  fetchAllProducts,
  fetchProductsByFilters,
  fetchCategory,
  fetchBrand,
  fetchProductById,
  createNewProduct,
  updateProduct,
} from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  categories: [],
  brands: [],
  product: null,
};

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination);
    return response.data;
  }
);

export const fetchCategoryAsync = createAsyncThunk(
  "product/fetchCategory",
  async () => {
    const response = await fetchCategory();
    return response.data;
  }
);

export const fetchBrandAsync = createAsyncThunk(
  "product/fetchBrand",
  async () => {
    const response = await fetchBrand();
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const createNewProductAsync = createAsyncThunk(
  "product/createNewProduct",
  async (product) => {
    const response = await createNewProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.product = action.payload;
      })
      .addCase(createNewProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const getAllProducts = (state) => state.product.products;
export const getTotalItems = (state) => state.product.totalItems;
export const getCategories = (state) => state.product.categories;
export const getBrands = (state) => state.product.brands;
export const getProductDetails = (state) => state.product.product;

export default productSlice.reducer;
