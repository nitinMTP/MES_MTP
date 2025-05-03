// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  language: "en",
  mode: "dark",
  machineSort: "none",
  snackBarMessage: "",
  snackBarOpen: false,
  snackBarSeverity: "info",
  alertBoxOpen: false,
};

// ==============================|| SLICE - CONFIG ||============================== //

const siteConfig = createSlice({
  name: "siteConfig",
  initialState,
  reducers: {
    setMode(state, action) {
      state.mode = action.payload.mode;
    },
    setLanguage(state, action) {
      state.language = action.payload.language;
    },
    openSnackBar(state, action) {
      state.snackBarMessage = action.payload.message;
      state.snackBarSeverity = action.payload.severity;
      state.snackBarOpen = true;
    },
    closeSnackBar(state) {
      state.snackBarOpen = false;
    },
    openAlertBox(state) {
      state.alertBoxOpen = true;
    },
    setMachineSort(state, action) {
      state.machineSort = action.payload.machineSort;
    },
  },
});

export default siteConfig.reducer;

export const {
  setMode,
  setLanguage,
  openSnackBar,
  closeSnackBar,
  openAlertBox,
  setMachineSort,
} = siteConfig.actions;
