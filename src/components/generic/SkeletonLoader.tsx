import React from "react";

type Variant = "card" | "blog" | "list";

interface Props {
  variant?: Variant;
  count?: number;
}

const SkeletonLoader: React.FC<Props> = ({ variant = "card", count = 6 }) => {
  const items = Array.from({ length: count });

  if (variant === "card") {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((_, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-md shadow-sm animate-pulse flex flex-col gap-3 items-start h-[300px]"
            >
              <div className="w-full h-44 bg-gray-200 rounded-md" />
              <div className="w-3/4 h-4 bg-gray-200 rounded" />
              <div className="w-1/2 h-4 bg-gray-200 rounded" />
              <div className="mt-auto w-full h-10 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "blog") {
    return (
      <div className="w-full">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // default: list
  return (
    <div className="w-full">
      <div className="space-y-4">
        {items.map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-md shadow-sm animate-pulse"
          >
            <div className="w-16 h-16 bg-gray-200 rounded" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
