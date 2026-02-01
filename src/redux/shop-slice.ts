import { createSlice } from "@reduxjs/toolkit";
import type { ProductType, ShopCartType } from "../@types/AuthType";

interface InitialStateType {
  data: ShopCartType[];
}

const getInitialShopData = (): ShopCartType[] => {
  try {
    const raw = localStorage.getItem("shop");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ShopCartType[]) : [];
  } catch {
    return [];
  }
};

const initialState: InitialStateType = {
  data: getInitialShopData(),
};

const shopSlice = createSlice({
  name: "shop-slice",
  initialState,
  reducers: {
    getData(state, action) {
      const payload = action.payload as ProductType | undefined;
      if (!payload?._id) return;

      const existingItem = state.data.find((item) => item._id === payload._id);

      if (existingItem) {
        existingItem.counter += 1;
        existingItem.userPrice = existingItem.price * existingItem.counter;
      } else {
        state.data.push({
          ...(payload as ProductType),
          counter: 1,
          userPrice: payload.price,
        } as ShopCartType);
      }

      localStorage.setItem("shop", JSON.stringify(state.data));
    },

    deleteData(state, action) {
      const id = action.payload as string | undefined;
      if (!id) return;

      state.data = state.data.filter((item) => item._id !== id);
      localStorage.setItem("shop", JSON.stringify(state.data));
    },

    increment(state, action) {
      const id = action.payload as string | undefined;
      if (!id) return;

      const item = state.data.find((item) => item._id === id);
      if (item) {
        item.counter += 1;
        item.userPrice = item.price * item.counter;
        localStorage.setItem("shop", JSON.stringify(state.data));
      }
    },

    decrement(state, action) {
      const id = action.payload as string | undefined;
      if (!id) return;

      const item = state.data.find((item) => item._id === id);
      if (item && item.counter > 1) {
        item.counter -= 1;
        item.userPrice = item.price * item.counter;
        localStorage.setItem("shop", JSON.stringify(state.data));
      }
    },
  },
});

export const { getData, deleteData, increment, decrement } = shopSlice.actions;
export default shopSlice.reducer;
