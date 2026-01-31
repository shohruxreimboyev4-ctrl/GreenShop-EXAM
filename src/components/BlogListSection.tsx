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
  },
  {
    id: 2,
    imageUrl: BqD2fIC7,
    date: "September 13",
    readTime: "Read in 2 minutes",
    title: "Top 10 Succulents for Your Home",
    description: "Best in hanging baskets. Prefers medium to high light.",
  },
  {
    id: 3,
    imageUrl: Bg8f3bcT,
    date: "September 15",
    readTime: "Read in 3 minutes",
    title: "Cacti & Succulent Care Tips",
    description:
      "Cacti and succulents thrive in containers and because most are.",
  },
  {
    id: 4,
    imageUrl: CGk6D0183277n,
    date: "September 12",
    readTime: "Read in 6 minutes",
    title: "Best Houseplants Room by Room",
    description: "The benefits of houseplants are endless. In addition to..",
  },
];

const BlogListSection: React.FC = () => {
  return (
    <section className="py-14 bg-white">
      <div className="w-[90%] max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
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
                group relative h-full
                rounded-2xl
                bg-gradient-to-b from-gray-50 to-white
                p-[1px]
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-[0_22px_55px_rgba(0,0,0,0.12)]
              "
            >
              <div className="rounded-2xl bg-white overflow-hidden h-full border border-gray-100">
                <Link
                  to="/blog"
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
                      pointer-events-none absolute inset-0
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                      bg-gradient-to-tr from-white/0 via-white/10 to-white/0
                    "
                  />

                  <div
                    className="
                      absolute left-3 top-3
                      flex items-center gap-2
                      rounded-full
                      px-3 py-1.5
                      text-[11px] font-semibold
                      text-gray-700
                      bg-white/80 backdrop-blur
                      border border-white/60
                      shadow-sm
                    "
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-[#46A358]" />
                    <span>{post.date}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{post.readTime}</span>
                  </div>

                  <div className="pointer-events-none absolute -top-10 -right-10 w-24 h-24 rounded-full bg-green-500/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="pointer-events-none absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-emerald-500/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>

                <div className="p-5 flex flex-col gap-3 h-full">
                  <h3
                    className="
                      text-[16px] font-extrabold text-gray-900 leading-snug
                      line-clamp-2
                      transition-colors duration-300
                      group-hover:text-[#2f7a3f]
                    "
                  >
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.description}
                  </p>

                  <div className="mt-2">
                    <Link
                      to="/blog"
                      className="
                        inline-flex items-center gap-2
                        text-sm font-bold
                        text-[#46A358]
                        transition-all duration-300
                        hover:text-[#2f7a3f]
                      "
                    >
                      Read More
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>

                  <div className="mt-2 h-[2px] w-0 bg-gradient-to-r from-[#46A358] to-emerald-300 transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogListSection;
