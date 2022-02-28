import React, { createContext, useContext, useReducer } from "react";
import { CartReducer } from "./Reducer";
import { ProductReducer } from "./Reducer";

import { Products } from "../Components/Data";

const Cart = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, {
    Products: Products,
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  });

  localStorage.setItem("cart", JSON.stringify(state.cart));

  const [productState, productDispatch] = useReducer(ProductReducer, {
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  //   The Cart in line 6
  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

// ===== We need to export the created context function from line 8 and the Cart context in line 6 =======

//  Exporting the Context Function in line 8 as a default value
export default Context;

// The only way to export the Cart function in line 6 is by creating a function
//  that return the Cart context, The UseContext will in line 27 allow the Cart context to ne accessable

export const Cartstate = () => {
  return useContext(Cart);
};

// 100% understood
