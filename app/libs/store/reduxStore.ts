import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "@/app/libs/store/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlicer,
  },
});
export type StoreState = ReturnType<typeof store.getState>; // type for store
export type AppDispatch = typeof store.dispatch; // type for dispatcher
