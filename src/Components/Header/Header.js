import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  FormControl,
  Navbar,
  Nav,
  Dropdown,
  Badge,
  Button,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Cartstate } from "../../Context/Context";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = Cartstate();

  return (
    <Navbar variant="light" className="Navbar">
      <div className="navItems">
        <Navbar.Brand style={{ fontSize: "2rem", color: "white" }}>
          <Link to="/">BONNY ONLINE</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search Product"
            className="m-auto"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="24px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartItem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartImage"
                        alt={prod.name}
                      />
                      <div className="cartDetails">
                        <span>{prod.name}</span>
                        <span> &#8358; {prod.price}</span>
                      </div>
                      <AiFillDelete
                        size={30}
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 5 }}>Cart is empty</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;
