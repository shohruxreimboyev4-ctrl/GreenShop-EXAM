import React, { useState } from "react";
import { Button, Carousel } from "antd";
import flower1 from "../assets/images/flower1.png";
import heroflower1 from "../assets/images/heroflower1.png";
import heroflower2 from "../assets/images/heroflower2.png";

const Showcase = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      subTitle: "WELCOME TO GREENSHOP",
      title: "LET'S MAKE A BETTER",
      highlight: "PLANET",
      description:
        "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
      buttonText: "SHOP NOW",
      image: flower1,
    },
    {
      id: 2,
      subTitle: "WELCOME TO GREENSHOP",
      title: "LET'S LIVE IN A BETTER",
      highlight: "PLANET",
      description:
        "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
      buttonText: "LET'S START",
      image: heroflower1,
    },
    {
      id: 3,
      subTitle: "WELCOME TO GREENSHOP",
      title: "LET'S OBSERVE A BETTER",
      highlight: "PLANET",
      description:
        "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
      buttonText: "GET CREDITS",
      image: heroflower2,
    },
  ];

  return (
    <div className="w-[90%] max-w-[1400px] mx-auto mt-4 rounded-2xl md:rounded-3xl overflow-hidden relative bg-[#F5F5F5]">
      <Carousel
        dots={false}
        autoplay
        pauseOnHover
        dotPlacement="bottom"
        afterChange={(current) => setActiveSlide(current)}
        swipeToSlide
        draggable
      >
        {slides.map((slide, idx) => (
          <div key={slide.id}>
            <div
              className="
                flex flex-col md:flex-row items-center justify-between
                px-4 sm:px-10 md:px-16
                min-h-[450px] md:h-[450px]
                py-6 md:py-0
                bg-[#F5F5F5]
                text-center
                relative
                overflow-hidden
              "
            >
              <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-green-200/25 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-green-300/20 blur-3xl" />

              <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:max-w-[68%] z-10 justify-center">
                <p
                  className={`font-family font-medium text-[11px] sm:text-[14px] leading-[114%] tracking-widest uppercase text-[#3d3d3d] mb-1
                  transition-all duration-700 ease-out ${
                    activeSlide === idx
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                >
                  {slide.subTitle}
                </p>

                <h1
                  className={`font-family text-[#3d3d3d] font-semibold text-[28px] sm:text-[50px] xl:text-[70px] leading-[110%] uppercase
                  transition-all duration-700 ease-out delay-75 ${
                    activeSlide === idx
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3"
                  }`}
                >
                  {slide.title}
                  <span className="block text-[#46A358] font-semibold">
                    {slide.highlight}
                  </span>
                </h1>

                <p
                  className={`text-[#727272] text-[12px] sm:text-[14px] w-[95%] md:w-[80%] mb-4 md:mb-6 leading-5 sm:leading-6 font-normal
                  transition-all duration-700 ease-out delay-150 ${
                    activeSlide === idx
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3"
                  }`}
                >
                  {slide.description}
                </p>

                <div
                  className={`transition-all duration-700 ease-out delay-200 ${
                    activeSlide === idx
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3"
                  }`}
                >
                  <Button
                    type="primary"
                    className="bg-[#46a358]! md:mb-0! mb-3! hover:bg-[#357a40]! w-35! h-10! rounded-md! font-family! font-medium! text-[14px]! md:text-[16px]! leading-[125%]! uppercase! text-[#fff]!
                    transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg hover:shadow-green-500/25 active:scale-[0.98]"
                  >
                    {slide.buttonText}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center w-full md:w-[40%] relative mt-6 md:mt-0 order-first md:order-last">
                <div className="absolute w-[80%] h-[80%] rounded-full bg-green-200/30 blur-2xl z-0" />
                <img
                  src={slide.image}
                  alt="Flower"
                  className={`relative z-10 w-full max-h-[180px] sm:max-h-[300px] md:max-h-[400px] object-contain
                  transition-all duration-700 ease-out ${
                    activeSlide === idx
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-3 scale-[0.98]"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-[10px] rounded-full transition-all duration-300 ${
              activeSlide === index
                ? "bg-[#46A358] w-[26px]"
                : "bg-[#3d3d3d] opacity-30 w-[10px]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Showcase;
