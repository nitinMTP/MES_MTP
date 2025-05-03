// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  systemStatus: [],
};

const systemData = createSlice({
  name: "systemData",
  initialState,
  reducers: {
    newSystemStatus(state, action) {
      state.systemStatus = action.payload;
    },
  },
});

export default systemData.reducer;

export const { newSystemStatus } = systemData.actions;
