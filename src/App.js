import React, { useEffect } from "react";
import "./App.css";
import "./Global.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from "./features/cart/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccess from "./pages/OrderSuccess";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchUserInfoAsync } from "./features/UserData/userSlice";
import Logout from "./features/auth/components/Logout";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetail from "./features/admin/components/AdminProductDetail";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrderPage from "./pages/AdminOrderPage";
import { setUser } from "./features/auth/authSlice";
import Stripe from "./features/PaymentGateway/Stripe";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/order",
    element: (
      <ProtectedAdmin>
        <AdminOrderPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "cart",
    element: (
      <Protected>
        <Cart />
      </Protected>
    ),
  },
  {
    path: "checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <Protected>
        <AdminProductDetail />
      </Protected>
    ),
  },
  {
    path: "*",
    element: (
      <Protected>
        <PageNotFound></PageNotFound>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccess></OrderSuccess>
      </Protected>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <Protected>
        <UserOrderPage></UserOrderPage>
      </Protected>
    ),
  },
  {
    path: "/my-profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/log-out",
    element: (
      <Protected>
        <Logout></Logout>
      </Protected>
    ),
  },
  {
    path: "/payment-gateway",
    element: (
      <Protected>
        <Stripe></Stripe>
      </Protected>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userData = JSON.parse(localStorage.getItem("userdata"));

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchUserInfoAsync(user.id));
    } else {
      dispatch(setUser(userData));
    }
  }, [dispatch, user]);

  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
