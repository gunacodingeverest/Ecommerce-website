import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h3
            style={{
              fontFamily: "Play",
              fontWeight: "bold",
              letterSpacing: "1.2px",
            }}
          >
            Products
          </h3>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
                  NAME
                </th>
                <th
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  PRICE
                </th>
                <th
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  CATEGORY
                </th>
                <th
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  BRAND
                </th>
                <th
                  style={{
                    fontFamily: "Play",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
                    color: "#29434e",
                  }}
                >
                  EDIT/DELETE
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td style={{ fontFamily: "Play", color: "#007c91" }}>
                    {product._id}
                  </td>
                  <td style={{ fontFamily: "Play", color: "#007c91" }}>
                    {product.name}
                  </td>
                  <td style={{ fontFamily: "Play", color: "#007c91" }}>
                    ${product.price}
                  </td>
                  <td style={{ fontFamily: "Play", color: "#007c91" }}>
                    {product.category}
                  </td>
                  <td style={{ fontFamily: "Play", color: "#007c91" }}>
                    {product.brand}
                  </td>
                  <td style={{ fontFamily: "Play", color: "#007c91" }}>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>{" "}
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
