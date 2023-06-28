import {
  Container,
  Row,
  Col,
  FormControl,
  Form,
  Button,
  FormGroup,
} from "react-bootstrap";
import {
  faBars,
  faMagnifyingGlass,
  faShoppingCart,
  faUser,
  faSignInAlt,
  faUserPlus,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
const Header = () => {
  const checkLogin = () => {
    return sessionStorage.getItem("user") !== null;
  }
  const searchs = useRef(null);
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchs.current) {
      navigate(`/tim-kiem/${searchs.current.value}`)
    }
    else {
      navigate(`/tim-kiem`)
    }
  }
  return (
    <Container fluid className="fixed-top">
      <Row>
        <Col md={12} className="header">
          <Row>
            <Col
              md={3}
              style={{
                height: "50px",
                lineHeight: "50px",
                textAlign: "center",
              }}
              className="header-item"
            >
              <Link to="/"><img src="../Images/logo.png" id="logo"></img></Link>
            </Col>
            <Col
              md={4}
              className="header-item"
              style={{ height: "50px", padding: "5px" }}
            >
              <div className="input-group">
                <FormControl type="text" placeholder="Nhập tên điện thoại" ref={searchs} />
                <div className="input-group-prepend">
                  <Button className="btn-dark" onClick={() => handleSearch()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Button>
                </div>
              </div>
            </Col>
            <Col md={5} style={{ height: "50px", textAlign: "right" }}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Link
                  style={{
                    textAlign: "center",
                    display: "inline-block",
                    marginRight: "10px",
                  }}
                  to={"/shoppingcard"}
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    style={{ color: "white" }}
                  />
                  <p style={{ color: "white" }}>Giỏ hàng</p>
                </Link>
                {
                  checkLogin() ? (
                    <div>
                      <Link
                        style={{
                          textAlign: "center",
                          display: "inline-block",
                          marginRight: "100px",
                        }}
                      >
                        <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
                        <p style={{ color: "white" }}>Tài khoản</p>
                      </Link>
                      <Link
                        style={{
                          textAlign: "center",
                          display: "inline-block",
                          marginRight: "100px",
                        }}
                        to={"/logout"}
                      >
                        <FontAwesomeIcon
                          icon={faSignOut}
                          style={{ color: "white" }}
                        />
                        <p style={{ color: "white" }}>Đăng xuất</p>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Link
                        style={{
                          textAlign: "center",
                          display: "inline-block",
                          marginRight: "100px",
                        }}
                        to={"/login"}
                      >
                        <FontAwesomeIcon
                          icon={faSignInAlt}
                          style={{ color: "white" }}
                        />
                        <p style={{ color: "white" }}>Đăng Nhập</p>
                      </Link>
                      <Link
                        style={{
                          textAlign: "center",
                          display: "inline-block",
                          marginRight: "100px",
                        }}
                        to={"/signup"}
                      >
                        <FontAwesomeIcon
                          icon={faUserPlus}
                          style={{ color: "white" }}
                        />
                        <p style={{ color: "white" }}>Đăng Ký</p>
                      </Link>
                    </div>
                  )
                }
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Header;
