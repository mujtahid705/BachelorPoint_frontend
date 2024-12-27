import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  isLoading: false,
  user: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLoggedin: (state, action) => {
      state.isLoggedin = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setIsLoggedin, setIsLoading, setUser } = appSlice.actions;

export default appSlice.reducer;
