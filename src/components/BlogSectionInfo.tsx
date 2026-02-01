import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaRegComment, FaRegHeart, FaSearch } from "react-icons/fa";
import SkeletonLoader from "./generic/SkeletonLoader";
import { useQueryHandler } from "../hooks/useQuery/UseQuery";
import { useReduxSelector } from "../hooks/useRedux/useRedux";

interface BlogType {
  _id: string;
  title: string;
  short_description: string;
  content: string;
  created_at: string;
  created_by: string;
  views?: number;
  likes?: number;
  comments_count?: number;
}

const BlogSectionInfo = () => {
  const navigate = useNavigate();
  const user = useReduxSelector((state: any) => state.userSlice.user);

  const [q, setQ] = useState("");
  const [list, setList] = useState<BlogType[]>([]);
  const [typing, setTyping] = useState(false);
  const [needle, setNeedle] = useState("");

  const tRef = useRef<number | null>(null);

  const { data: apiData = [], isLoading } = useQueryHandler({
    url: "user/blog",
    pathname: "blog",
    param: { search: "" },
  });

  const CACHE_KEY = "blogs_cache_v2";

  useEffect(() => {
    const fromApi = Array.isArray(apiData) ? apiData : [];
    if (fromApi.length) {
      setList(fromApi);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(fromApi));
      } catch {}
      return;
    }

    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setList(parsed);
    } catch {}
  }, [apiData]);

  useEffect(() => {
    setTyping(true);

    if (tRef.current) clearTimeout(tRef.current);
    tRef.current = window.setTimeout(() => {
      setNeedle(q.trim().toLowerCase());
      setTyping(false);
      tRef.current = null;
    }, 420);

    return () => {
      if (tRef.current) {
        clearTimeout(tRef.current);
        tRef.current = null;
      }
    };
  }, [q]);

  const onSearchClick = () => {
    setTyping(true);
    if (tRef.current) clearTimeout(tRef.current);

    tRef.current = window.setTimeout(() => {
      setNeedle(q.trim().toLowerCase());
      setTyping(false);
      tRef.current = null;
    }, 160);
  };

  const onClear = () => {
    setQ("");
    setNeedle("");
  };

  const filtered = useMemo(() => {
    if (!needle) return list;

    return list.filter((b) => {
      const title = (b.title || "").toLowerCase();
      const short = (b.short_description || "").toLowerCase();
      const content = (b.content || "").toLowerCase();
      return (
        title.includes(needle) ||
        short.includes(needle) ||
        content.includes(needle)
      );
    });
  }, [list, needle]);

  return (
    <div className="w-[90%] max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {user && (
        <div className="mb-10 flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="relative rounded-full p-[1.5px] bg-gradient-to-r from-green-400/60 via-emerald-400/40 to-lime-300/50 shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
              <div className="rounded-full bg-white">
                <div className="flex items-center gap-2 sm:gap-3 px-3 py-2">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <FaSearch className="text-gray-500" />
                  </div>

                  <div className="relative flex-1">
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search articles, tips, plants..."
                      className="
                        w-full
                        h-10 sm:h-11
                        bg-transparent
                        text-gray-900
                        placeholder:text-gray-400
                        outline-none
                        text-sm sm:text-[15px]
                        pr-24
                      "
                    />

                    {typing && (
                      <span className="absolute right-16 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        ...
                      </span>
                    )}

                    {!!q && (
                      <button
                        type="button"
                        onClick={onClear}
                        className="
                          absolute right-3 top-1/2 -translate-y-1/2
                          w-8 h-8
                          rounded-full
                          border border-gray-200
                          bg-white
                          text-gray-500
                          hover:text-gray-900
                          hover:border-gray-300
                          transition-all
                          active:scale-95
                        "
                        aria-label="Clear search"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <button
                    onClick={onSearchClick}
                    className="
                      h-10 sm:h-11
                      px-4 sm:px-6
                      rounded-full
                      bg-[#46a358]
                      text-white
                      font-semibold
                      text-sm sm:text-[15px]
                      transition-all duration-200
                      hover:bg-[#3d8f4d]
                      hover:shadow-[0_14px_30px_rgba(70,163,88,0.28)]
                      active:scale-[0.98]
                      whitespace-nowrap
                    "
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="pointer-events-none absolute -top-8 -left-10 w-28 h-28 bg-green-400/15 blur-2xl rounded-full" />
              <div className="pointer-events-none absolute -bottom-8 -right-10 w-28 h-28 bg-emerald-400/15 blur-2xl rounded-full" />
            </div>

            <div className="mt-3 text-center text-xs sm:text-sm text-gray-500">
              Type to filter. Press{" "}
              <span className="font-semibold">Search</span> for instant apply.
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {typing || (isLoading && list.length === 0) ? (
          <SkeletonLoader variant="card" count={6} />
        ) : filtered.length === 0 ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12">
            <div className="max-w-lg mx-auto rounded-2xl border border-gray-200 bg-gray-50 px-6 py-8">
              <p className="text-gray-800 font-bold text-lg mb-1">No results</p>
              <p className="text-gray-500">
                {q
                  ? `"${q}" bo'yicha natija topilmadi.`
                  : "Hozircha bloglar mavjud emas."}
              </p>
            </div>
          </div>
        ) : (
          filtered.map((blog) => (
            <div
              key={blog._id}
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border border-gray-200
                bg-white
                p-6
                cursor-pointer
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]
                active:translate-y-0
              "
            >
              <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-green-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#46a358] via-green-400 to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex flex-col h-full">
                <div className="mb-4">
                  <h3
                    className="
                      text-base sm:text-lg
                      font-extrabold
                      text-gray-900
                      leading-snug
                      line-clamp-2
                      transition-colors
                      group-hover:text-[#2f7a3f]
                    "
                  >
                    {blog.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-4">
                    {blog.short_description || blog.content}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 bg-white transition-all group-hover:border-green-200">
                      <FaEye className="text-gray-400 group-hover:text-[#46a358] transition-colors" />
                      <span className="font-medium">{blog.views ?? 0}</span>
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 bg-white transition-all group-hover:border-blue-200">
                      <FaRegComment className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                      <span className="font-medium">
                        {blog.comments_count ?? 0}
                      </span>
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 bg-white transition-all group-hover:border-pink-200">
                      <FaRegHeart className="text-gray-400 group-hover:text-pink-500 transition-colors" />
                      <span className="font-medium">{blog.likes ?? 0}</span>
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#46a358] opacity-80 group-hover:opacity-100 transition-opacity">
                      Read more
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogSectionInfo;
