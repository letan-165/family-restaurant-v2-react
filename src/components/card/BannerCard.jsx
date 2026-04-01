import { useEffect, useState } from "react";
import { bannerHome } from "../../data/siteData.js";
import ArrowButton from "../button/ArrowButton.jsx";

function BannerCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % bannerHome.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="card overflow-hidden bg-white/80 p-3 sm:p-4">
      <div className="relative aspect-[16/8.2] overflow-hidden rounded-2xl">
        {bannerHome.map((slide, index) => (
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
          {bannerHome.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={`h-3 rounded-full transition ${
                index === activeIndex
                  ? "w-10 bg-brand-brown"
                  : "w-3 bg-stone-300"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Chuyển đến ảnh ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <ArrowButton
            label="Ảnh trước"
            onClick={() =>
              setActiveIndex((current) =>
                current === 0 ? bannerHome.length - 1 : current - 1,
              )
            }
          >
            ←
          </ArrowButton>
          <ArrowButton
            label="Ảnh sau"
            onClick={() =>
              setActiveIndex((current) => (current + 1) % bannerHome.length)
            }
          >
            →
          </ArrowButton>
        </div>
      </div>
    </div>
  );
}

export default BannerCard;
