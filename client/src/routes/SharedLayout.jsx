import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import Navbar from "../components/navbarCustomer/Navbar";

export const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <NewsLetter />
      <Footer />
    </>
  );
};
