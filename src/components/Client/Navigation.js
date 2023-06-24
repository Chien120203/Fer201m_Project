import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        fetch("http://localhost:9999/Category").then(res => res.json())
            .then(result => {
                setCategory(result);
            })
    }, [])
    return (
        <Container fluid style={{ marginTop: "49px" }} className="nav">
            <Row style={{width:"100%"}}>
                <Col md={12} className="nav-content">
                    <NavLink to="/dien-thoai/all">Sản phẩm</NavLink>
                    {
                        category.map((c) => {
                            return (
                                <NavLink to={`/dien-thoai/${c.ID}`}>{c.Category_Name}</NavLink>
                            )
                        })
                    }
            </Col>
        </Row>
        </Container >
    )
}
export default Navigation;