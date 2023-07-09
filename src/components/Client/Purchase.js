import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import Header from "./Header";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
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
const Purchase = () => {
    const { ID, TYPE } = useParams();
    const [cookies, setCookie] = useCookies(["productIds"]);
    const [productIds, setProductIds] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const firstName = useRef(null);
    const lastName = useRef(null);
    const email = useRef(null);
    const phoneNumber = useRef(null);
    const address = useRef(null);
    const [purchaseMethods, setPurchaseMethods] = useState("Thanh toán khi nhận hàng");
    const navigate = useNavigate();
    const [quantity,setQuantity] = useState(1);
    useEffect(() => {
        setProductIds(cookies.productIds || []);
    }, [cookies.productIds]);
    const keys = Object.keys(productIds);
    useEffect(() => {
        fetch("http://localhost:9999/Product")
            .then((response) => response.json())
            .then((data) => {
                if (TYPE == 1) {
                    setListProduct(data.filter((d) => {
                        return d.id == ID;
                    }))
                    const selectedProduct = data.filter((d) => {
                        return d.id == ID;
                    })
                    let sum = 0;
                    selectedProduct.map((a) => {
                        sum += (a.Price+(1-a.SalePrice))*quantity;
                    })
                    setTotalPrice(sum);
                }
                else {
                    const list = data.filter((p) => {
                        return keys.some((key) => p.id.toString() == key);
                    });
                    setListProduct(list);
                    let sum = 0;
                    list.map((a) => {
                        sum = sum + (a.Price*(1-a.SalePrice)) * cookies.productIds[a.id]
                    })
                    setTotalPrice(sum);
                }
            });
    }, [productIds]);
    const getQuantity = (id) => {
        return productIds[id] || 1;
    };
    const getTotalPrice = () => {
        let sum = listProduct.reduce((a, b) => {
            return (a.Price*(1-a.SalePrice)*getQuantity(a.id)) + (b.Price*(1-b.SalePrice)*getQuantity(b.id)) ;
        })
        setTotalPrice(sum);
    }
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
        // getTotalPrice();
    };
    const updateProduct = (id, quantity) => {
        const updatedListProductIds = { ...productIds };
        updatedListProductIds[id] = quantity;
        setProductIds(updatedListProductIds);
        setQuantity(quantity+1);
        setCookie("productIds", updatedListProductIds, { path: "/" });
    };
    const deleteProduct = (id) => {
        if (TYPE == 2) {
            const updatedProductIds = Object.keys(productIds).filter(
                (key) => key !== id.toString()
            );
            const updatedIdsObject = updatedProductIds.reduce((obj, key) => {
                obj[key] = productIds[key];
                return obj;
            }, {});
            setProductIds(updatedIdsObject);
            setCookie("productIds", updatedIdsObject, { path: "/" });
        }
        else {
            setListProduct([]);
            setTotalPrice(0);
        }
    };

    var Id = 0;
    const getOrderDetailIDD = (a) => {
        Id = a;
        console.log(`nhay vaoday: ${Id}`);
    }
    const getOrderDetailId = () => {
        fetch("http://localhost:9999/OrderDetail")
            .then((response) => response.json())
            .then((data) => {
                // setOrderDetailId(data.length + 1);
                getOrderDetailIDD(data.length + 1)
                console.log(`data: ${data.length}`);
            });
    }
    const handlePurchase = () => {
        if (listProduct.length === 0) {
            if (window.confirm("Bạn chưa chọn sản phẩm nào") == true) {
                navigate('/dien-thoai/all');
            }
        }
        if (firstName.current.value.trim() === '' || lastName.current.value.trim() === '' || phoneNumber.current.value.trim() === ''
            || address.current.value.trim() === '' || email.current.value.trim() === '') {
            alert('Vui lòng nhập đầy đủ thông tin.')
        }
        else {
            const user = JSON.parse(sessionStorage.getItem("user"));
            const newOrderDetail = {
                firstName: firstName.current.value.trim(),
                lastName: lastName.current.value.trim(),
                phone: phoneNumber.current.value.trim(),
                address: address.current.value.trim(),
                email: email.current.value.trim(),
                purchaseMethod: purchaseMethods,
                userId: user.id,
                totalPrice: totalPrice
            };
            getOrderDetailId();
            // console.log(`id: ${Id}`);
            fetch("http://localhost:9999/OrderDetail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(newOrderDetail),
            })
                .then((response) => {
                    return response.json();
                })
            listProduct.map((product) => {
                const newOrder = {
                    product_id: product.id,
                    Quantity: getQuantity(product.id),
                    Price: (product.Price*(1-product.SalePrice)) * getQuantity(product.id),
                    OrderDetailId: Id
                }
                fetch("http://localhost:9999/Order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(newOrder),
                })
                    .then((response) => {
                        return response.json();
                    })
                deleteProduct(product.id)
            })
            navigate('/')
        }
    }
    return (
        <div>
            <Header />
            <Container style={{ marginTop: "100px" }}>
                <Row>
                    <Col md={7}>
                        <Row>
                            <Col md={12}>
                                <h3>THÔNG TIN NGƯỜI MUA</h3>
                            </Col>
                        </Row>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Họ</Form.Label>
                                        <Form.Control type="text" ref={firstName} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Tên</Form.Label>
                                        <Form.Control type="text" ref={lastName} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={email} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="number" ref={phoneNumber} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control type="text" ref={address} />
                            </Form.Group>
                        </Form>
                        <Row style={{ marginTop: "50px" }}>
                            <Col md={12}>
                                <h3>PHƯƠNG THỨC THANH TOÁN</h3>
                            </Col>
                        </Row>
                        <Form>
                            <div>
                                <input type="radio" id="pt1" name="purchasemethod" defaultChecked="true" value="Thanh toán khi nhận hàng" onClick={(e) => {
                                    setPurchaseMethods(e.target.value);
                                }} />
                                <label for="pt1" style={{ marginLeft: "20px" }}>Thanh toán khi nhận hàng</label>
                            </div>
                            <div>
                                <input type="radio" id="pt2" name="purchasemethod" value="Thanh toán bằng ZaloPay" onClick={(e) => {
                                    setPurchaseMethods(e.target.value);
                                }} />
                                <label for="pt2" style={{ marginLeft: "20px" }}>Thanh toán bằng ZaloPay</label>
                            </div>
                            <div>
                                <input type="radio" id="pt3" name="purchasemethod" value="Thanh toán bằng Momo" onClick={(e) => {
                                    setPurchaseMethods(e.target.value);
                                }} />
                                <label for="pt3" style={{ marginLeft: "20px" }}>Thanh toán bằng Momo</label>
                            </div>
                        </Form>
                    </Col>
                    <Col md={5} style={{ borderLeft: "1px solid black" }}>
                        <Row>
                            <Col md={12}>
                                <h3>Đơn hàng</h3>
                            </Col>
                        </Row>
                        <Row>
                            {
                                listProduct.map((l) => {
                                    return (
                                        <Col md={12}>
                                            <Row>
                                                <Col md={9}>
                                                    <h6 style={{ marginTop: "10px" }}>Tên: {l.Name}</h6>
                                                </Col>
                                                <Col md={3}>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => deleteProduct(l.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                        Xoá
                                                    </button>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <p style={{ marginBottom: "5px" }}>Giá: {new Intl.NumberFormat("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }).format(((l.Price*(1-l.SalePrice)) * getQuantity()))}</p>
                                                </Col>
                                                <Col md={6} style={{ textAlign: "right" }}>
                                                    <p>Số lượng:
                                                        <button
                                                            className="btn-minus"
                                                            onClick={() => minusQuantity(l.id)}
                                                            disabled={getQuantity(l.id) == 1}
                                                        >
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </button>
                                                        <input
                                                            type="text"
                                                            value={getQuantity(l.id)}
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
                                                            onClick={() => plusQuantity(l.id)}
                                                            disabled={getQuantity(l.id) == 4}
                                                        >
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </button></p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <Container>
                            <Row>
                                <Col md={12} style={{ borderBottom: "1px solid black" }}>
                                </Col>
                            </Row>
                        </Container>
                        <Row>
                            <Col style={{ marginTop: "20px" }}>
                                <h4>Tổng Cộng: {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format((totalPrice))}</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} style={{ textAlign: "center", marginTop: "30px" }}>
                                <button style={{ width: "98%", backgroundColor: "#cb1c22", height: "70px", border: "0", borderRadius: "5px" }}
                                    onClick={() => handlePurchase()}>
                                    <h4 style={{ color: "white" }}>Hoàn tất thanh toán</h4>
                                </button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Purchase;