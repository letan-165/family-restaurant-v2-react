import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navigation } from "../../data/siteData.js";

function HeaderSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileNavClass = menuOpen ? "flex" : "hidden";

  return (
    <header className="header-site">
      <div className="header-wrap">
        <NavLink
          to="/"
          className="header-logo"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/logo.png"
            alt="Logo quán Cô Lệ"
            className="h-14 w-auto rounded-xl bg-white/10 p-1 sm:h-16"
          />
          <div>
            <p className="font-display text-lg font-semibold">QUÁN CÔ LỆ</p>
            <p className="text-sm text-white/80">Bún nước tôm bò</p>
          </div>
        </NavLink>

        <button
          type="button"
          className="header-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Mở menu điều hướng"
        >
          Menu
        </button>

        <nav className={`${mobileNavClass} header-nav`}>
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                [
                  "header-link",
                  isActive ? "header-link-active" : "header-link-idle",
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

export default HeaderSite;
