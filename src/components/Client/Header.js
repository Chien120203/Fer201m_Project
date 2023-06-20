import { Container, Row, Col, FormControl, Form, Button, FormGroup } from 'react-bootstrap'
import { faBars, faMagnifyingGlass, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <Container fluid className="fixed-top">
            <Row>
                <Col md={12} className="header">
                    <Row>
                        <Col md={3} style={{ height: "50px", lineHeight: "50px", textAlign: "center" }} className='header-item'>
                            <img src='Images/logo.png' id='logo'></img>
                        </Col>
                        <Col md={4} className='header-item' style={{ height: "50px", padding: "5px" }}>
                            <div className='input-group'>
                                <FormControl type='text' placeholder='Nhập tên điện thoại' />
                                <div className='input-group-prepend'>
                                    <Button className='btn-dark'>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col md={5} style={{ height: "50px", textAlign: 'right' }} >
                            <div>
                                <Link style={{ textAlign: 'center', display: 'inline-block', marginRight: '10px' }}>
                                    <FontAwesomeIcon icon={faShoppingCart} style={{ color: 'white' }} />
                                    <p style={{ color: 'white' }}>Giỏ hàng</p>
                                </Link>
                                <Link style={{ textAlign: 'center', display: 'inline-block', marginRight: '100px' }}>
                                    <FontAwesomeIcon icon={faUser} style={{ color: 'white' }} />
                                    <p style={{ color: 'white' }}>Tài khoản</p>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default Header;