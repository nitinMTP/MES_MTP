// types
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstLogIn: false,
  loggedIn: false,
  user: {},
  token: null,
  tokenDecoded: null,
  acccessLevel: 1,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn(state, action) {
      state.loggedIn = action.payload.loggedIn;
      state.user = action.payload.user;
      state.firstLogIn = action.payload.firstLogIn;
      state.acccessLevel = 1;
      state.token = action.payload.token;
      state.tokenDecoded = action.payload.tokenDecoded;
    },
    logOut(state) {
      state.loggedIn = false;
      state.user = {};
      state.acccessLevel = null;
      state.token = null;
      state.tokenDecoded = null;
    },
  },
});

export default user.reducer;

export const { logIn, logOut } = user.actions;
