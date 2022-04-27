import React, { createContext, useReducer, useContext } from "react";
import { faker } from "@faker-js/faker";
import { productReducer, filterReducer } from "./reducer";
import { CartContext } from "../types";

const Cart: React.Context<CartContext> = createContext({
  productState: {},
  productDispatch: () => {},
  filterState: {},
  filterDispatch: () => {},
});

const Context = (props: any) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));
  const [productState, productDispatch] = useReducer(productReducer, {
    products,
    cart: [],
  });
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });
  console.log(products);

  return (
    <Cart.Provider
      value={{ productState, productDispatch, filterState, filterDispatch }}
    >
      {props.children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
