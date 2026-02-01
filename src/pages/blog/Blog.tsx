import BlogSectionInfo from "../../components/BlogSectionInfo";
import MonetizeSection from "../../components/MonetizeSection";
import { memo } from "react";

const Blog = () => {
  return (
    <div>
      <MonetizeSection />
      <BlogSectionInfo />
    </div>
  );
};

export default memo(Blog);
