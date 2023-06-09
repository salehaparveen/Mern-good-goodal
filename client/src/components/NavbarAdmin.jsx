import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Logo from "../assets/logo.jpg";
import { HiMenuAlt2 } from "react-icons/hi";

import { useDispatch, useSelector } from "react-redux";
import { adminLogOut } from "../features/auth/adminAuthSlice";

const NavbarAdmin = () => {
  const [navColor, setNavColor] = useState(false);
  const [nav, setNav] = useState(false);

  const dispatch = useDispatch();
  const { admin } = useSelector((store) => store.admin);

  // mobile nav
  const handleNav = () => setNav(!nav);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const handleLogout = () => {
    dispatch(adminLogOut());
  };

  return (
    <>
      <header
        className={`${
          navColor ? "border-b border-zinc-200 bg-bgcolor2" : "bg-bgcolor"
        } fixed z-20 w-full transition duration-200 ease-in-out`}
      >
        <nav className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-16 ">
          {/* mobile nav */}
          <div className="flex text-2xl md:hidden" onClick={handleNav}>
            <HiMenuAlt2 />
          </div>

          {/* logo */}
          <div>
            <NavLink to="/admin/dashboard">
              <img className="w-20" src={Logo} alt="logo" />
            </NavLink>
          </div>

          {/* nav links */}
          <div className="flex items-center space-x-3">
            {/* about and products */}
            <ul className="hidden space-x-3 md:flex">
              {admin ? (
                <li className="space-x-3 font-urbanist font-bold text-zinc-600 transition duration-200 ease-in-out hover:text-primary">
                  <span>{admin.email}</span>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <>
                  <li className="font-urbanist font-bold text-zinc-600 transition duration-200 ease-in-out hover:text-primary">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-primary" : null
                      }
                      to="/admin/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="font-urbanist font-bold text-zinc-600 transition duration-200 ease-in-out hover:text-primary">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-primary" : null
                      }
                      to="/admin/signup"
                    >
                      Signup
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        {/* mobile menu */}
        <div className={nav ? "absolute w-full md:hidden" : "hidden"}>
          <div
            className={
              navColor
                ? "bg-bgcolor transition duration-200 ease-in-out"
                : "border-b border-zinc-200 bg-bgcolor2 transition duration-200 ease-in-out"
            }
          >
            <ul className="container mx-auto space-y-3 py-3 px-6 lg:px-16">
              <li className="font-urbanist font-bold text-zinc-600 transition duration-200 ease-in-out hover:text-primary">
                <NavLink
                  onClick={handleNav}
                  className={({ isActive }) =>
                    isActive ? "text-primary" : null
                  }
                  to="/admin/login"
                >
                  Login
                </NavLink>
              </li>
              <li className="font-urbanist font-bold text-zinc-600 transition duration-200 ease-in-out hover:text-primary">
                <NavLink
                  onClick={handleNav}
                  className={({ isActive }) =>
                    isActive ? "text-primary" : null
                  }
                  to="/admin/signup"
                >
                  Signup
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavbarAdmin;
