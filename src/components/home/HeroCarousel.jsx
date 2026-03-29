import { useEffect, useState } from "react";
import { heroSlides } from "../../data/siteData.js";
import CarouselButton from "../common/CarouselButton.jsx";

function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-3 shadow-[0_22px_70px_rgba(91,57,32,0.18)] backdrop-blur sm:p-4">
      <div className="relative aspect-[16/8.2] overflow-hidden rounded-[1.5rem]">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={`h-3 rounded-full transition ${
                index === activeIndex
                  ? "w-10 bg-brand-brown"
                  : "w-3 bg-brand-brown/25"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Chuyển đến ảnh ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <CarouselButton
            label="Ảnh trước"
            onClick={() =>
              setActiveIndex((current) =>
                current === 0 ? heroSlides.length - 1 : current - 1,
              )
            }
          >
            ←
          </CarouselButton>
          <CarouselButton
            label="Ảnh sau"
            onClick={() =>
              setActiveIndex((current) => (current + 1) % heroSlides.length)
            }
          >
            →
          </CarouselButton>
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;
