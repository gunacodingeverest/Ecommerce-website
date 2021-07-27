import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded" style={{ minHeight: "32em" }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <Card.Title as="div">
            <h5 style={{ fontFamily: "Play", color: "red" }}>{product.name}</h5>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`(${product.numReviews}) reviews`}
          />
        </Card.Text>

        <Card.Text as="h5" style={{ marginTop: "17px" }}>
          <strong style={{ color: "#00695c" }}>
            <strong style={{ fontSize: "0.9rem", color: "#00695c" }}>$</strong>{" "}
            {product.price}
          </strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
