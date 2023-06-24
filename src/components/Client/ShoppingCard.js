import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Header from "./Header";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import {
  Container,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Col,
} from "react-bootstrap";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faMinus,
  faPlus,
  faRecycle,
  faRemove,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Home/assets/ShoppingCard.css";
const ShoppingCard = () => {
  const [cookies, setCookie] = useCookies(["productIds"]);
  const [productIds, setProductIds] = useState([]);
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    setProductIds(cookies.productIds || []);
  }, [cookies.productIds]);
  const keys = Object.keys(productIds);
  useEffect(() => {
    fetch("http://localhost:9999/Product")
      .then((response) => response.json())
      .then((data) => {
        const list = data.filter((p) => {
          return keys.some((key) => p.ID.toString() == key);
        });
        setListProduct(list);
      });
  }, [productIds]);

  const getQuantity = (id) => {
    return productIds[id] || 0;
  };
  const updateProduct = (id, quantity) => {
    const updatedListProductIds = { ...productIds };
    updatedListProductIds[id] = quantity;
    setProductIds(updatedListProductIds);
    setCookie("productIds", updatedListProductIds, { path: "/" });
  };
  const minusQuantity = (id) => {
    let quantity = getQuantity(id);
    if (quantity > 0) {
      updateProduct(id, quantity - 1);
    }
  };
  const plusQuantity = (id) => {
    let quantity = getQuantity(id);
    if (quantity > 0) {
      updateProduct(id, quantity + 1);
    }
  };
  const deleteProduct = (id) => {
    const updatedProductIds = Object.keys(productIds).filter(
      (key) => key !== id.toString()
    );
    const updatedIdsObject = updatedProductIds.reduce((obj, key) => {
      obj[key] = productIds[key];
      return obj;
    }, {});
    setProductIds(updatedIdsObject);
    setCookie("productIds", updatedIdsObject, { path: "/" });
  };

  console.log(productIds);
  return (
    <div>
      <Header />
      <Navigation />
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} className="p-0">
            <Breadcrumb>
              <BreadcrumbItem href="/">Trang Chủ</BreadcrumbItem>
              <BreadcrumbItem>Giỏ Hàng</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col xs={12} sm={12} md={12} className="p-0">
            <h3>Có {listProduct.length} sản phẩm trong giỏ hàng</h3>
            <hr></hr>
          </Col>
          <Col xs={12} sm={12} md={12} className="pl-0">
            {listProduct.map((product) => {
              return (
                <div className="d-flex justify-content-between w-100 mb-3">
                  <div className="d-flex w-50 ">
                    <img src={product.Images[0]} width={80} height={80} />
                    <Link
                      to={`/dien-thoai/product-detail/${product.ID}`}
                      className="product-name"
                    >
                      <h5>{product.Name}</h5>
                    </Link>
                  </div>

                  <div className="d-flex flex-column w-25">
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn-minus"
                        onClick={() => minusQuantity(product.ID)}
                        disabled={getQuantity(product.ID) == 1}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <input
                        type="text"
                        value={getQuantity(product.ID)}
                        style={{
                          border: "1px solid #e1e4e6",
                          width: "13%",
                          height: "100%",
                        }}
                        className="text-center"
                        readOnly
                      />
                      <button
                        className="btn-plus"
                        onClick={() => plusQuantity(product.ID)}
                        disabled={getQuantity(product.ID) == 4}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <button
                        className="btn-delete"
                        onClick={() => deleteProduct(product.ID)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                        Xoá
                      </button>
                    </div>
                  </div>
                  <div className="product-price d-flex w-25 justify-content-end">
                    <div className="d-flex flex-column">
                      <p className="mb-1" style={{ color: "#cb1c22" }}>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.Price)}
                      </p>
                      <p
                        className=""
                        style={{
                          textDecoration: "line-through",
                          fontWeight: "400",
                          color: "#99a2aa",
                        }}
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format((1 - product.SalePrice) * product.Price)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Col>
          <Col xs={12} sm={12} md={12} className="pl-0">
            <hr></hr>
            <Link className="w-100 buy-btn btn" to={`dien-thoai/purchase`}>
              <span className="text-uppercase">thanh toán tất cả</span>
              <br></br>
            </Link>
          </Col>
        </Row>
      </Container>
      {/* <Footer /> */}
    </div>
  );
};
export default ShoppingCard;
