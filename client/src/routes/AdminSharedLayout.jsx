import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavbarAdmin from "../components/NavbarAdmin";

export const AdminSharedLayout = () => {
  return (
    <>
      <NavbarAdmin />
      <Outlet />
      <Footer />
    </>
  );
};
