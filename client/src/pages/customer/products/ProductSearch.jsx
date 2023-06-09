import React from "react";
import { FiSearch } from "react-icons/fi";

export const ProductSearch = ({ search, handleSearchChange }) => {
  return (
    <div className="relative hidden font-urbanist md:block">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3">
        <FiSearch className="h-5 w-5 text-gray-500" />
      </div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-4 px-11 text-sm text-gray-900 focus:outline-none"
        placeholder="Search Products, etc..."
      />
    </div>
  );
};
