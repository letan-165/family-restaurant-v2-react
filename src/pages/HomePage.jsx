import { NavLink } from "react-router-dom";
import HeroCarousel from "../components/home/HeroCarousel.jsx";
import GalleryCard from "../components/home/GalleryCard.jsx";
import DishPreviewCard from "../components/menu/DishPreviewCard.jsx";
import {
  aboutParagraphs,
  gallerySpaces,
  mainDishes,
} from "../data/siteData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

function HomePage() {
  useDocumentTitle("Quán Cô Lệ - Bún nước tôm bò");

  return (
    <>
      <section className="section-bg-one px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <div className="text-center">
            <p className="mb-3 inline-flex rounded-full border border-amber-950/10 bg-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-brand-brown">
              Hương vị truyền thống
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-brand-brown sm:text-5xl">
              Quán Cô Lệ
              <br />
              Bún nước tôm bò
            </h1>
          </div>
          <HeroCarousel />
        </div>
      </section>

      <section className="section-bg-two px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_20px_60px_rgba(91,57,32,0.12)] backdrop-blur md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-brand-brown/70">
              Về chúng tôi
            </p>
            <h2 className="font-display text-3xl font-bold text-brand-brown">
              Bún nước Cô Lệ - Bún nước tôm bò
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-stone-700">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-amber-900/10 bg-white shadow-xl">
            <img
              src="/food-mi.png"
              alt="Mì trộn bò tôm tại quán Cô Lệ"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-bg-one px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-brown/70">
                Không gian quán
              </p>
              <h2 className="font-display text-3xl font-bold text-brand-brown">
                Thoáng, sạch và gần gũi
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-stone-700">
              Không gian được giữ gọn gàng và thoải mái để phù hợp cho bữa sáng,
              bữa trưa nhanh hoặc một buổi ghé quán thư thả cùng bạn bè.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {gallerySpaces.map((space) => (
              <GalleryCard
                key={space.image}
                image={space.image}
                alt={space.alt}
                title={space.title}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-bg-two px-4 py-14 text-center sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-brown/70">
            Món ăn chính
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-brand-brown">
            Những món được gọi nhiều
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mainDishes.map((dish) => (
              <DishPreviewCard key={dish.name} dish={dish} />
            ))}
          </div>
          <div className="mt-8">
            <NavLink
              to="/menu"
              className="inline-flex rounded-full bg-brand-brown px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-brown-dark"
            >
              Xem chi tiết thực đơn
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
