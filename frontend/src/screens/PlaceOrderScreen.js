import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice < 100 ? 0 : 12);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush" style={{ marginBottom: "1.6em" }}>
            <ListGroup.Item>
              <h3
                style={{
                  fontFamily: "Play",
                  fontWeight: "bold",
                  letterSpacing: "1.2px",
                }}
              >
                Shipping
              </h3>
              <p
                style={{
                  fontFamily: "Play",
                  fontWeight: "bold",
                  letterSpacing: "1.2px",
                  color: "green",
                }}
              >
                <strong
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    fontSize: "1.2em",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  Address:{" "}
                </strong>
                {cart.shippingAddress.address}
              </p>{" "}
              <p
                style={{
                  fontFamily: "Play",
                  fontWeight: "bold",
                  letterSpacing: "1.2px",
                  color: "green",
                }}
              >
                <strong
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    fontSize: "1.2em",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  City:{" "}
                </strong>
                {cart.shippingAddress.city}
              </p>
              <p
                style={{
                  fontFamily: "Play",
                  fontWeight: "bold",
                  letterSpacing: "1.2px",
                  color: "green",
                }}
              >
                <strong
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    fontSize: "1.2em",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  Postal Code:{" "}
                </strong>
                {cart.shippingAddress.postalCode}
              </p>
              <p
                style={{
                  fontFamily: "Play",
                  fontWeight: "bold",
                  letterSpacing: "1.2px",
                  color: "green",
                }}
              >
                <strong
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    fontSize: "1.2em",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  Country:{"  "}
                </strong>
                {cart.shippingAddress.country}
              </p>
              <p
                style={{
                  fontFamily: "Play",
                  fontWeight: "bold",
                  letterSpacing: "1.2px",
                  color: "green",
                }}
              >
                <strong
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    fontSize: "1.2em",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  Phone Number:{"  "}
                </strong>
                {cart.shippingAddress.phoneNumber}
              </p>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush" style={{ marginBottom: "1.6em" }}>
            <ListGroup.Item
              style={{
                fontFamily: "Play",
                fontWeight: "bold",
                letterSpacing: "1.2px",
              }}
            >
              <h3
                style={{
                  fontFamily: "Play",
                  fontWeight: "bold",
                  letterSpacing: "1.2px",
                }}
              >
                Payment Method
              </h3>
              <strong
                style={{
                  fontFamily: "Play",
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  letterSpacing: "1.2px",
                  color: "#29434e",
                }}
              >
                Method:{" "}
              </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush" style={{ marginBottom: "1.6em" }}>
            <ListGroup.Item>
              <h3
                style={{
                  fontFamily: "Play",
                  fontWeight: "bold",
                  letterSpacing: "1.2px",
                }}
              >
                Order Items
              </h3>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col
                          style={{
                            fontFamily: "Play",

                            textDecoration: "none",
                          }}
                        >
                          <Link
                            to={`/product/${item.product}`}
                            style={{ textDecoration: "none", color: "red" }}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                  }}
                >
                  Order Summary
                </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                  }}
                >
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                  }}
                >
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                  }}
                >
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                  }}
                >
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
