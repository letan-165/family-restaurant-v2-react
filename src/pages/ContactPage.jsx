import InfoText from "../components/text/InfoText.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

const platforms = [
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@bunnuoccole?_r=1&_t=ZS-91T2z0OdsB8",
    image: "/tiktok.png",
  },
  {
    name: "ShopeeFood",
    href: "https://shopeefood.vn/u/6VQ4igq",
    image: "/shopeefood.png",
  },
  {
    name: "beFood",
    href: "https://begroup.onelink.me/ch/n83F/je6664qj",
    image: "/befood.png",
  },
  {
    name: "Xanh SM",
    href: "https://xanhsmngon.onelink.me/ch/14WJ/zq4cbkpm",
    image: "/xanhsm.png",
  },
];

function ContactPage() {
  useDocumentTitle("Lien he - Quan Co Le");

  return (
    <section className="section-bg-two py-12">
      <div className="page-wrap">
        <div className="card">
          <div className="mb-8 text-center">
            <SectionTitle title="* LIEN HE *" center />
            <p className="mx-auto mt-4 max-w-2xl text-base text-stone-700">
              Mọi thắc mắc về chất lượng, dịch vụ, vui lòng liên hệ thông tin
              dưới đây để được hỗ trợ.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card-image">
              <img
                src="/location.png"
                alt="Ban do vi tri quan Co Le"
                className="h-full min-h-80 w-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <InfoText title="Địa chỉ cụ thể:">
                <p>41 Nguyễn Công Hoan, Phường Cầu Kéo, TP.HCM</p>
              </InfoText>

              <InfoText title="Liên lạc:">
                <p>DT / Zalo: 0903083108</p>
                <p>Gmail: bunnuoccole@gmail.com</p>
              </InfoText>

              <div>
                <h2 className="text-lg font-bold text-brand-brown">Nền tảng:</h2>
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
                      <span className="text-sm font-semibold">
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
