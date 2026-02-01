import React from "react";
import { Link } from "react-router-dom";
import Ch9JE0GV from "../assets/images/1-Ch9JE0GV.png";
import BqD2fIC7 from "../assets/images/2-BqD2fIC7.png";
import Bg8f3bcT from "../assets/images/3-Bg8f3bcT.png";
import CGk6D0183277n from "../assets/images/4-CGk6Ds5n.png";

interface BlogPost {
  id: number;
  imageUrl: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    imageUrl: Ch9JE0GV,
    date: "September 12",
    readTime: "Read in 6 minutes",
    title: "Cactus & Succulent Care Tips",
    description:
      "Cacti are succulents are easy care plants for any home or patio.",
    link: "/blog",
  },
  {
    id: 2,
    imageUrl: BqD2fIC7,
    date: "September 13",
    readTime: "Read in 2 minutes",
    title: "Top 10 Succulents for Your Home",
    description: "Best in hanging baskets. Prefers medium to high light.",
    link: "/blog",
  },
  {
    id: 3,
    imageUrl: Bg8f3bcT,
    date: "September 15",
    readTime: "Read in 3 minutes",
    title: "Cacti & Succulent Care Tips",
    description:
      "Cacti and succulents thrive in containers and because most are.",
    link: "/blog",
  },
  {
    id: 4,
    imageUrl: CGk6D0183277n,
    date: "September 12",
    readTime: "Read in 6 minutes",
    title: "Best Houseplants Room by Room",
    description: "The benefits of houseplants are endless. In addition to..",
    link: "/blog",
  },
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-14 bg-white">
      <div className="w-[90%] max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Our Blog Posts
          </h2>
          <p className="text-gray-500 font-normal max-w-2xl mx-auto">
            We are an online plant shop offering a curated collection of tips
            and stories for plant lovers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="
                group flex flex-col bg-white rounded-2xl overflow-hidden
                border border-gray-100 shadow-sm
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]
              "
            >
              <Link
                to={post.link}
                className="relative block h-56 w-full overflow-hidden"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-500
                    group-hover:scale-[1.08]
                  "
                />

                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t from-black/35 via-black/10 to-transparent
                    opacity-70 group-hover:opacity-90
                    transition-opacity duration-300
                  "
                />

                <div
                  className="
                    absolute left-3 top-3
                    inline-flex items-center gap-2
                    bg-white/80 backdrop-blur
                    px-3 py-1.5 rounded-full
                    text-[11px] font-semibold
                    text-gray-700
                    border border-white/70
                    shadow-sm
                  "
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-[#46A358]" />
                  <span>{post.date}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{post.readTime}</span>
                </div>

                <span
                  className="
                    pointer-events-none absolute -left-1/2 top-0 h-full w-1/2
                    bg-gradient-to-r from-transparent via-white/25 to-transparent
                    -skew-x-12
                    opacity-0
                    group-hover:opacity-100
                    group-hover:translate-x-[220%]
                    transition-all duration-700
                  "
                />
              </Link>

              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3
                  className="
                    text-[16px] md:text-[17px]
                    font-extrabold text-gray-900 leading-snug
                    line-clamp-2
                    transition-colors duration-300
                    group-hover:text-[#2f7a3f]
                  "
                >
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
                  {post.description}
                </p>

                <div className="mt-2">
                  <Link
                    to={post.link}
                    className="
                      inline-flex items-center gap-2
                      text-sm font-bold
                      text-[#46A358]
                      transition-all duration-300
                      hover:text-[#2f7a3f]
                    "
                  >
                    <span className="relative">
                      Read More
                      <span
                        className="
                          absolute left-0 -bottom-1 h-[2px] w-0
                          bg-gradient-to-r from-[#46A358] to-emerald-300
                          transition-all duration-500
                          group-hover:w-full
                        "
                      />
                    </span>

                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="h-[3px] w-full bg-gradient-to-r from-[#46A358] via-emerald-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
