import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
const PopulationCourse = () => {
    const [product, setProduct] = useState([]);
    const [order, setOrder] = useState([]);
    const [topcourse, setTopCourse] = useState([]);
    var orderedcourse = [];
    const countOrderCourse = (products) => {
        products.map((p) => {
            let order_product = {
                ID: p.ID,
                quantity: 0
            }
            order.map((o) => {
                if (o.product_id === p.ID) {
                    order_product.quantity += 1;
                }
            })
            // console.log(order_product)
            orderedcourse.push(order_product);
        })
    }

    useEffect(() => {
        fetch("http://localhost:9999/Order").then(res => res.json())
            .then(result => {
                setOrder(result);
            })
    }, [])
    useEffect(() => {
        fetch("http://localhost:9999/Product").then(res => res.json())
            .then(result => {
                setProduct(result);
                countOrderCourse(result);
                orderedcourse.sort((a, b) => {
                    return b.quantity - a.quantity;
                })
                setTopCourse(result.filter((p) => {
                    if (p.ID === orderedcourse[0].ID || p.ID === orderedcourse[1].ID || p.ID === orderedcourse[2].ID || p.ID === orderedcourse[3].ID) {
                        return p;
                    }
                }))
            })
    }, [])

    // useEffect(() => {
    //     const getTopProduct = () => countOrderCourse();
    //     getTopProduct();
    //     orderedcourse.sort((a, b) => {
    //         return b.quantity - a.quantity;
    //     })
    //     setTopCourse(product.filter((p) => {
    //         if (p.ID === orderedcourse[0].ID || p.ID === orderedcourse[1].ID || p.ID === orderedcourse[2].ID || p.ID === orderedcourse[3].ID) {
    //             return p;
    //         }
    //     }))
    // }, [])
    return (
        <Container style={{ marginTop: "50px", backgroundColor: "white", paddingTop: "30px", paddingBottom: "30px" }}>
            <Row>
                {
                    topcourse.map((p) => {

                        return (
                            <Col lg={3} md={6}>
                                <div className="product">
                                    <div className="product-img">
                                        <img src={p.Images[0]} alt="Card image" />
                                    </div>
                                    <div>
                                        <h4>{p.Name}</h4>
                                        <div className="price">
                                            <div className="sale-price">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((1 - p.SalePrice) * p.Price)}
                                            </div>
                                            <div className="real-price">
                                                <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.Price)}</p>
                                            </div>
                                        </div>
                                        <Link to={`/dien-thoai/product-detail/${p.ID}`} className="btn btn-dark" style={{ marginTop: "20px" }}>Mua Ngay</Link>
                                    </div>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}
export default PopulationCourse;