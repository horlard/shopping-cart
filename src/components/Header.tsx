import React from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Navbar,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";

const Header = () => {
  const { productState, productDispatch, filterDispatch } = CartState();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <a href="/">Shopping Cart</a>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            placeholder="Search a Product"
            className="m-auto"
            style={{ width: "500px" }}
            onChange={(e) =>
              filterDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              })
            }
          />
        </Navbar.Text>
        <Dropdown alignright="true">
          <Dropdown.Toggle variant="success">
            <FaShoppingCart fontSize="25px" />
            {productState.cart.length > 0 && (
              <Badge bg="success">{productState.cart.length}</Badge>
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {productState.cart.length > 0 ? (
              <>
                {productState.cart.map((prod) => {
                  return (
                    <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>₹ {prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          productDispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  );
                })}
                <Link to="/cart">
                  <Button style={{ width: "95%", margin: "0 10px" }}>
                    Go To Cart
                  </Button>
                </Link>
              </>
            ) : (
              <span style={{ padding: "20px" }}>Cart is Empty</span>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default Header;
