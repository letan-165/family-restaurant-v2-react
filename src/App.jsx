import { Route, Routes } from "react-router-dom";
import LayoutSite from "./layouts/LayoutSite.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import OrderStatusPage from "./pages/OrderStatusPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  return (
    <Routes>
      <Route element={<LayoutSite />}>
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order-status" element={<OrderStatusPage />} />
        <Route path="/order-status/:orderId" element={<OrderDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
