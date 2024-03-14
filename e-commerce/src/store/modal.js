import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    placeOrder:false,
    openModal: false,
  },
  reducers: {
 
    closeModal: (state) => {
      state.openModal = false;
      state.placeOrder = false;

    },
    placeOrder: (state) => {
      state.placeOrder = true;
      state.openModal = true;

    },

  },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
