import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                style={{ height: "30em" }}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush" style={{ marginBottom: "0.5em" }}>
                <ListGroup.Item>
                  <h5 style={{ fontFamily: "Play", color: "red" }}>
                    {product.name}
                  </h5>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush" style={{ marginBottom: "0.5em" }}>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`(${product.numReviews}) reviews`}
                  />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush" style={{ marginBottom: "0.5em" }}>
                <ListGroup.Item
                  style={{
                    fontFamily: "Play",
                    color: "#29434e",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                  }}
                >
                  Price: ${product.price}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item
                  style={{ fontFamily: "IBM Plex Sans", color: "green" }}
                >
                  <p
                    style={{
                      fontFamily: "Play",
                      color: "#29434e",
                      fontWeight: "bold",
                      letterSpacing: "1.2px",
                    }}
                  >
                    Description:
                  </p>{" "}
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row
                      style={{
                        fontFamily: "Play",
                        color: "#29434e",
                        fontWeight: "bold",
                        letterSpacing: "1.2px",
                      }}
                    >
                      <Col>Price:</Col>
                      <Col>
                        <strong style={{ color: "#00695c" }}>
                          <strong
                            style={{ fontSize: "0.9rem", color: "#00695c" }}
                          >
                            $
                          </strong>
                          {product.price}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row
                      style={{
                        fontFamily: "Play",
                        color: "#29434e",
                        fontWeight: "bold",
                        letterSpacing: "1.2px",
                      }}
                    >
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row
                        style={{
                          fontFamily: "Play",
                          color: "#29434e",
                          fontWeight: "bold",
                          letterSpacing: "1.2px",
                        }}
                      >
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} style={{ marginTop: "2em" }}>
              {product.reviews.length === 0 && (
                <Message variant="warning">
                  <p
                    style={{
                      fontFamily: "Play",
                      color: "#004d40",
                      fontWeight: "bold",
                      letterSpacing: "1.2px",
                    }}
                  >
                    No Reviews Yet (Be the first person to give a review)
                  </p>
                </Message>
              )}
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3
                    style={{
                      fontFamily: "Play",

                      fontWeight: "bold",
                      letterSpacing: "1.2px",
                    }}
                  >
                    Reviews
                  </h3>
                </ListGroup.Item>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong
                      style={{
                        fontFamily: "Play",
                        letterSpacing: "1.4px",
                        fontSize: "1.15rem",
                      }}
                    >
                      {review.name}
                    </strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p style={{ fontFamily: "play" }}>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col style={{ marginTop: "2em" }}>
              <ListGroup>
                <ListGroup.Item>
                  <h3
                    style={{
                      fontFamily: "Play",

                      fontWeight: "bold",
                      letterSpacing: "1.2px",
                    }}
                  >
                    Write a Customer Review
                  </h3>
                  {successProductReview && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group
                        controlId="rating"
                        style={{ marginBottom: "2em" }}
                      >
                        <Form.Label style={{ fontFamily: "Play" }}>
                          Rating
                        </Form.Label>
                        <Form.Control
                          style={{
                            fontFamily: "Play",
                            color: "green",
                            fontWeight: "bold",
                            letterSpacing: "1.2px",
                          }}
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option
                            value=""
                            style={{
                              fontFamily: "Play",
                              color: "#29434e",
                              fontWeight: "bold",
                              letterSpacing: "1.2px",
                            }}
                          >
                            Select...
                          </option>
                          <option
                            value="1"
                            style={{
                              fontFamily: "Play",
                              color: "red",
                              fontWeight: "bold",
                              letterSpacing: "1.2px",
                            }}
                          >
                            1 - Poor
                          </option>
                          <option
                            value="2"
                            style={{
                              fontFamily: "Play",
                              color: "red",
                              fontWeight: "bold",
                              letterSpacing: "1.2px",
                            }}
                          >
                            2 - Fair
                          </option>
                          <option
                            value="3"
                            style={{
                              fontFamily: "Play",
                              color: "darkorange",
                              fontWeight: "bold",
                              letterSpacing: "1.2px",
                            }}
                          >
                            3 - Good
                          </option>
                          <option
                            value="4"
                            style={{
                              fontFamily: "Play",
                              color: "green",
                              fontWeight: "bold",
                              letterSpacing: "1.2px",
                            }}
                          >
                            4 - Very Good
                          </option>
                          <option
                            value="5"
                            style={{
                              fontFamily: "Play",
                              color: "green",
                              fontWeight: "bold",
                              letterSpacing: "1.2px",
                            }}
                          >
                            5 - Excellent
                          </option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group
                        controlId="comment"
                        style={{ marginBottom: "2em" }}
                      >
                        <Form.Label style={{ fontFamily: "Play" }}>
                          Comment
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="warning">
                      <p
                        style={{
                          fontFamily: "Play",
                          color: "#004d40",
                          fontWeight: "bold",
                          letterSpacing: "1.2px",
                        }}
                      >
                        Please{" "}
                        <Link
                          to="/login"
                          style={{
                            textDecoration: "none",
                            fontFamily: "IBM Plex Sans",
                          }}
                        >
                          SIGN IN
                        </Link>{" "}
                        to write a Review{" "}
                      </p>
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
