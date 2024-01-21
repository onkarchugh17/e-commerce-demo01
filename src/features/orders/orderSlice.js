import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders, updateOrder } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  totalOrderCount: 0,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({sort,pagination}) => {
    const response = await fetchAllOrders({sort,pagination});
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    removeOrder(state) {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalOrderCount = action.payload.totalOrderCount;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex((item)=>item.id===action.payload.id)
        state.orders[index] = action.payload
      });
  },
});

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectAllOrders = (state) => state.order.orders;
export const totalOrderCount = (state) => state.order.totalOrderCount;
export const { removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
