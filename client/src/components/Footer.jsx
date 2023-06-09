import React from "react";

import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="w-full bg-bgcolor">
      <div className="container mx-auto flex items-center justify-between py-7 px-6 lg:px-16">
        <p className="font-urbanist text-sm text-primary md:text-base">
          Copyright © 2022 goodal
        </p>

        <div>
          <ul className="flex space-x-4 text-xl">
            <li>
              <a href="/">
                <AiFillInstagram />
              </a>
            </li>
            <li>
              <a href="/">
                <BsYoutube />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillFacebook />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
