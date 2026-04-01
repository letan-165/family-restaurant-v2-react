import { Route, Routes } from "react-router-dom";
import LayoutSite from "./layouts/LayoutSite.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MenuPage from "./pages/MenuPage.jsx";

function App() {
  return (
    <Routes>
      <Route element={<LayoutSite />}>
        <Route index element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;
