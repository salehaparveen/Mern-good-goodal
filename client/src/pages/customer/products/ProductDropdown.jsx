import React from "react";

export const ProductDropdown = ({ sortOrder, handleSortOrderChange }) => {
  return (
    <div className="flex hidden items-center justify-center md:block">
      <select
        value={sortOrder}
        onChange={handleSortOrderChange}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:outline-none"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
};
