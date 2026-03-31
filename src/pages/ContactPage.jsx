import InfoBlock from "../components/common/InfoBlock.jsx";
import { platforms } from "../data/siteData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

function ContactPage() {
  useDocumentTitle("Liên hệ - Quán Cô Lệ");

  return (
    <section className="section-bg-two py-12">
      <div className="page-wrap">
        <div className="card">
          <div className="mb-8 text-center">
            <h1 className="section-title">* LIÊN HỆ *</h1>
            <p className="section-text mx-auto mt-4 max-w-2xl">
              Mọi thắc mắc về chất lượng, dịch vụ, vui lòng liên hệ thông tin
              dưới đây để được hỗ trợ.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card-image">
              <img
                src="/location.png"
                alt="Bản đồ vị trí quán Cô Lệ"
                className="h-full min-h-80 w-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <InfoBlock title="Địa chỉ cụ thể:">
                <p>41 Nguyễn Công Hoan, Phường Cầu Kiệu, TP.HCM</p>
              </InfoBlock>

              <InfoBlock title="Liên lạc:">
                <p>ĐT / Zalo: 0903083108</p>
                <p>Gmail: bunnuoccole@gmail.com</p>
              </InfoBlock>

              <div>
                <h2 className="text-lg font-bold text-brand-brown">
                  Nền tảng:
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {platforms.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-700 transition hover:border-brand-brown hover:text-brand-brown"
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
