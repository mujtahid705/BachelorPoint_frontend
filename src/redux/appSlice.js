import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  isLoading: false,
  user: null,
  triggerReload: false,
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

    setTriggerReload: (state) => {
      state.triggerReload = !state.triggerReload;
    },
  },
});

export const { setIsLoggedin, setIsLoading, setUser, setTriggerReload } =
  appSlice.actions;

export default appSlice.reducer;
