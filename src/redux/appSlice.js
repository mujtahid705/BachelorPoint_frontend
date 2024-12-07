import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLoggedin: (state, action) => {
      state.isLoggedin = action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = appSlice.actions;

export default appSlice.reducer;
