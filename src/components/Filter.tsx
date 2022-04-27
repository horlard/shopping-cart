import { Button, Form } from "react-bootstrap";
import { CartState } from "../context/Context";
import "../styles.css";
import Rating from "./Rating";

const Filters = () => {
  const { filterState, filterDispatch } = CartState();

  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          onChange={() =>
            filterDispatch({ type: "SORT_BY_PRICE", payload: "lowToHigh" })
          }
          checked={filterState.sort === "lowToHigh" ? true : false}
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
            filterDispatch({ type: "SORT_BY_PRICE", payload: "HighToLow" })
          }
          checked={filterState.sort === "HighToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() =>
            filterDispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={filterState.byStock}
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
            filterDispatch({
              type: "FILTER_BY_DELIVERY",
            })
          }
          checked={filterState.byFastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={filterState.byRating}
          onClick={(i) =>
            filterDispatch({ type: "FILTER_BY_RATING", payload: i + 1 })
          }
        />
      </span>
      <Button
        variant="light"
        onClick={() =>
          filterDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
