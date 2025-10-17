import { blackChat, blackDashboard, blackOrder, blackOrderTrack, blackProducts, blackProfile, blackReviews, blackWallet, greenChat, greenDashboard, greenOrder, greenOrderTrack, greenProducts, greenProfile, greenReviews, greenWallet } from "../assets/export";

export const sidebarData = [
  {
    title: "Dashboard",
    icon:blackDashboard,
    whiteIcon:greenDashboard,
    link: "/app/dashboard",
  },
  {
    title: "Product Management",
    icon:blackProducts,
    whiteIcon:greenProducts,
    link: "/app/product-management",
  },
  {
    title: "Order Management",
    icon:blackOrder,
    whiteIcon:greenOrder,
    link: "/app/order-management",
  },
  {
    title: "Order Tracking",
    icon:blackOrderTrack,
    whiteIcon:greenOrderTrack,
    link: "/app/order-track",
  },
  {
    title: "Messages",
    icon:blackChat,
    whiteIcon:greenChat,
    link: "/app/chat",
  },
  {
    title: "Wallet",
    icon:blackWallet,
    whiteIcon:greenWallet,
    link: "/app/wallet",
  },
  {
    title: "Product Reviews",
    icon:blackReviews,
    whiteIcon:greenReviews,
    link: "/app/reviews",
  },
  {
    title: "Customer",
    icon:blackProfile,
    whiteIcon:greenProfile,
    link: "/app/customer",
  },
];
