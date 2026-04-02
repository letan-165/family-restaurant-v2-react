import { useMemo, useState } from "react";
import TextButton from "../components/button/TextButton.jsx";
import OrderStatusCard from "../components/common/OrderStatusCard.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import { getMockOrders } from "../data/mockData.js";
import { orderStatuses } from "../data/siteData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

function OrderStatusPage() {
  useDocumentTitle("Trạng thái đơn hàng - Quán Cô Lệ");

  const [activeStatus, setActiveStatus] = useState(orderStatuses[0]);
  const orders = useMemo(() => getMockOrders(), []);
  const filteredOrders = useMemo(
    () => orders.filter((order) => order.status === activeStatus),
    [activeStatus, orders],
  );

  return (
    <section className="section-bg-two min-h-[calc(100vh-8rem)] py-10 sm:py-12">
      <div className="page-wrap">
        <div className="mx-auto grid max-w-5xl gap-6">
          <div className="card">
            <SectionTitle label="Đơn hàng" title="Theo dõi trạng thái đơn" />
            <div className="mt-6 flex flex-wrap gap-3">
              {orderStatuses.map((status) => (
                <TextButton
                  key={status}
                  variant={status === activeStatus ? "primary" : "secondary"}
                  onClick={() => setActiveStatus(status)}
                >
                  {status}
                </TextButton>
              ))}
            </div>
          </div>

          {!filteredOrders.length ? (
            <div className="card text-center text-sm text-stone-600">
              Hiện chưa có đơn hàng ở trạng thái này.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredOrders.map((order) => (
                <OrderStatusCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default OrderStatusPage;
