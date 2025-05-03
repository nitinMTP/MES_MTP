import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers/reducers";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const { dispatch } = store;

export { store, dispatch };
