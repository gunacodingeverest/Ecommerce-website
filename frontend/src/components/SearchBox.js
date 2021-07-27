import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} style={{ marginRight: "auto" }} inline>
      <Row>
        <Col>
          <Form.Control
            style={{ height: "10px", width: "13em" }}
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Products..."
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>
        </Col>
        <Col>
          <button type="submit" class="btn btn-outline-success btn-sm">
            Search
          </button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
