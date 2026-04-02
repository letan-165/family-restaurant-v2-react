import { useEffect, useState } from "react";
import { bannerHome } from "../../data/siteData.js";
import IconButton from "../button/IconButton.jsx";

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
                index === activeIndex ? "w-10 bg-brand-brown" : "w-3 bg-stone-300"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Chuyển đến ảnh ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <IconButton
            label="Ảnh trước"
            size="lg"
            variant="outline"
            onClick={() =>
              setActiveIndex((current) =>
                current === 0 ? bannerHome.length - 1 : current - 1,
              )
            }
          >
            ←
          </IconButton>
          <IconButton
            label="Ảnh sau"
            size="lg"
            variant="outline"
            onClick={() =>
              setActiveIndex((current) => (current + 1) % bannerHome.length)
            }
          >
            →
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default BannerCard;
