import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./Items";
import fetchStatusSlice from "./fetch";
import cartSlice from "./Cart";
import modalSlice from "./modal";

const appStore = configureStore({
  reducer: {
    items: itemSlice.reducer,
    cartItems:cartSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    modal:modalSlice.reducer
  },
});

export default appStore;
