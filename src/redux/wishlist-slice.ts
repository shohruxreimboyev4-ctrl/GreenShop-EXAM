import { createSlice } from "@reduxjs/toolkit";
import type { ProductType } from "../@types/AuthType";

interface InitialStateType {
  data: ProductType[];
}

const getInitialWishlistData = (): ProductType[] => {
  try {
    const raw = localStorage.getItem("wishlist");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ProductType[]) : [];
  } catch {
    return [];
  }
};

const initialState: InitialStateType = {
  data: getInitialWishlistData(),
};

const wishlistSlice = createSlice({
  name: "wishlist-slice",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const payload = action.payload as ProductType | undefined;
      if (!payload?._id) return;

      const isAlreadyInWishlist = state.data.some(
        (item) => item._id === payload._id,
      );

      if (!isAlreadyInWishlist) {
        state.data.push(payload);
        localStorage.setItem("wishlist", JSON.stringify(state.data));
      }
    },

    removeFromWishlist(state, action) {
      const productId = action.payload as string | undefined;
      if (!productId) return;

      state.data = state.data.filter((item) => item._id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(state.data));
    },

    toggleWishlist(state, action) {
      const payload = action.payload as ProductType | undefined;
      if (!payload?._id) return;

      const existingIndex = state.data.findIndex(
        (item) => item._id === payload._id,
      );

      if (existingIndex >= 0) {
        // Agar mavjud bo'lsa, o'chir
        state.data.splice(existingIndex, 1);
      } else {
        // Agar mavjud bo'lmasa, qo'sh
        state.data.push(payload);
      }

      localStorage.setItem("wishlist", JSON.stringify(state.data));
    },

    clearWishlist(state) {
      state.data = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
