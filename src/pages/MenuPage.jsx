import MenuGrid from "../components/common/MenuGrid.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import { extraDishes, mainDishes } from "../data/mockData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

function MenuPage() {
  useDocumentTitle("Thực đơn - Quán Cô Lệ");

  function addToCart() {}

  return (
    <section className="section-bg-two min-h-[calc(100vh-8rem)] py-10">
      <div className="page-wrap">
        <SectionTitle title="THỰC ĐƠN" />
        <MenuGrid
          title="MÓN CHÍNH"
          items={mainDishes}
          onAddToCart={addToCart}
        />
        <MenuGrid
          title="MÓN THÊM"
          items={extraDishes}
          onAddToCart={addToCart}
        />
      </div>
    </section>
  );
}

export default MenuPage;
