import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { Cartstate } from "../../Context/Context";
import Rating from "../Home/Rating";
import "./Cart.css";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = Cartstate();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0));
  }, [cart]);
  return (
    <div className="cart">
      <div className="productContainers">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col>
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fluid
                    rounded
                    style={{
                      width: "500px",
                      height: "200px",
                      objectFit: "cover ",
                    }}
                  />
                </Col>
                <Col md={2} className="cartI">
                  <span>{prod.name}</span>
                </Col>
                <Col md={2} className="cartI">
                  &#8358; {prod.price}
                </Col>
                <Col md={2} className="cartI">
                  <Rating rating={prod.rating} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.instock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filter summary">
        <span className="title">subtotal ({cart.length}) items</span>
        <span>total: &#8358; {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
