import React from "react";
import { Button, Card } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";

interface iProps {
  product: {
    name: string;
    image: string;
    price: number;
    fastDelivery: boolean;
    ratings: number;
    inStock: number;
    id: number;
  };
  key: number;
}

const SingleProducts: React.FC<iProps> = ({
  product: { name, image, price, fastDelivery, ratings, inStock, id },
  product,
}) => {
  const { state, dispatch } = CartState();
  console.log(state);

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={image} alt={name} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₦ {price.split(".")[0]}</span>
            {fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rating={ratings} />
          </Card.Subtitle>
          {state.cart.some((p) => p.id === id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: product })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              disabled={inStock === 0 ? true : false}
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: product,
                })
              }
            >
              {inStock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProducts;
