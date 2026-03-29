import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navigation } from "../../data/siteData.js";

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-amber-950/10 bg-[rgba(91,57,32,0.96)] text-white backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/logo.png"
            alt="Logo quán Cô Lệ"
            className="h-14 w-auto rounded-full bg-white/10 p-1 shadow-sm sm:h-16"
          />
          <div>
            <p className="font-display text-lg font-semibold uppercase tracking-[0.18em] text-amber-100">
              Quán Cô Lệ
            </p>
            <p className="text-sm text-amber-50/80">Bún nước tôm bò</p>
          </div>
        </NavLink>

        <button
          type="button"
          className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Mở menu điều hướng"
        >
          Menu
        </button>

        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute inset-x-4 top-full mt-2 flex-col rounded-3xl border border-white/10 bg-[rgba(72,43,23,0.98)] p-3 shadow-xl md:static md:mt-0 md:flex md:flex-row md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                [
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-amber-100 text-amber-950"
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
