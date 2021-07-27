import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h3
          style={{
            fontFamily: "Play",
            fontWeight: "bold",
            letterSpacing: "1.2px",
          }}
        >
          User Profile
        </h3>
        {message && <Message variant="danger">{message}</Message>}
        {}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" style={{ marginBottom: "2em" }}>
              <Form.Label style={{ fontFamily: "Play", color: "black" }}>
                Name
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" style={{ marginBottom: "2em" }}>
              <Form.Label style={{ fontFamily: "Play", color: "black" }}>
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password" style={{ marginBottom: "2em" }}>
              <Form.Label style={{ fontFamily: "Play", color: "black" }}>
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group
              controlId="confirmPassword"
              style={{ marginBottom: "2em" }}
            >
              <Form.Label style={{ fontFamily: "Play", color: "black" }}>
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h3
          style={{
            fontFamily: "Play",
            fontWeight: "bold",
            letterSpacing: "1.2px",
          }}
        >
          My Orders
        </h3>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  DATE
                </th>
                <th
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  TOTAL
                </th>
                <th
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  PAID
                </th>
                <th
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  DELIVERED
                </th>
                <th
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  DETAILS
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td
                    style={{
                      fontFamily: "Play",
                      color: "#007c91",
                      letterSpacing: "1.3px",
                    }}
                  >
                    {order._id}
                  </td>
                  <td style={{ fontFamily: "Play", color: "#007c91" }}>
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td style={{ fontFamily: "Play", color: "#007c91" }}>
                    {order.totalPrice}
                  </td>
                  <td style={{ fontFamily: "Play", color: "#007c91" }}>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td style={{ fontFamily: "Play", color: "#007c91" }}>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td style={{ fontFamily: "Play", color: "#007c91" }}>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
