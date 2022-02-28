import React from "react";
import { Cartstate } from "../../Context/Context";
import SingleProducts from "../SingleProduct/SingleProducts";
import Filter from "./Filter";
import "./Home.css";

const Home = () => {
  const {
    state: { Products },
    productState: { byFastDelivery, byRating, sort, searchQuery },
  } = Cartstate();

  const transformProduct = () => {
    let sortedProducts = Products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.rating >= byRating);
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }
    return sortedProducts;
  };
  return (
    <div className="home">
      <Filter />
      <div className="productContainer">
        {transformProduct().map((prod) => (
          <SingleProducts prod={prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
