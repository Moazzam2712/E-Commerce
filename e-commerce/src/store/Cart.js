import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartItems",
  initialState: {
    cartItems: [],
    addAlert: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push({ ...action.payload, quantity: 1 });
      state.addAlert = true;
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    hideAlert: (state) => {
      state.addAlert = false;
    },
    incrementQuantity: (state, action) => {
      const itemIndex = state.cartItems.find(
        (item) => item.id === action.payload
      );
      itemIndex.quantity++;
    },
    decrementQuantity: (state, action) => {
      const itemIndex = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (itemIndex.quantity > 1) {
        itemIndex.quantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
