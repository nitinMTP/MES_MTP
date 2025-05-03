// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  from: null,
  to: null,
};

// ==============================|| SLICE - MachineInfo ||============================== //

const machineInfo = createSlice({
  name: "machineInfo",
  initialState,
  reducers: {
    setFromTo(state, action) {
      state.from = new Date(action.payload.from).getTime();
      state.to = new Date(action.payload.to).getTime();
      // console.log("Action Payload From and To : ", action.payload);
      // console.log(state.from);
      // console.log(state.to);
    },
  },
});

export default machineInfo.reducer;

export const { setFromTo } = machineInfo.actions;
