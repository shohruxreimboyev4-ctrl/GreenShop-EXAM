import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { AuthType } from "../@types/AuthType";

interface InitialStateType {
  user?: AuthType | null;
  isAuth: boolean;
}

const getUserFromCookie = (): AuthType | null => {
  try {
    const userCookie = Cookies.get("user");
    if (!userCookie) return null;
    return JSON.parse(userCookie) as AuthType;
  } catch {
    return null;
  }
};

const initialState: InitialStateType = {
  user: getUserFromCookie(),
  isAuth: !!getUserFromCookie(),
};

export const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload;
      state.isAuth = true;

      Cookies.set("user", JSON.stringify(action.payload));
    },

    logout(state) {
      state.user = null;
      state.isAuth = false;

      Cookies.remove("user");
    },
  },
});

export const { getUser, logout } = userSlice.actions;
export default userSlice.reducer;
