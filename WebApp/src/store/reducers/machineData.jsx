// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  machineStatus: {},
  machines: [],
  location: [],
};

const machineData = createSlice({
  name: "machineData",
  initialState,
  reducers: {
    newMachineStatus(state, action) {
      state.machineStatus = action.payload;
    },
    setMachines(state, action) {
      state.machines = action.payload.machines;
    },
    setLocation(state, action) {
      state.location = action.payload.location;
    },
  },
});

export default machineData.reducer;

export const { newMachineStatus, setMachines, setLocation } =
  machineData.actions;
