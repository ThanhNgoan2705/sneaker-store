import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Cart,
  Contact,
  HomeLayout,
  Landing,
  Login,
  Register,
  Shop,
  SingleProduct,
  Wishlist,
  Profile,
  Search,
  ThankYou,
  OrderHistory,
  Checkout,
  OrderSuccess,
  OrderFail
} from "./pages";
import { landingLoader } from "./pages/Landing";
import { ToastContainer } from "react-toastify";
import AdminDashboard from './pages/admin/pages/Dashboard';
import AdminLayout from './pages/admin/AdminLayout';
import { AdminAccount, AdminBrand, AdminKindShoe, AdminOrder, AdminPaymentMethod, AdminProduct } from "./pages/admin/pages";
import OTP from "./pages/OTP.jsx";
import {OrderPage} from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "shop/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "otp",
        element: <OTP/>,
      },
      {
        path: "user-profile",
        element: <Profile />,
      },
      {
        path:"search",
        element: <Search />
      },
      {
        path:"thank-you",
        element: <ThankYou />
      },
      {
        path:"order-history",
        element: <OrderHistory />
      },
      {
        path:"checkout",
        element: <Checkout />
      },
      {
        path:"payment/success",
        element: <OrderSuccess />
      },
      {
        path:"payment/cancel",
        element: <OrderFail />
      },
      {
        path:"order-detail",
        element: <OrderPage />
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'products',
        element: <AdminProduct />, // Trang Admin Product
      },
      {
        path: 'brands',
        element: <AdminBrand />, // Trang Admin Brand
      },
      {
        path: 'kinds',
        element: <AdminKindShoe />, // Trang Admin KindShoe
      },
      {
        path: 'accounts',
        element: <AdminAccount />, // Trang Admin Account
      },
      {
        path: 'orders',
        element: <AdminOrder />, // Trang Admin Order
      },
      {
        path: 'payments',
        element: <AdminPaymentMethod />, // Trang Admin Pay Method
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
