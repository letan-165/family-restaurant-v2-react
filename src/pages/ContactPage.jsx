import InfoBlock from "../components/common/InfoBlock.jsx";
import { platforms } from "../data/siteData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

function ContactPage() {
  useDocumentTitle("Liên hệ - Quán Cô Lệ");

  return (
    <section className="section-bg-one px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-brown/70">
            Liên hệ
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-brand-brown">
            Mọi thắc mắc, mình luôn sẵn sàng hỗ trợ
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-stone-700">
            Nếu bạn cần hỏi về món ăn, giờ mở cửa hoặc các nền tảng đặt hàng, hãy
            liên hệ qua thông tin bên dưới.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_20px_60px_rgba(91,57,32,0.12)]">
            <img
              src="/location.png"
              alt="Bản đồ vị trí quán Cô Lệ"
              className="h-full min-h-80 w-full object-cover"
            />
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(91,57,32,0.12)] backdrop-blur sm:p-8">
            <div className="space-y-6">
              <InfoBlock title="Địa chỉ cụ thể">
                <p>41 Nguyễn Công Hoan, Phường Cầu Kiệu, TP.HCM</p>
              </InfoBlock>

              <InfoBlock title="Liên lạc">
                <p>SĐT / Zalo: 0903 083 108</p>
                <p>Email: bunnuoccole@gmail.com</p>
              </InfoBlock>

              <div>
                <h2 className="text-lg font-bold text-brand-brown">
                  Nền tảng đặt hàng
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {platforms.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-full border border-brand-brown/10 bg-stone-50 px-4 py-3 transition hover:-translate-y-0.5 hover:border-brand-brown/30 hover:bg-white"
                    >
                      <img
                        src={platform.image}
                        alt={platform.name}
                        className="h-10 w-10 object-contain"
                      />
                      <span className="text-sm font-semibold text-stone-700 transition group-hover:text-brand-brown">
                        {platform.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
