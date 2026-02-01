import { Heart, Search, ShoppingCart } from "lucide-react";
import type { ProductType } from "../../@types/AuthType";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../hooks/useRedux/useRedux";
import { getData } from "../../redux/shop-slice";
import { useWishlist } from "../../hooks/useWishlist/useWishlist";

const Card = ({ product }: { product: ProductType }) => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const dispatch = useReduxDispatch();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isInWishlistState = isInWishlist(product._id);

  const { data } = useReduxSelector((state) => state.shopSlice);

  const handleViewDetails = () => {
    navigate(`/shop/${product.category}/${product._id}`);
  };

  const isInCart = useMemo(
    () => data.some((item: ProductType) => item._id === product._id),
    [data, product._id],
  );

  const addToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInCart) dispatch(getData(product));
  };

  // ✅ iconlar tiniq chiqishi uchun bitta umumiy class
  const iconBtnBase =
    "w-[35px] h-[35px] rounded-md flex items-center justify-center " +
    "cursor-pointer select-none shadow-md " +
    "transition-[transform,box-shadow,color,background-color] duration-200 ease-out " +
    "hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.97] " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#46A358]/40 " +
    "backdrop-blur-0 will-change-transform " +
    "[image-rendering:auto] [shape-rendering:geometricPrecision]";

  return (
    <div className="group">
      <div
        onClick={() => {
          if (window.innerWidth < 1024) {
            setIsMobileOpen((prev) => !prev);
          }
        }}
        className="
          relative w-full h-[300px] bg-[#f2f2f2]
          flex items-center justify-center
          overflow-hidden
          border-t-[3px] border-transparent hover:border-t-[#46A358]
          rounded-sm

          transition-[transform,box-shadow,border-color] duration-300 ease-out
          hover:-translate-y-[1px]
          hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]
        "
      >
        <img
          src={product.main_image}
          alt={product.title}
          className="
            w-[80%] h-[80%] object-contain mix-blend-multiply
            transition-transform duration-300 ease-out
            group-hover:scale-[1.03]
          "
        />

        <div
          className={`
            absolute left-1/2 -translate-x-1/2 flex gap-4 z-20

            /* ✅ blurni olib tashladik: iconlar hira bo‘lmaydi */
            transition-[opacity,transform,bottom] duration-300 ease-out
            ${isMobileOpen ? "opacity-100 bottom-6" : "opacity-0 -bottom-10"}
            ${isMobileOpen ? "translate-y-0" : "translate-y-2"}

            lg:opacity-0
            lg:-bottom-10
            lg:translate-y-2
            lg:group-hover:opacity-100
            lg:group-hover:bottom-6
            lg:group-hover:translate-y-0
          `}
        >
          <div
            onClick={addToCart}
            className={`${iconBtnBase} ${
              isInCart
                ? "bg-[#46A358] text-white hover:shadow-[0_8px_18px_rgba(70,163,88,0.25)]"
                : "bg-white text-[#3D3D3D] hover:text-[#46A358] hover:shadow-[0_8px_18px_rgba(0,0,0,0.10)]"
            }`}
            title={isInCart ? "Added to Cart" : "Add to Cart"}
          >
            <ShoppingCart size={20} className="opacity-100" />
          </div>

          <button
            type="button"
            disabled={isAddingToWishlist}
            onClick={(e) => {
              e.stopPropagation();
              setIsAddingToWishlist(true);
              const success = toggleWishlist(product);
              setIsAddingToWishlist(false);
              if (success && !isInWishlistState) {
                setTimeout(() => {
                  navigate("/profile/wishlist");
                }, 300);
              }
            }}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !isAddingToWishlist) {
                e.preventDefault();
                setIsAddingToWishlist(true);
                const success = toggleWishlist(product);
                setIsAddingToWishlist(false);
                if (success && !isInWishlistState) {
                  setTimeout(() => {
                    navigate("/profile/wishlist");
                  }, 300);
                }
              }
            }}
            className={`${iconBtnBase} ${
              isInWishlistState
                ? "bg-[#ff6b6b] text-white hover:shadow-[0_8px_18px_rgba(255,107,107,0.25)]"
                : "bg-white text-[#3D3D3D] hover:text-[#46A358] hover:shadow-[0_8px_18px_rgba(0,0,0,0.10)]"
            } ${
              isAddingToWishlist ? "opacity-60" : ""
            }`}
            title={isInWishlistState ? "Remove from Wishlist" : "Add to Wishlist"}
            aria-label="wishlist"
          >
            <Heart
              size={20}
              className={`opacity-100 ${
                isInWishlistState ? "fill-current" : ""
              } ${isAddingToWishlist ? "animate-pulse" : ""}`}
            />
          </button>

          <div
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className={`${iconBtnBase} bg-white text-[#3D3D3D] hover:text-[#46A358] hover:shadow-[0_8px_18px_rgba(0,0,0,0.10)]`}
            title="View Details"
          >
            <Search size={20} className="opacity-100" />
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col items-center lg:items-start">
        <h3 className="text-[#3D3D3D] text-[16px] font-normal truncate w-full lg:text-start text-center">
          {product.title}
        </h3>

        <div className="flex items-center gap-3 mt-1">
          <span className="text-[#46A358] font-bold text-[16px]">
            ${product.price}
          </span>

          {product.discount_price && (
            <span className="text-[#A5A5A5] text-[14px] line-through">
              ${product.discount_price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
