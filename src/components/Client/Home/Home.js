import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Slider from "./Slider";
import Footer from "../Footer";
import PopulationCourse from "./PopulationProduct";
import Navigation from "../Navigation";


const Home = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9999/Category").then(res => res.json())
            .then(result => {
                setCategory(result);
            })
    }, [])
    return (
        <div style={{ backgroundColor: "#f53b22", paddingBottom:"100px" }}>
            <Header />
            <Navigation/>
            <Container style={{padding: 0}}>
                    <Col md={12} style={{padding: 0}}>
                        <img src="Images/banner2.png" style={{width:"100%"}} alt="banner"/>
                    </Col>
            </Container>
            <Slider/>
            <Container style={{ backgroundColor: "white", borderRadius: "5px", paddingTop: "10px", paddingBottom: "10px", marginTop: "50px" }}>
                <Row>
                    {
                        category.map((c) => {
                            return (
                                <Col xs={2}>
                                    <Link className="category_link">
                                        <div style={{ textAlign: "center" }}>
                                            <img src={c.Logo} style={{ width: "90%", borderRadius: "50%" }} alt="category"/>
                                            <h6 style={{ marginTop: "10px" }}>{c.Category_Name}</h6>
                                        </div>
                                    </Link>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
            <Container style={{padding: 0, marginTop: "50px"}}>
                    <Col md={12} style={{padding: 0}}>
                        <img src="Images/banner1.png" style={{width:"100%"}} alt="banner"/>
                    </Col>
            </Container>
            <PopulationCourse/>
            <Footer/>
        </div>
    )
}
export default Home;