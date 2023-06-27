import { Col, Container, Row } from "react-bootstrap"
import Header from "./Header"
import Footer from "./Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const Search = () => {
    const searchname = useParams();
    const [listProduct, setListProduct] = useState([]);
    useEffect(() => {
        fetch("http://localhost:9999/Product")
            .then((response) => response.json())
            .then((data) => {
                setListProduct(data.filter((d) => {
                    return d.Name.includes(searchname)
                })
                )
            });
    }, [])
    return (
        <div>
            <Header />
            <Container style={{marginTop:"70px"}}>
                <Row>
                    <Col>
                        <p style={{ fontSize: "30px" }}>Tìm thấy {listProduct.length} kết quả với từ khoá ""</p>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}
export default Search