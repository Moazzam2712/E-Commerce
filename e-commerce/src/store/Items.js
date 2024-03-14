import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    categories: [
      "Smartphones",
      "Laptops",
      "Fragrances",
      "Skincare",
      "Groceries",
      "Home-Decoration",
    ],
    category: null,
    home: true,
    searchTerm: "",
    productId: null,
    product:{}
  },
  reducers: {
    addInitialItems: (state, action) => {
      state.items = action.payload;
    },

    selectCategory: (state, action) => {
      state.category = action.payload;
      state.home = false;
    },
    setHome: (state) => {
      state.home = true;
      state.category = null;
    },
    searchItems: (state, action) => {
      state.searchTerm = action.payload;
      state.home = false;
    },
    viewProduct:(state,action)=>{
      state.productId=action.payload;
    },
    setProduct:(state,action)=>{
      state.product={...action.payload};
    }
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice;
