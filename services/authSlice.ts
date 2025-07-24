import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  session: any;
}

const initialState: AuthState = {
  session: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<any>) => {
      state.session = action.payload;
    },
    clearSession: (state)=>{
        state.session = null;
    }
  },
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
