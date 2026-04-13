import { NavLink } from "react-router-dom";
import TextButton from "../components/button/TextButton.jsx";
import BannerCard from "../components/card/BannerCard.jsx";
import DishCard from "../components/card/DishCard.jsx";
import SpaceCard from "../components/card/SpaceCard.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import { mainDishes } from "../data/mockData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

const bannerSlides = [
  { image: "/banner.png", alt: "Banner quan Co Le" },
  { image: "/banner2.png", alt: "Mon an quan Co Le" },
  { image: "/banner3.png", alt: "Khong gian quan Co Le" },
];

const aboutParagraphs = [
  "Nằm ngay trên đường 41 Nguyễn Công Hoan.",
  "Tại quán Bún nước Cô Lệ, mỗi tô bún nước là sự kết hợp tinh tế giữa hương vị truyền thống và chất lượng chuẩn mức. Nguyên liệu được tuyển chọn kỹ lưỡng: tôm tươi trong ngày, thịt bò sạch, chả thơm và phần nước lèo được chế biến khéo léo, mang vị ngọt thanh tự nhiên, đậm đà khó quên.",
  "Mỗi khẩu chế biến đều được thực hiện vô cùng kỹ lưỡng và sạch sẽ, đảm bảo vệ sinh để mang đến cho thực khách trải nghiệm ẩm thực trọn vẹn nhất.",
  "ãy đến và cảm nhận vị ngon chân thật - nơi uy tín và chất lượng được đặt lên hàng đầu trong từng tô bun phục vụ.",
];

const gallerySpaces = [
  {
    image: "/space1.png",
    alt: "Không gian ngoài trời quán Bún nước Cô Lệ",
    title: "Ngoài trời thoáng mát, có mái che",
  },
  {
    image: "/space2.png",
    alt: "Không gian trong nhà quán Bún nước Cô Lệ",
    title: "Trong quán gọn gàng, sạch sẽ, mát mẻ và thoải mái",
  },
  {
    image: "/space3.png",
    alt: "Không gian thư giãn trước nhà quán Bún nước Cô Lệ",
    title: "Không gian trước nhà mát mẻ thư giãn",
  },
];

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
          <BannerCard slides={bannerSlides} />
        </div>
      </section>

      <section className="section-bg-two py-10">
        <div className="page-wrap grid gap-10">
          <div className="card grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionTitle
                label="Về chúng tôi"
                title="Quán Bún nước Cô Lệ - Bún nước Tôm Bò"
              />
              <div className="mt-5 space-y-4 text-base text-stone-700">
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

      <section className="section-bg-one py-10">
        <div className="page-wrap">
          <div className="card border-brand-brown/10 bg-[#f6eee4]">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <SectionTitle
                label="Không gian quán"
                title="Có chỗ để xe miễn phí, thoáng mát và sạch sẽ"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {gallerySpaces.map((space) => (
                <SpaceCard
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

      <section className="section-bg-two py-10 text-center">
        <div className="page-wrap">
          <div className="card">
            <SectionTitle
              label="Món ăn chính"
              title="Được nhiều người gọi nhất"
              center
            />
            <div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
              {mainDishes.map((dish) => (
                <DishCard key={dish.name} dish={dish} />
              ))}
            </div>
            <div className="mt-8">
              <TextButton as={NavLink} to="/menu">
                Xem chi tiết
              </TextButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
