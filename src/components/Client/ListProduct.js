import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListProduct = () => {
  const [category, setCategory] = useState([]);
  const [Product, setProduct] = useState([]);
  const [categoryId, setCategoryId] = useState("all");
  const [price, setPrice] = useState(0);
  useEffect(() => {
    fetch("http://localhost:9999/Category")
      .then((res) => res.json())
      .then((result) => {
        setCategory(result);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:9999/Product")
      .then((res) => res.json())
      .then((result) => {
        if (categoryId === "all") {
          setProduct(
            result.filter((r) => {
              if (price == 0) {
                return r.Price > 0;
              } else if (price == 1) {
                return r.Price * (1 - r.SalePrice) < 2000000;
              } else if (price == 2) {
                return (
                  r.Price * (1 - r.SalePrice) >= 2000000 &&
                  r.Price * (1 - r.SalePrice) <= 4000000
                );
              } else if (price == 3) {
                return (
                  r.Price * (1 - r.SalePrice) >= 4000000 &&
                  r.Price * (1 - r.SalePrice) <= 7000000
                );
              } else if (price == 4) {
                return (
                  r.Price * (1 - r.SalePrice) >= 7000000 &&
                  r.Price * (1 - r.SalePrice) <= 13000000
                );
              } else {
                return r.Price * (1 - r.SalePrice) > 13000000;
              }
            })
          );
        } else {
          setProduct(
            result.filter((r) => {
              if (r.Category_ID == categoryId) {
                if (price == 0) {
                  return r.Price > 0;
                } else if (price == 1) {
                  return r.Price * (1 - r.SalePrice) < 2000000;
                } else if (price == 2) {
                  return (
                    r.Price * (1 - r.SalePrice) >= 2000000 &&
                    r.Price * (1 - r.SalePrice) <= 4000000
                  );
                } else if (price == 3) {
                  return (
                    r.Price * (1 - r.SalePrice) >= 4000000 &&
                    r.Price * (1 - r.SalePrice) <= 7000000
                  );
                } else if (price == 4) {
                  return (
                    r.Price * (1 - r.SalePrice) >= 7000000 &&
                    r.Price * (1 - r.SalePrice) <= 13000000
                  );
                } else {
                  return r.Price * (1 - r.SalePrice) > 13000000;
                }
              }
            })
          );
        }
      });
  }, [categoryId, price]);
  return (
    <div>
      <Header />
      <Navigation />
      <Container style={{ marginTop: "30px", marginBottom: "100px" }}>
        <Row>
          <Col md={3}>
            <h5>Hãng sản xuất</h5>
            <Row>
              <Col md={6}>
                <input
                  type="radio"
                  value="all"
                  name="category"
                  id="all"
                  defaultChecked={true}
                  onClick={(e) => {
                    setCategoryId(e.target.value);
                  }}
                />
                <label for="all" style={{ marginLeft: "5px" }}>
                  Tất cả
                </label>
              </Col>
              {category.map((c) => {
                return (
                  <Col md={6}>
                    <input
                      type="radio"
                      id={c.ID}
                      value={c.ID}
                      name="category"
                      onClick={(e) => {
                        setCategoryId(e.target.value);
                      }}
                    />
                    <label for={c.ID} style={{ marginLeft: "5px" }}>
                      {c.Category_Name}
                    </label>
                  </Col>
                );
              })}
            </Row>
            <h5>Mức giá</h5>
            <Row>
              <Col>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>
                    <input
                      type="radio"
                      value="all"
                      name="price"
                      id="allprice"
                      defaultChecked={true}
                      onClick={() => {
                        setPrice(0);
                      }}
                    />
                    <label for="allprice" style={{ marginLeft: "5px" }}>
                      Tất cả
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      value="all"
                      name="price"
                      id="below2"
                      onClick={() => {
                        setPrice(1);
                      }}
                    />
                    <label for="below2" style={{ marginLeft: "5px" }}>
                      Dưới 2 triệu
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      value="all"
                      name="price"
                      id="2to4"
                      onClick={() => {
                        setPrice(2);
                      }}
                    />
                    <label for="2to4" style={{ marginLeft: "5px" }}>
                      Từ 2-4 triệu
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      value="all"
                      name="price"
                      id="4to7"
                      onClick={() => {
                        setPrice(3);
                      }}
                    />
                    <label for="4to7" style={{ marginLeft: "5px" }}>
                      Từ 4-7 triệu
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      value="all"
                      name="price"
                      id="7to13"
                      onClick={() => {
                        setPrice(4);
                      }}
                    />
                    <label for="7to13" style={{ marginLeft: "5px" }}>
                      Từ 7-13 triệu
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      value="all"
                      name="price"
                      id="morethan13"
                      onClick={() => {
                        setPrice(5);
                      }}
                    />
                    <label for="morethan13" style={{ marginLeft: "5px" }}>
                      Trên 13 triệu
                    </label>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col md={9}>
            <Row>
              <Col md={12} className="product-quantity">
                <h3>Điện Thoại</h3> ({Product.length} sản phẩm)
              </Col>
              <Col md={12}>
                <Row>
                  {Product.map((p) => {
                    return (
                      <Col md={4} key={p.ID}>
                        <div className="product">
                          <div className="product-img">
                            <img src={p.Images[0]} alt="Card image" />
                          </div>
                          <div>
                            <h4>{p.Name}</h4>
                            <div className="price">
                              <div className="sale-price">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format((1 - p.SalePrice) * p.Price)}
                              </div>
                              <div className="real-price">
                                <p>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(p.Price)}
                                </p>
                              </div>
                            </div>
                            <Link
                              to={`product-detail/${p.ID}`}
                              className="btn btn-dark"
                              style={{ marginTop: "20px" }}
                            >
                              Mua Ngay
                            </Link>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
export default ListProduct;
