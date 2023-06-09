import React from "react";

import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

export const ProductPagination = ({
  page,
  products,
  onClickPage,
  onClickPageLeft,
  onClickPageRight,
}) => {
  const totalPages = Math.ceil(products.total / products.limit);

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  const baseStyle = "border border-gray-700 px-3 py-2 leading-tight";
  const activeStyle = "bg-gray-700 text-white";
  const inactiveStyle =
    "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white";

  return (
    <div className="flex items-center justify-center pt-16">
      <button
        onClick={onClickPageLeft}
        disabled={isFirstPage}
        className={`${
          isFirstPage
            ? "cursor-default rounded-l-lg border border-gray-700 bg-gray-700 px-3 py-3 leading-tight text-gray-400 opacity-50"
            : "rounded-l-lg border border-gray-700 bg-gray-800 px-3 py-3 leading-tight text-gray-400 hover:bg-gray-700 hover:text-white"
        }`}
      >
        <MdOutlineArrowBackIos className="h-3 w-3" />
      </button>

      {totalPages > 0 &&
        [...Array(totalPages)].map((val, index) => (
          <button
            key={index}
            onClick={() => onClickPage(index)}
            className={`${baseStyle} ${
              page === index + 1 ? activeStyle : inactiveStyle
            }`}
          >
            {index + 1}
          </button>
        ))}

      <button
        onClick={onClickPageRight}
        disabled={isLastPage}
        className={`${
          isLastPage
            ? "cursor-default rounded-r-lg border border-gray-700 bg-gray-700 px-3 py-3 leading-tight text-gray-400 opacity-50"
            : "rounded-r-lg border border-gray-700 bg-gray-800 px-3 py-3 leading-tight text-gray-400 hover:bg-gray-700 hover:text-white"
        }`}
      >
        <MdOutlineArrowForwardIos className="h-3 w-3" />
      </button>
    </div>
  );
};
