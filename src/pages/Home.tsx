import React from "react";
import SingleProducts from "../components/SingleProducts";
import { CartState } from "../context/Context";
import "../styles.css";
import Filter from "../components/Filter";

const Home = () => {
  const {
    productState: { products },
    filterState,
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (filterState.sort) {
      sortedProducts = sortedProducts.sort(
        (a: { price: string }, b: { price: string }) =>
          filterState.sort === "lowToHigh"
            ? Number(a.price) - Number(b.price)
            : Number(b.price) - Number(a.price)
      );
    }
    if (!filterState.byStock) {
      sortedProducts = sortedProducts.filter(
        (prod: { inStock: number }) => prod.inStock
      );
    }
    if (filterState.byFastDelivery) {
      sortedProducts = sortedProducts.filter(
        (prod: { fastDelivery: boolean }) => prod.fastDelivery
      );
    }
    if (filterState.byRating) {
      sortedProducts = sortedProducts.filter(
        (prod: { ratings: number }) => prod.ratings <= filterState.byRating
      );
    }
    if (filterState.searchQuery) {
      sortedProducts = sortedProducts.filter((prod: { name: string }) =>
        prod.name.toLowerCase().includes(filterState.searchQuery)
      );
    }
    return sortedProducts;
  };

  return (
    <div className="home">
      <Filter />
      <div className="productsContainer">
        {transformProducts().map((prod: { id: string }) => {
          return <SingleProducts product={prod} key={Number(prod.id)} />;
        })}
      </div>
    </div>
  );
};

export default Home;
