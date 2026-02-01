import React from "react";
import { Card, Empty, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Search } from "lucide-react";

import {
  useReduxSelector,
  useReduxDispatch,
} from "../../../hooks/useRedux/useRedux";
import { toggleWishlist } from "../../../redux/wishlist-slice";
import { getData } from "../../../redux/shop-slice";

const { Text } = Typography;

const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();

  const { data: items } = useReduxSelector((state) => state.wishlistSlice);

  const onAddToCart = (p: any) => {
    dispatch(getData(p));
  };

  const onToggleHeart = (p: any) => {
    dispatch(toggleWishlist(p));
  };

  const onOpenProduct = (p: any) => {
    const category = p?.category || "all-plants";
    navigate(`/shop/${category}/${p._id}`);
  };

  return (
    <div>
      <h2>Wishlist</h2>

      <p style={{ marginBottom: 12 }}>
        {items.length === 0
          ? "No liked products yet."
          : `Saved items: ${items.length}`}
      </p>

      {items.length === 0 ? (
        <Card>
          <Empty
            description="Wishlist is empty"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p: any) => (
            <Card
              key={p._id}
              hoverable
              style={{ borderRadius: 12, overflow: "hidden" }}
              cover={
                <div className="relative group h-[180px] bg-[#f5f5f5] overflow-hidden flex items-center justify-center">
                  {p.main_image ? (
                    <img
                      src={p.main_image}
                      alt={p.title || "product"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No image</span>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div
                    className="absolute left-1/2 bottom-4 -translate-x-1/2 flex items-center gap-3
                                  opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0
                                  transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onAddToCart(p);
                      }}
                      className="h-10 w-10 rounded-xl bg-white shadow-md flex items-center justify-center
                                 hover:shadow-lg active:scale-95 transition-all"
                      aria-label="Add to cart"
                      title="Add to cart"
                    >
                      <ShoppingCart className="w-5 h-5 text-[#3D3D3D]" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleHeart(p);
                      }}
                      className="h-10 w-10 rounded-xl bg-[#FF5A5A] shadow-md flex items-center justify-center
                                 hover:shadow-lg active:scale-95 transition-all"
                      aria-label="Remove from wishlist"
                      title="Remove"
                    >
                      <Heart className="w-5 h-5 text-white fill-white" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onOpenProduct(p);
                      }}
                      className="h-10 w-10 rounded-xl bg-white shadow-md flex items-center justify-center
                                 hover:shadow-lg active:scale-95 transition-all"
                      aria-label="View product"
                      title="View"
                    >
                      <Search className="w-5 h-5 text-[#3D3D3D]" />
                    </button>
                  </div>
                </div>
              }
              onClick={() => onOpenProduct(p)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Text strong className="block truncate">
                    {p.title || "Untitled"}
                  </Text>
                  <Text type="secondary" className="text-xs">
                    {p.category || "—"}
                  </Text>
                </div>

                <Text strong style={{ color: "#46A358" }}>
                  ${Number(p.price || 0).toFixed(2)}
                </Text>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
