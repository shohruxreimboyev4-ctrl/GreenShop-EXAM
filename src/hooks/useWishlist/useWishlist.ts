import { useCallback, useMemo } from "react";
import { message } from "antd";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../useRedux/useRedux";
import {
  addToWishlist as addToWishlistAction,
  removeFromWishlist as removeFromWishlistAction,
} from "../../redux/wishlist-slice";
import type { ProductType } from "../../@types/AuthType";

export const useWishlist = () => {
  const dispatch = useReduxDispatch();
  const { data: wishlistItems } = useReduxSelector(
    (state) => state.wishlistSlice,
  );

  const toggleWishlist = useCallback(
    (product: ProductType) => {
      try {
        const isInWishlist = wishlistItems.some(
          (item) => item._id === product._id,
        );

        if (isInWishlist) {
          dispatch(removeFromWishlistAction(product._id));
          message.success("Removed from wishlist");
        } else {
          dispatch(addToWishlistAction(product));
          message.success("Added to wishlist ❤️");
        }
        return true;
      } catch (error: any) {
        console.error("Wishlist error:", error);
        message.error(error?.message || "Error updating wishlist");
        return false;
      }
    },
    [dispatch, wishlistItems],
  );

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlistItems.some((item) => item._id === productId);
    },
    [wishlistItems],
  );

  return { toggleWishlist, isInWishlist, wishlistItems };
};
