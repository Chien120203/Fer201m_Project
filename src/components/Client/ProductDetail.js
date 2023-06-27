import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation as Nav } from "swiper";
import { useCookies } from "react-cookie";
import Footer from "./Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import "swiper/swiper-bundle.css";
import "./Home/assets/ProductDetail.css";
SwiperCore.use([Nav]);

const ProductDetail = () => {
  const { ID } = useParams();
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});
  const { Images, Specifications } = product;
  const [cookies, setCookie] = useCookies(["productIds"]);
  const productIds = cookies.productIds || [];
  useEffect(() => {
    fetch("http://localhost:9999/Product")
      .then((response) => response.json())
      .then((data) => {
        let p = data.find((pr) => pr.ID == ID);
        setProduct(p);
        fetch(" http://localhost:9999/Category")
          .then((response) => response.json())
          .then((data1) => {
            let cate = data1.find((c) => c.ID == p.Category_ID);
            setCategory(cate);
          });
      });
  }, []);

  const handlePurchase = (product) => {
    const productId = product.ID;
    const existingProductIds = cookies.productIds || {};
    if (existingProductIds[productId]) {
      // If the productId exists, increment the count by 1
      existingProductIds[productId] += 1;
    } else {
      // If the productId does not exist, initialize the count to 1
      existingProductIds[productId] = 1;
    }
    setCookie("productIds", existingProductIds, { path: "/" });
  };
  // useEffect(() => {
  //   console.log(productIds);
  // }, [productIds]);
  return (
    <div>
      <Header />
      <Navigation />
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} className="p-0">
            <Breadcrumb>
              <BreadcrumbItem href="/">Trang Chủ</BreadcrumbItem>
              <BreadcrumbItem href="/dien-thoai">Điện Thoại</BreadcrumbItem>
              <BreadcrumbItem href="/">{category.Category_Name}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col xs={12} sm={12} md={12} className="p-0">
            <h3 className="product-name">{product.Name}</h3>
            <hr></hr>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={12} xs={12} style={{ height: "auto", padding: "0" }}>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation
              loop
              className="swiper-container m-0"
              style={{ width: "100%", height: "400px" }}
            >
              {Images && Images.length > 0 ? (
                Images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="swiper-image"
                      src={image}
                      alt={`Slide ${index + 1}`}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <img
                    className="swiper-image"
                    src="placeholder.jpg"
                    alt="Placeholder Slide"
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </Col>
          <Col md={6} sm={12} xs={12} style={{ height: "auto", padding: "0" }}>
            <div className="d-flex ">
              <h2 className="mr-2" style={{ color: "#cb1c22" }}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.Price)}
              </h2>
              <p
                className=""
                style={{
                  margin: " auto 0",
                  fontSize: "20px",
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
            <div className="product-spe mb-2">
              <table className="table table-responsive">
                <tbody>
                  {Specifications &&
                    Object.entries(Specifications).map(([key, value]) => {
                      return (
                        <tr key={key} className="p-0">
                          <td className="mr-5 p-1">{key}:</td>
                          <td className="p-1">{value}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <Row>
              <Col xs={12}>
                <Link
                  className="w-100 buy-btn btn"
                  onClick={() => handlePurchase(product)}
                  to={`/dien-thoai/purchase/${product.ID}/1`}
                >
                  <span className="text-uppercase">Mua Ngay</span>
                  <br></br>
                  <span>Giao hàng miễn phí hoặc nhận tại shop</span>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default ProductDetail;
