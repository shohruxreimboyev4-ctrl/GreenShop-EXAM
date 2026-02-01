import React from "react";
import x9mMEaU from "../assets/images/2-6x9mMEaU.png";
import Bhbx3ro7 from "../assets/images/1-Bhbx3ro7.png";
import Ellipse8 from "../assets/images/Ellipse8.png";
import Ellipse7 from "../assets/images/Ellipse7.png";

interface PlantData {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface PlantPromoCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const promoData: PlantData[] = [
  {
    id: 1,
    title: "SUMMER CACTUS & SUCCULENTS",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants",
    image: Bhbx3ro7,
    link: "/shop/cactus",
  },
  {
    id: 2,
    title: "STYLING TRENDS & MUCH MORE",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants",
    image: x9mMEaU,
    link: "/shop/styling",
  },
];

const PlantPromoCard: React.FC<PlantPromoCardProps> = ({
  title,
  description,
  image,
  link,
}) => {
  return (
    <div
      className="
        group relative flex items-center justify-between
        rounded-2xl border border-gray-100
        bg-gradient-to-b from-white to-[#fbfbfb]
        px-7 sm:px-8 py-6
        shadow-[0_10px_30px_rgba(0,0,0,0.06)]
        overflow-hidden min-h-[250px]
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]
      "
    >
      <div className="absolute z-10 bottom-[-28px] left-[-14px] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <img src={Ellipse8} alt="" />
      </div>
      <div className="absolute z-10 bottom-[-28px] left-[6px] opacity-70 group-hover:opacity-95 transition-opacity duration-300">
        <img src={Ellipse7} alt="" />
      </div>

      <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#46A358]/10 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-emerald-300/10 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

      <span
        className="
          pointer-events-none absolute -left-1/2 top-0 h-full w-1/2
          bg-gradient-to-r from-transparent via-white/25 to-transparent
          -skew-x-12
          opacity-0
          group-hover:opacity-100 group-hover:translate-x-[240%]
          transition-all duration-700
        "
      />

      <div className="relative z-20 w-[40%] flex items-end justify-start">
        <img
          src={image}
          alt={title}
          className="
            max-h-[180px] object-contain
            transition-transform duration-500
            group-hover:scale-[1.06] group-hover:-rotate-[1deg]
          "
        />
      </div>

      <div className="relative z-20 w-[60%] flex flex-col justify-center text-right">
        <h3 className="font-family font-black text-[18px] sm:text-[19px] leading-[1.25] uppercase text-[#2f2f2f] mb-3 max-w-[280px] ml-auto">
          {title}
        </h3>

        <p className="font-family font-normal text-[14px] leading-[1.75] text-[#6f6f6f] mb-6 max-w-[300px] ml-auto">
          {description}
        </p>

        <a
          href={link}
          className="
            relative inline-flex items-center justify-center gap-2
            font-family font-semibold text-[14px]
            px-6 py-2.5 rounded-xl w-fit ml-auto
            text-white
            bg-[#46a358]
            shadow-[0_12px_25px_rgba(70,163,88,0.25)]
            transition-all duration-300
            hover:bg-[#357a40]
            hover:-translate-y-[2px]
            hover:shadow-[0_16px_34px_rgba(70,163,88,0.33)]
            active:translate-y-0 active:scale-[0.99]
          "
        >
          <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/0 via-white/18 to-white/0" />
          <span className="relative">Find More</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

const PlantPromoSection: React.FC = () => {
  return (
    <section className="w-[90%] max-w-[1400px] mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {promoData.map((item) => (
          <PlantPromoCard
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
};

export default PlantPromoSection;
