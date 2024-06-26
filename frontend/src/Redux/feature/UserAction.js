// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const UserAuth = createAsyncThunk("auth/fetchDetails", async () => {
//   try {
//     const response = await axios.post("http://localhost:8000/auth/signup");
//     console.log(response, "response");
//   } catch (error) {
//     console.log("error fetching userAuth api in", error);
//     throw error;
//   }
// });

// const initialState = {};

// const UserAction = createSlice({
//   name: "UserAuth",
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(UserAuth.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(UserAuth.fulfilled, (state, action) => {
//         state.loading = false;
//         state.recipeDetails = action.payload;
//       });
//   },
// });

// export default UserAction.reducer;
