export const mainDishes = [
  { name: "Bún nước Tôm Bò", price: 35000, image: "/food-bun.png" },
  { name: "Bún nước Đặc Biệt", price: 50000, image: "/food-bun.png" },
  { name: "Mì trộn Tôm Bò", price: 35000, image: "/food-mi.png" },
  { name: "Mì trộn Đặc Biệt", price: 50000, image: "/food-mi.png" },
];

export const extraDishes = [
  { name: "Thêm Trứng", price: 5000, image: "/food-trung.png" },
  { name: "Thêm Bò Viên", price: 5000, image: "/food-bovien.png" },
  { name: "Thêm Chả", price: 5000, image: "/food-cha.png" },
  { name: "Thêm Mì Trộn", price: 10000, image: "/food-mithem.png" },
];

export const profileView = {
  username: "cole.customer",
  email: "khachhang@cole.vn",
  fullname: "Nguyen Minh Anh",
  phone: "0903 083 108",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  address: "41 Nguyen Cong Hoan, Phuong Cau Kieu, TP.HCM",
  typeLogin: "APP",
  status: "ACTIVE",
};

export const profileDisplayGroups = {
  personal: [
    { label: "Họ và tên", valueKey: "fullname" },
    { label: "Số điện thoại", valueKey: "phone" },
    { label: "Địa chỉ", valueKey: "address", className: "sm:col-span-2" },
  ],
  account: [
    { label: "Username", valueKey: "username" },
    { label: "Email", valueKey: "email" },
    { label: "Loại đăng nhập", valueKey: "typeLogin" },
    { label: "Trạng thái", valueKey: "status" },
  ],
};

export const profileEditFields = [
  { label: "Họ và tên", htmlFor: "fullname", name: "fullname", type: "text" },
  { label: "Số điện thoại", htmlFor: "phone", name: "phone", type: "text" },
  {
    label: "Địa chỉ",
    htmlFor: "address",
    name: "address",
    as: "textarea",
    className: "sm:col-span-2",
  },
];

export function getMockCartItems() {
  return [
    ...mainDishes.slice(0, 3).map((item, index) => ({
      ...item,
      category: "Món chính",
      quantity: index === 1 ? 2 : 1,
    })),
    ...extraDishes.slice(0, 2).map((item) => ({
      ...item,
      category: "Món thêm",
      quantity: 1,
    })),
  ];
}

export function getCartSummaryRows({
  selectedCount,
  totalAmount,
  totalQuantity,
}) {
  return [
    { label: "Món đã chọn", value: selectedCount },
    { label: "Tổng số lượng", value: totalQuantity },
    { label: "Tổng tiền", value: totalAmount, highlight: true },
  ];
}

export function getOrderSummaryRows({
  itemCount,
  totalAmount,
  totalQuantity,
}) {
  return [
    { label: "Số món", value: itemCount },
    { label: "Tổng số lượng", value: totalQuantity },
    { label: "Tổng tiền", value: totalAmount, highlight: true },
  ];
}

export function getMockOrders() {
  return [
    {
      id: "DH001",
      status: "Chờ xác nhận",
      createdAt: "02/04/2026 - 09:15",
      items: [
        { ...mainDishes[0], category: "Món chính", quantity: 1 },
        { ...extraDishes[0], category: "Món thêm", quantity: 1 },
      ],
    },
    {
      id: "DH002",
      status: "Đang chuẩn bị",
      createdAt: "02/04/2026 - 10:00",
      items: [
        { ...mainDishes[1], category: "Món chính", quantity: 2 },
        { ...extraDishes[1], category: "Món thêm", quantity: 1 },
      ],
    },
    {
      id: "DH003",
      status: "Đang giao",
      createdAt: "01/04/2026 - 18:30",
      items: [{ ...mainDishes[2], category: "Món chính", quantity: 1 }],
    },
    {
      id: "DH004",
      status: "Đã hoàn thành",
      createdAt: "31/03/2026 - 12:20",
      items: [
        { ...mainDishes[3], category: "Món chính", quantity: 1 },
        { ...extraDishes[2], category: "Món thêm", quantity: 2 },
      ],
    },
    {
      id: "DH005",
      status: "Đã hủy",
      createdAt: "30/03/2026 - 08:40",
      items: [{ ...mainDishes[0], category: "Món chính", quantity: 1 }],
    },
  ].map((order) => ({
    ...order,
    totalQuantity: order.items.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ),
  }));
}

export function getMockOrderById(orderId) {
  return getMockOrders().find((order) => order.id === orderId);
}
