import { User } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// State type
type AuthState = {
  user: User | null;
};
// initialState
const initialState: AuthState = {
  user: null,
};
// create slicer

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});
// export actions
export const { setUser } = authSlice.actions;
// export default slicer  ( this slicer )

export default authSlice.reducer;
