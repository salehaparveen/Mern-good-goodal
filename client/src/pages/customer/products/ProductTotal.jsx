import React from "react";

export const ProductTotal = ({
  filterCategory,
  categoryCount,
  categoryTotal,
}) => {
  console.log(categoryCount);
  return (
    <div>
      {filterCategory === "All" ? (
        categoryCount.length > 0 ? (
          <p>There are a total of {categoryTotal} products.</p>
        ) : (
          <p>Product not available.</p>
        )
      ) : (
        <>
          {categoryCount.length > 0 ? (
            categoryCount
              .filter((count) => count.category === filterCategory)
              .map((count, i) => (
                <p key={i}>
                  There are {count.count} {count.category} products.
                </p>
              ))
          ) : (
            <p>Product not available.</p>
          )}
        </>
      )}
    </div>
  );
};
