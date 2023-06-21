import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
const PopulationCourse = () => {
    const [product, setProduct] = useState([]);
    const [order, setOrder] = useState([]);
    const orderedcourse = [];
    const countOrderCourse = () => {
        product.map((p) => {
            let order_product = {
                ID: p.ID,
                quantity: 0
            }
            order.map((o) => {
                if (o.product_id === p.ID) {
                    order_product.quantity += 1;
                }
            })
            console.log(order_product)
            // orderedcourse.push(order_product);
        })
    }

    useEffect(() => {
        fetch("http://localhost:9999/Order").then(res => res.json())
            .then(result => {
                setOrder(result);
            })
    },[])
    useEffect(() => {
        fetch("http://localhost:9999/Product").then(res => res.json())
            .then(result => {
                countOrderCourse();
                // orderedcourse.sort((a, b) => {
                //     return b.quantity - a.quantity;
                // })
                // const topcourse = [orderedcourse[0], orderedcourse[1], orderedcourse[2], orderedcourse[3]];
                // setProduct(result.filter((r) => {
                //     const poProduct = topcourse.map((p) => {
                //         if (r.ID == p.ID) return p;
                //     })
                //     return poProduct[0];
                // }))
                // setProduct(result);
            })
    }, [])
    return (
        <Container>
            <Row>
                {
                    product.map((p) => {
                        const image = p.Images[0];
                        return (
                            <Col lg={4} md={6}>
                                <div className="card">
                                    <img className="card-img-top" src={image} alt="Card image" />
                                    <div className="card-body">
                                        <h4 className="card-title">John Doe</h4>
                                        <p className="card-text">Some example text.</p>
                                        <a href="#" class="btn btn-primary">See Profile</a>
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