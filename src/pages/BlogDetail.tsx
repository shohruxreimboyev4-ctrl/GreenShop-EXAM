import React from "react";
import SkeletonLoader from "../components/generic/SkeletonLoader";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryHandler } from "../hooks/useQuery/UseQuery";
import { FaEye, FaRegComment, FaRegHeart, FaShareAlt } from "react-icons/fa";

export interface BlogType {
  _id: string;
  title: string;
  short_description: string;
  content: string;
  created_by: string;
  created_at: string;
  reaction_length: number;
  views?: number;
  likes?: number;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: blogData,
    isLoading,
    error,
  } = useQueryHandler({
    url: `user/blog/${id}`,
    pathname: `blog-detail-${id}`,
    param: {},
  });

  if (isLoading) {
    return (
      <div className="w-[90%] max-w-[1400px] mx-auto px-4 py-10">
        <SkeletonLoader variant="blog" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[90%] max-w-[900px] mx-auto px-4 py-12">
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-center">
          Xatolik yuz berdi
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="w-[90%] max-w-[900px] mx-auto px-4 py-12">
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-600 text-center">
          Blog topilmadi
        </div>
      </div>
    );
  }

  const blog: BlogType = Array.isArray(blogData)
    ? (blogData[0] as BlogType)
    : (blogData as BlogType);

  return (
    <div className="w-[90%] max-w-[1400px] mx-auto px-4 py-10 bg-white">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="text-base leading-none">←</span> Back
          </button>

          <div className="h-5 w-[1px] bg-gray-200" />

          <span className="text-xs text-gray-500">
            {blog.created_at
              ? new Date(blog.created_at).toLocaleDateString()
              : ""}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          {blog.title}
        </h1>
      </div>

      {blog.short_description && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            {blog.short_description}
          </p>
        </div>
      )}

      {blog.content ? (
        <div className="mb-8 rounded-xl border border-gray-100 bg-white shadow-sm">
          <div
            className="prose prose-gray max-w-none p-6 md:p-8 text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      ) : (
        <p className="text-gray-600 mb-8">Blog content mavjud emas.</p>
      )}


      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-gray-600 border-t pt-5">
        <div className="flex flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 cursor-pointer hover:border-blue-200 hover:text-blue-600 transition-colors">
            <FaEye />{" "}
            <span className="text-sm font-medium">{blog.views ?? 0}</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 cursor-pointer hover:border-pink-200 hover:text-pink-600 transition-colors">
            <FaRegHeart />{" "}
            <span className="text-sm font-medium">{blog.likes ?? 0}</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 cursor-pointer hover:border-blue-200 hover:text-blue-600 transition-colors">
            <FaRegComment />{" "}
            <span className="text-sm font-medium">
              {blog.reaction_length ?? 0}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 cursor-pointer hover:border-emerald-200 hover:text-emerald-600 transition-colors">
            <FaShareAlt /> <span className="text-sm font-medium">0</span>
          </div>
        </div>

        <div className="sm:ml-auto text-xs text-gray-500">
          Author:{" "}
          <span className="font-medium text-gray-700">{blog.created_by}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
