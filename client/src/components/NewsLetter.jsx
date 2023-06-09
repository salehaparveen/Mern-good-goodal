import React from "react";

import { FiArrowRight } from "react-icons/fi";

const NewsLetter = () => {
  return (
    <section className="flex w-full items-center bg-bgcolor3">
      <div className="container mx-auto py-16 px-6 lg:px-16">
        <div className="flex flex-col items-center space-y-6">
          {/* text */}
          <div className="space-y-6 text-center">
            <h2 className="font-urbanist text-2xl font-bold text-primary md:text-5xl lg:text-6xl">
              Subscribe to our newsletter
            </h2>
            <p className="font-gotu text-sm text-secondary md:text-2xl lg:text-3xl">
              Receive updates, exclusive deals, and more!
            </p>
          </div>

          {/* input */}
          <div className="flex w-72 items-center space-x-6 overflow-hidden rounded-lg bg-bgcolor pr-6 shadow-2xl transition duration-300 ease-in hover:bg-gray-300 md:w-96">
            <input
              className="w-full py-2 px-6 text-sm focus:outline-none md:py-6 md:text-base"
              type="text"
              placeholder="Your Email"
            />
            <FiArrowRight size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
