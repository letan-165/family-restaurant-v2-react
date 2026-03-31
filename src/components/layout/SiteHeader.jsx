import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navigation } from "../../data/siteData.js";

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileNavClass = menuOpen ? "flex" : "hidden";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-brown text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/logo.png"
            alt="Logo quán Cô Lệ"
            className="h-14 w-auto rounded-xl bg-white/10 p-1 sm:h-16"
          />
          <div>
            <p className="font-display text-lg font-semibold uppercase text-white">
              Quán Cô Lệ
            </p>
            <p className="text-sm text-white/80">Bún nước tôm bò</p>
          </div>
        </NavLink>

        <button
          type="button"
          className="inline-flex rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Mở menu điều hướng"
        >
          Menu
        </button>

        <nav
          className={`${mobileNavClass} absolute inset-x-4 top-full mt-2 flex-col rounded-2xl border border-white/10 bg-brand-brown-dark p-3 shadow-sm md:static md:mt-0 md:flex md:flex-row md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                [
                  "rounded-xl px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-white text-brand-brown"
                    : "text-white/85 hover:bg-white/10 hover:text-white",
                ].join(" ")
              }
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
