import { Col, Container, Row, Button } from 'react-bootstrap'
import SideBar from './SideBar'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import { set } from 'react-hook-form';
const CreateProduct = () => {
    const navigate = useNavigate();
    const { ProductID } = useParams();
    const [Product, setProduct] = useState();
    const [Category, setCategory] = useState([]);
    const [img, setImg] = useState("");
    const name = useRef();
    const category = useRef();
    const price = useRef();
    const saleprice = useRef();
    const beginImage = useRef();
    const image = useRef();
    const screen = useRef();
    const rearCamera = useRef();
    const ram = useRef();
    const internalMemory = useRef();
    const cpu = useRef();
    const batteryCapacity = useRef();
    const operatingSystem = useRef();
    const origin = useRef();
    const releaseTime = useRef();
    useEffect(() => {
        fetch("http://localhost:9999/Product")
            .then((res) => res.json())
            .then((result) => {
                result.map((r) => {
                    if (r.id == ProductID) {
                        setProduct(r);
                    }
                })
            });
    }, [])
    useEffect(() => {
        fetch("http://localhost:9999/Category")
            .then((res) => res.json())
            .then((result) => {
                setCategory(result);
            });
    }, [])


    const handleCreate = () => {
        if (name.current.value == "" || category.current.value == "" || price.current.value == "" || saleprice.current.value == ""
            || image.current.value == "" || screen.current.value == "" || ram.current.value == "" || internalMemory.current.value == ""
            || cpu.current.value == "" || batteryCapacity.current.value == "" || operatingSystem.current.value == "" || origin.current.value == ""
            || releaseTime.current.value == "") {
            alert("Nhập đầy đủ thông tin")
        }
        const newproduct = {
            Name: name.current.value,
            Category_ID: category.current.value,
            Price: price.current.value,
            SalePrice: saleprice.current.value,
            Images: image.current.value,
            Specifications: {
                Screen: screen.current.value,
                RAM: ram.current.value,
                Internal_memory: internalMemory.current.value,
                CPU: cpu.current.value,
                Battery_capacity: batteryCapacity.current.value,
                Operating_system: operatingSystem.current.value,
                Origin: origin.current.value,
                Release_time: releaseTime.current.value
            }
        }

        fetch("http://localhost:9999/Product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(newproduct),
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error(response.message || "Bad response from server");
                }
                return response.json();
            })
            .then((responseData) => {
                // Handle the response if needed
                navigate("/productmanagement");
            })
            .catch((error) => {
                // Handle the error if needed
                console.error(error);
            });

    console.log(newproduct)
}
const updateImage = (e) => {
    const link = e.target.value;
    const links = link.split("\\");
    console.log(links)
    setImg(`Images/category/${links.pop()}`)
    // console.log(links.pop())
}
return (
    <div>
        <Container fluid>
            <Row>
                <SideBar />
                <Col md={10} style={{ padding: "0" }}>
                    <div className="topbar">
                        <h1 className="admin-title">Create Product</h1>
                    </div>
                    <div className='admin-content'>
                        <Row>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="category">Category:</label>
                                    <select className="form-control" id="category" ref={category}>
                                        {
                                            Category.map((c) => {
                                                return (
                                                    <option value={c.id}>{c.Category_Name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" className="form-control" id="name" ref={name} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="price">Price:</label>
                                    <input type="number" className="form-control" id="price" ref={price} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="saleprice">SalePrice:</label>
                                    <input type="number" className="form-control" id="saleprice" ref={saleprice} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <img src={img} style={{ width: "100%" }} />
                                <div className="form-group">
                                    <label htmlFor="image">Image:</label>
                                    <input type="hidden" ref={beginImage} />
                                    <input type="file" className="form-control" id="image" ref={image} onChange={(e) => updateImage(e)} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <Container fluid>
                                    <Row>
                                        <Col style={{ padding: "0" }} md={12}>
                                            <div className="form-group">
                                                <Row>
                                                    <Col md={3} style={{ lineHeight: "30px" }}>
                                                        <label htmlFor="screen">Screen:</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <input type="text" className="form-control" id="screen" ref={screen} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col style={{ padding: "0" }} md={12}>
                                            <div className="form-group">
                                                <Row>
                                                    <Col md={3} style={{ lineHeight: "30px" }}>
                                                        <label htmlFor="Rear_camera">Rear camera:</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <input type="text" className="form-control" id="Rear_camera" ref={rearCamera} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col style={{ padding: "0" }} md={12}>
                                            <div className="form-group">
                                                <Row>
                                                    <Col md={3} style={{ lineHeight: "30px" }}>
                                                        <label htmlFor="RAM">RAM:</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <input type="text" className="form-control" id="RAM" ref={ram} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col style={{ padding: "0" }} md={12}>
                                            <div className="form-group">
                                                <Row>
                                                    <Col md={3} style={{ lineHeight: "30px" }}>
                                                        <label htmlFor="Internal_memory">Internal memory:</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <input type="text" className="form-control" id="Internal_memory" ref={internalMemory} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col style={{ padding: "0" }} md={12}>
                                            <div className="form-group">
                                                <Row>
                                                    <Col md={3} style={{ lineHeight: "30px" }}>
                                                        <label htmlFor="CPU">CPU:</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <input type="text" className="form-control" id="CPU" ref={cpu} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col style={{ padding: "0" }} md={12}>
                                            <div className="form-group">
                                                <Row>
                                                    <Col md={3} style={{ lineHeight: "30px" }}>
                                                        <label htmlFor="Battery_capacity">Battery capacity:</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <input type="text" className="form-control" id="Battery_capacity" ref={batteryCapacity} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col style={{ padding: "0" }} md={12}>
                                            <div className="form-group">
                                                <Row>
                                                    <Col md={3} style={{ lineHeight: "30px" }}>
                                                        <label htmlFor="Operating_system">Operating system:</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <input type="text" className="form-control" id="Operating_system" ref={operatingSystem} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col style={{ padding: "0" }} md={12}>
                                            <div className="form-group">
                                                <Row>
                                                    <Col md={3} style={{ lineHeight: "30px" }}>
                                                        <label htmlFor="Origin">Origin:</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <input type="text" className="form-control" id="Origin" ref={origin} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col style={{ padding: "0" }} md={12}>
                                            <div className="form-group">
                                                <Row>
                                                    <Col md={3} style={{ lineHeight: "30px" }}>
                                                        <label htmlFor="Release_time">Release time:</label>
                                                    </Col>
                                                    <Col md={9}>
                                                        <input type="text" className="form-control" id="Release_time" ref={releaseTime} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                        <Button onClick={() => handleCreate()}>Save</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
)
    }
export default CreateProduct;