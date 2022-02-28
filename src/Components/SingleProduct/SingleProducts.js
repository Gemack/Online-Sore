import React from "react";
import { Card, Button } from "react-bootstrap";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdOutlineCancelPresentation } from "react-icons/md";
import Rating from "../Home/Rating";
import { Cartstate } from "../../Context/Context";
const SingleProducts = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = Cartstate();
  return (
    <div className="products">
      <Card>
        <Card.Img
          variant="top"
          src={prod.image}
          alt={prod.name}
          className="image"
        />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>&#8358; {prod.price}</span>
            {prod.fastDelivery ? (
              <div style={{ color: "lime" }}>
                Door step delivery{" "}
                <BsFillCartCheckFill color="lime" size={33} />{" "}
              </div>
            ) : (
              <div style={{ color: "red" }}>
                No Door step Delivery{" "}
                <MdOutlineCancelPresentation color="red" size={33} />
              </div>
            )}
            <Rating rating={prod.rating} />
          </Card.Subtitle>
          {cart.some((p) => p.id === prod.id) ? (
            <Button
              varaint="danger"
              style={{ background: "red", marginLeft: "1rem" }}
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                });
              }}
            >
              Remove
            </Button>
          ) : (
            <Button
              disabled={!prod.instock}
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                });
              }}
            >
              {!prod.instock ? "Out of product" : "Add"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProducts;
