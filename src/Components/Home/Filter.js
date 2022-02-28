import React from "react";
import { Form, Button } from "react-bootstrap";
import { Cartstate } from "../../Context/Context";
import Rating from "./Rating";

const Filter = () => {
  const {
    productState: { byFastDelivery, byRating, sort },
    productDispatch,
  } = Cartstate();

  return (
    <div>
      <div className="filters">
        <span className="title">Filter Products</span>
        <span>
          <Form.Check
            inline
            label="Ascending"
            name="group1"
            type="radio"
            id={`inline-1`}
            onChange={() =>
              productDispatch({
                type: "SORT_BY_PRICE",
                payload: "highToLow",
              })
            }
            checked={sort === "highToLow" ? true : false}
          />
        </span>
        <span>
          <Form.Check
            inline
            label="Descending"
            name="group1"
            type="radio"
            id={`inline-2`}
            onChange={() =>
              productDispatch({
                type: "SORT_BY_PRICE",
                payload: "lowToHigh",
              })
            }
          />
        </span>
        <span>
          <Form.Check
            inline
            label="Fast Delivery Only"
            name="group1"
            type="checkbox"
            id={`inline-4`}
            onChange={() =>
              productDispatch({
                type: "FILTER_BY_DELIVERY",
              })
            }
            checked={byFastDelivery}
          />
        </span>
        <span>
          <label style={{ paddingRight: 10 }}>Rating: </label>
          <Rating
            rating={byRating}
            onClick={(i) =>
              productDispatch({
                type: "FILTER_BY_RATING",
                payload: i + 1,
              })
            }
            style={{ cursor: "pointer" }}
          />
        </span>
        <Button
          variant="light"
          onClick={() =>
            productDispatch({
              type: "CLEAR_FILTERS",
            })
          }
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default Filter;
