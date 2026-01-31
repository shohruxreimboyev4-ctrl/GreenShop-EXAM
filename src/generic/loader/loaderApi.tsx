import React from "react";
import SkeletonLoader from "../../components/generic/SkeletonLoader";

const loaderApi = () => {
  const cateGoryLoader = (count = 9) => {
    return <SkeletonLoader variant="list" count={count} />;
  };
  return { cateGoryLoader };
};

export { loaderApi };
