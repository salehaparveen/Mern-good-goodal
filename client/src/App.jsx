import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { checkAdmin } from "./features/auth/adminAuthSlice";
import { checkCustomer } from "./features/auth/customerAuthSlice";

import {
  SharedLayout,
  HomeLayout,
  AboutLayout,
  ProductsLayout,
  ProductItemLayout,
  // CartLayout,
  Error,
  AdminSignupLayout,
  AdminSharedLayout,
  AdminLoginLayout,
  AdminDashboardLayout,
  CustomerSignupLayout,
  CustomerLoginLayout,
  SettingsLayout,
} from "./routes";

function App() {
  const dispatch = useDispatch();
  const { admin } = useSelector((store) => store.admin);
  const { customer } = useSelector((store) => store.customer);

  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  useEffect(() => {
    dispatch(checkAdmin());
    dispatch(checkCustomer());
  }, []);

  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomeLayout />} />
          <Route path="/about" element={<AboutLayout />} />
          <Route path="/products" element={<ProductsLayout />} />
          <Route path="/products/:slug" element={<ProductItemLayout />} />

          <Route
            path="/customer/signup"
            element={!customer ? <CustomerSignupLayout /> : <Navigate to="/" />}
          />
          <Route
            path="/customer/login"
            element={!customer ? <CustomerLoginLayout /> : <Navigate to="/" />}
          />

          {/* <Route path="/customer/settings" element={<SettingsLayout />} /> */}

          {/* <Route path="/cart" element={<CartLayout />} /> */}
          <Route path="*" element={<Error />} />
        </Route>

        <Route path="/" element={<AdminSharedLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              admin ? <AdminDashboardLayout /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/signup"
            element={
              !admin ? (
                <AdminSignupLayout />
              ) : (
                <Navigate to="/admin/dashboard" />
              )
            }
          />
          <Route
            path="/admin/login"
            element={
              !admin ? <AdminLoginLayout /> : <Navigate to="/admin/dashboard" />
            }
          />
        </Route>
      </Routes>
    </Wrapper>
  );
}

export default App;
