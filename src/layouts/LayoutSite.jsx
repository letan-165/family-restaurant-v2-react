import { Outlet } from "react-router-dom";
import FooterSite from "../components/layout/FooterSite.jsx";
import HeaderSite from "../components/layout/HeaderSite.jsx";

function LayoutSite() {
  return (
    <div className="min-h-screen">
      <HeaderSite />
      <main>
        <Outlet />
      </main>
      <FooterSite />
    </div>
  );
}

export default LayoutSite;
