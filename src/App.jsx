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
  OrderHistory
} from "./pages";
import { landingLoader } from "./pages/Landing";
import { singleProductLoader } from "./pages/SingleProduct";
import { shopLoader } from "./pages/Shop";
import { ToastContainer } from "react-toastify";
import AdminDashboard from './pages/admin/pages/Dashboard';
import AdminLayout from './pages/admin/AdminLayout';
import { AdminAccount, AdminBrand, AdminKindShoe, AdminOrder, AdminPaymentMethod, AdminProduct } from "./pages/admin/pages";

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
        loader: shopLoader
      },
      {
        path: "shop/product/:id",
        element: <SingleProduct />,
        loader: singleProductLoader,
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
        path: "user-profile",
        element: <Profile />,
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "thank-you",
        element: <ThankYou />
      },
      {
        path: "order-history",
        element: <OrderHistory />
      },
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
