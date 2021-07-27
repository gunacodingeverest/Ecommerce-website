import React, { useState } from "react";
import { Form, Button, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h3
        style={{
          fontFamily: "Play",

          fontWeight: "bold",
          letterSpacing: "1.2px",
        }}
      >
        Payment Method
      </h3>
      <ListGroup style={{ padding: "2em" }}>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label
              as="legend"
              style={{
                fontFamily: "Play",
                marginBottom: "0.5em",
                fontWeight: "bold",
                letterSpacing: "1.2px",
                color: "green",
              }}
            >
              Select Method
            </Form.Label>
            <Col>
              <Form.Check
                style={{
                  fontFamily: "Play",
                  color: "ThreeDDarkShadow",
                  fontWeight: "bold",
                  letterSpacing: "1.2px",
                  marginBottom: "0.5em",
                }}
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </ListGroup>
    </FormContainer>
  );
};

export default PaymentScreen;
