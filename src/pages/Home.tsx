import React from "react";
import SingleProducts from "../components/SingleProducts";
import { CartState } from "../context/Context";
import "../styles.css";
import Filter from "../components/Filter";

const Home = () => {
  const {
    state: { products },
    productState,
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (productState.sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        productState.sort === "lowToHigh"
          ? a.price - b.price
          : b.price - a.price
      );
    }
    if (!productState.byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }
    if (productState.byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }
    if (productState.byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings <= productState.byRating
      );
    }
    if (productState.searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(productState.searchQuery)
      );
    }
    return sortedProducts;
  };

  return (
    <div className="home">
      <Filter />
      <div className="productsContainer">
        {transformProducts().map((prod) => {
          return <SingleProducts product={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
