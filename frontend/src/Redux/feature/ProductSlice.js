import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const find = state.find((item) =>
        console.log(item.id === action.payload.id, "hello")
      );
      if (find) {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: item.total + item.price,
              }
            : item
        );
      } else {
        state.push(action.payload);
        action.payload.qty = 1;
        action.payload.total = action.payload.price;
      }
    },
    removeItem: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },

    incQty: (state, action) => {
      state.map((item) => {
        if (item._id === action.payload) {
          return (item.total = (item.qty += 1) * item.price);
          // return item.qty += 1;
        }
        return state;
      });
    },
    decQty: (state, action) => {
      console.log(state, "state");
      console.log("hello -------------------------------", action.payload);
      state.map((item) => {
        if (item._id === action.payload) {
          if (item.qty > 1) {
            return (item.total = (item.qty -= 1) * item.price);
            // return item.qty -= 1;
          }
        }
        return state;
      });
    },
  },
});

export const { addToCart, removeItem, incQty, decQty } = productSlice.actions;

export default productSlice.reducer;
