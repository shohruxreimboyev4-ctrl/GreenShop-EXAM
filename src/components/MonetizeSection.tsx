import React from "react";
import blogheaderhi2KeX2m from "../assets/images/blog-header-hi2KeX2m.png";
import { useReduxDispatch, useReduxSelector } from "../hooks/useRedux/useRedux";
import { setAuthorizationModalVisibility } from "../redux/modal-store";

const MonetizeSection: React.FC = () => {
  const dispatch = useReduxDispatch();
  const user = useReduxSelector((state: any) => state.userSlice.user);

  const openAuthModal = () => {
    dispatch(setAuthorizationModalVisibility());
  };

  if (user) return null;

  return (
    <section className="py-6 sm:py-10 bg-white font-sans overflow-hidden">
      <div className="w-[95%] max-w-[1550px] sm:w-[90%] mx-auto">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={blogheaderhi2KeX2m}
            alt="GreenShop Banner"
            className="
              w-full h-auto object-cover mx-auto
              rounded-2xl
              transition-transform duration-700
              hover:scale-[1.02]
            "
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />

          <span
            className="
              pointer-events-none absolute -left-1/2 top-0 h-full w-1/2
              bg-gradient-to-r from-transparent via-white/25 to-transparent
              -skew-x-12
              opacity-0
              hover:opacity-100
              hover:translate-x-[240%]
              transition-all duration-700
            "
          />
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-5xl mt-5 sm:mt-7 font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
            Monetize your content <br className="hidden sm:block" />
            with{" "}
            <span className="relative inline-block text-[#46A358]">
              GreenShop
              <span className="absolute left-0 -bottom-2 h-[3px] w-full rounded-full bg-gradient-to-r from-[#46A358] via-emerald-300 to-transparent opacity-80" />
            </span>
          </h2>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-7 sm:mb-9 px-0 sm:px-4">
            GreenShop - a platform for buying and selling, publishing and
            monetizing all types of flowers: articles, notes, video, photos,
            podcasts or songs.
          </p>

          <button
            onClick={openAuthModal}
            className="
              group relative inline-flex items-center justify-center gap-2
              bg-[#46A358] text-white font-extrabold
              py-3 px-6 sm:py-3.5 sm:px-9
              text-sm sm:text-base rounded-xl
              transition-all duration-300
              shadow-[0_14px_30px_rgba(70,163,88,0.28)]
              hover:bg-[#3d8f4d]
              hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(70,163,88,0.36)]
              active:translate-y-0 active:scale-[0.99]
              w-full sm:w-auto
              focus:outline-none focus:ring-2 focus:ring-[#46A358]/35 focus:ring-offset-2
            "
          >
            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/0 via-white/15 to-white/0" />
            <span className="relative">Join GreenShop</span>

            <svg
              className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MonetizeSection;
