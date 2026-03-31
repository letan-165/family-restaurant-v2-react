import { NavLink } from "react-router-dom";
import BannerHome from "../components/home/BannerHome.jsx";
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
      <section className="section-bg-one py-8 sm:py-12">
        <div className="page-wrap flex flex-col gap-8">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-brand-brown sm:text-5xl">
              Quán Cô Lệ
              <br />
              Bún nước Tôm Bò
            </h1>
          </div>
          <BannerHome />
        </div>
      </section>

      <section className="section-bg-two">
        <div className="page-wrap grid gap-10">
          <div className="card grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="section-label">Về chúng tôi</p>
              <h2 className="section-title">
                Quán Bún nước Cô Lệ - Bún nước Tôm Bò
              </h2>
              <div className="section-text mt-5 space-y-4">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="card-image">
              <img
                src="/food-mi.png"
                alt="Bún nước Tôm Bò ngon tại quán Cô Lệ Phú Nhuận"
                className="h-[400px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-bg-one py-14">
        <div className="page-wrap">
          <div className="card">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-label">Không gian quán</p>
                <h2 className="section-title">Có chỗ để xe miễn phí</h2>
              </div>
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
        </div>
      </section>

      <section className="section-bg-two py-14 text-center">
        <div className="page-wrap">
          <div className="card">
            <p className="section-label">Món ăn chính</p>
            <h2 className="section-title">Được nhiều người gọi nhất</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
              {mainDishes.map((dish) => (
                <DishPreviewCard key={dish.name} dish={dish} />
              ))}
            </div>
            <div className="mt-8">
              <NavLink to="/menu" className="btn-primary">
                Xem chi tiết
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
