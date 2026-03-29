import { Outlet } from "react-router-dom";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import SiteHeader from "../components/layout/SiteHeader.jsx";

function SiteLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

export default SiteLayout;
