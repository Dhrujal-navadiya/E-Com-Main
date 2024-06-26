import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/ProductSlice";

export const store = configureStore({
  reducer: {
    allCart: productReducer,
  },
});
