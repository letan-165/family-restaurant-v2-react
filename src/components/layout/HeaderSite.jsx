import { useState } from "react";
import { NavLink } from "react-router-dom";
import IconButton from "../button/IconButton.jsx";
import TextButton from "../button/TextButton.jsx";
import { navigation } from "../../data/siteData.js";

function HeaderSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentUser = {
    isLoggedIn: false,
    name: "Khach hang",
  };

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
            alt="Logo quan Co Le"
            className="h-14 w-auto rounded-xl bg-white/10 p-1 sm:h-16"
          />
          <div>
            <p className="font-display text-lg font-semibold">QUÁN CÔ LỆ</p>
            <p className="text-sm text-white/80">Bún nước Tôm Bò</p>
          </div>
        </NavLink>

        <div className="header-actions">
          <IconButton
            as={NavLink}
            label="Mo trang thai don hang"
            size="lg"
            to="/order-status"
            variant="headerLight"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/order.png"
              alt=""
              aria-hidden="true"
              className="h-5 w-5 object-contain"
            />
          </IconButton>

          <IconButton
            as={NavLink}
            label="Mo gio hang"
            size="lg"
            to="/cart"
            variant="headerLight"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/cart.png"
              alt=""
              aria-hidden="true"
              className="h-5 w-5 object-contain"
            />
          </IconButton>

          <IconButton
            label="Mo menu dieu huong"
            size="lg"
            variant="header"
            onClick={() => setMenuOpen((open) => !open)}
            className={menuOpen ? "bg-white/10" : ""}
          >
            <img
              src="/menu.png"
              alt=""
              aria-hidden="true"
              className="h-5 w-5 object-contain"
            />
          </IconButton>

          <div className={`${menuOpen ? "flex" : "hidden"} header-popover`}>
            <nav className="header-nav">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      "header-link",
                      isActive ? "header-link-active" : "header-link-idle",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <NavLink
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="header-profile-card"
            >
              <div className="header-avatar" aria-hidden="true">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {currentUser.name}
                </p>
                <p className="text-xs text-white/70">
                  {currentUser.isLoggedIn
                    ? "Chỉnh sửa thông tin"
                    : "Chưa đăng nhập"}
                </p>
              </div>
            </NavLink>

            <TextButton
              as={NavLink}
              to="/auth"
              variant="header"
              className="rounded-2xl"
              onClick={() => setMenuOpen(false)}
            >
              {currentUser.isLoggedIn ? "Đăng xuất" : "Đăng nhập"}
            </TextButton>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderSite;
