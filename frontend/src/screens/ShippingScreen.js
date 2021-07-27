import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalCode, country, phoneNumber })
    );
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h3
        style={{
          fontFamily: "Play",

          fontWeight: "bold",
          letterSpacing: "1.2px",
        }}
      >
        Shipping
      </h3>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" style={{ marginBottom: "2em" }}>
          <Form.Label style={{ fontFamily: "Play", color: "black" }}>
            Address
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" style={{ marginBottom: "2em" }}>
          <Form.Label style={{ fontFamily: "Play", color: "black" }}>
            City
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode" style={{ marginBottom: "2em" }}>
          <Form.Label style={{ fontFamily: "Play", color: "black" }}>
            Postal Code
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" style={{ marginBottom: "2em" }}>
          <Form.Label style={{ fontFamily: "Play", color: "black" }}>
            Country
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="phoneNumber" style={{ marginBottom: "2em" }}>
          <Form.Label style={{ fontFamily: "Play", color: "black" }}>
            Phone Number
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
