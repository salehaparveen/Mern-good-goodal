import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ImSpinner2 } from "react-icons/im";

import { bannerImages } from "../../../assets/product/banner/bannerImages";

import { setAddItemToCart } from "../../../features/customer/cart/cartSlice";
import {
  readCustomerProducts,
  setFilterCategory,
  setPage,
  setSearch,
  setSortOrder,
} from "../../../features/customer/product/productCustomerSlice";

import {
  ProductBanner,
  ProductGrid,
  ProductNav,
  ProductTotal,
  ProductSearch,
  ProductDropdown,
  ProductPagination,
} from "./";

const Products = () => {
  const dispatch = useDispatch();

  const { products, sortOrder, search, filterCategory, page } = useSelector(
    (store) => store.productsCustomer
  );

  useEffect(() => {
    dispatch(readCustomerProducts());
  }, [sortOrder, search, filterCategory, page]);

  const filteredBanners =
    filterCategory === "All"
      ? bannerImages.find((banner) => banner.category === "All")
      : bannerImages.filter((banner) => banner.category === filterCategory);

  const onClickCat = (cat) => {
    dispatch(setFilterCategory(cat));
  };

  const onClickPage = (index) => {
    dispatch(setPage(index + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onClickPageLeft = () => {
    dispatch(setPage(page - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onClickPageRight = () => {
    dispatch(setPage(page + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortOrderChange = (event) => {
    dispatch(setSortOrder(event.target.value));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  const handleAddToCart = (_id, category, name, price, imgOne, imgTwo) => {
    const items = { _id, category, name, price, imgOne, imgTwo };

    dispatch(setAddItemToCart(items));
  };

  const { categoryCount, categoryTotal } = (
    products.productsData || []
  )?.reduce(
    (count, product) => {
      const category = product.category;
      const index = count.categoryCount.findIndex(
        (obj) => obj.category === category
      );

      if (index >= 0) {
        count.categoryCount[index].count += 1;
      } else {
        count.categoryCount.push({ category: category, count: 1 });
      }

      count.categoryTotal += 1;

      return count;
    },
    {
      categoryCount: [],
      categoryTotal: 0,
    }
  );

  return (
    <main className="min-h-screen w-full bg-bgcolor2 font-urbanist">
      <ProductBanner filteredBanners={filteredBanners} />
      <div className="container mx-auto space-y-8 py-6 px-6 md:space-y-20 md:pb-32 lg:px-16">
        {/* header div */}

        {/* grid div */}
        <div className="grid md:grid-cols-4 md:space-y-0">
          {/* navigation left */}
          <ProductNav onClickCat={onClickCat} products={products} />

          {/* main right */}
          <div className="space-y-5 md:col-span-3">
            {/* products total, search, dropdown */}
            <div className="text-secondary md:grid md:grid-cols-3 md:place-items-center md:gap-3 md:px-3">
              {/* total */}
              <ProductTotal
                filterCategory={filterCategory}
                categoryCount={categoryCount}
                categoryTotal={categoryTotal}
              />

              {/* search */}
              <ProductSearch
                search={search}
                handleSearchChange={handleSearchChange}
              />

              {/* dropdown */}
              <ProductDropdown
                sortOrder={sortOrder}
                handleSortOrderChange={handleSortOrderChange}
              />
            </div>

            {/* products grid */}
            {!products.productsData?.length > 0 ? (
              <div className="flex h-80 items-center justify-center">
                <span className="flex items-center justify-center gap-2">
                  Loading... please wait <ImSpinner2 className="animate-spin" />
                </span>
              </div>
            ) : (
              <ProductGrid
                products={products}
                handleAddToCart={handleAddToCart}
              />
            )}

            <ProductPagination
              page={page}
              products={products}
              onClickPage={onClickPage}
              onClickPageLeft={onClickPageLeft}
              onClickPageRight={onClickPageRight}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
