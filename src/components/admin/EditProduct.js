import { Col, Container, Row, Button } from 'react-bootstrap'
import SideBar from './SideBar'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
const EditProduct = () => {
    const defaultProduct = {
        ID: 1,
        Name: "Samsung Galaxy Z Flip4 5G 128GB",
        Category_ID: 1,
        Price: 15990000,
        SalePrice: 0.05,
        Images: "https://images.fpt.shop/unsafe/fit-in/800x800/filters:quality(90):fill(white):upscale()/fptshop.com.vn/Uploads/Originals/2022/8/10/637957658354316100_samsung-galaxy-z-flip4-tim-1.jpg",
        Specifications: {
            Screen: "Chính: 6.7 inch, Phụ: 1.9 inch, Dynamic AMOLED 2X, FHD+, 1080 x 2636 Pixels",
            Rear_camera: "12.0 MP + 12.0 MP",
            Camera_Selfie: "10.0 MP",
            RAM: "8 GB",
            Internal_memory: "128 GB",
            CPU: "Snapdragon 8+ Gen 1",
            Battery_capacity: "3700 mAh",
            Operating_system: "Android 12",
            Origin: "Việt Nam",
            Release_time: "08/2022"
        }
    }
    const { ProductID } = useParams();
    const [Product, setProduct] = useState(defaultProduct);
    const [Category, setCategory] = useState([]);
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

    return (
        <div>
            <Container fluid>
                <Row>
                    <SideBar />
                    <Col md={10} style={{ padding: "0" }}>
                        <div className="topbar">
                            <h1 className="admin-title">Edit Product</h1>
                        </div>
                        <div className='admin-content'>
                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="ID">ID:</label>
                                        <input type="text" className="form-control" id="ID" value={Product.id} readOnly />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="category">Category:</label>
                                        <select className="form-control" id="category" ref={category}>
                                            {
                                                Category.map((c) => {
                                                    return (
                                                        <option selected={c.id == Product.Category_ID} value={c.id}>{c.Category_Name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" id="name" defaultValue={Product.Name} ref={name}/>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="price">Price:</label>
                                        <input type="number" className="form-control" id="price" defaultValue={Product.Price} ref={price}/>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="saleprice">SalePrice:</label>
                                        <input type="number" className="form-control" id="saleprice" defaultValue={Product.SalePrice} ref={saleprice}/>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <img src={Product.Images} style={{ width: "100%" }} />
                                    <div className="form-group">
                                        <label htmlFor="image">Image:</label>
                                        <input type="hidden" defaultValue={Product.Images} ref={beginImage}/>
                                        <input type="file" className="form-control" id="image" ref={image}/>
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
                                                            <input type="text" className="form-control" id="screen" defaultValue={Product.Specifications.Screen} ref={screen}/>
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
                                                            <input type="text" className="form-control" id="Rear_camera" defaultValue={Product.Specifications.Rear_camera} ref={rearCamera}/>
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
                                                            <input type="text" className="form-control" id="RAM" defaultValue={Product.Specifications.RAM} ref={ram} />
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
                                                            <input type="text" className="form-control" id="Internal_memory" defaultValue={Product.Specifications.Internal_memory} ref={internalMemory}/>
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
                                                            <input type="text" className="form-control" id="CPU" defaultValue={Product.Specifications.CPU} ref={cpu}/>
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
                                                            <input type="text" className="form-control" id="Battery_capacity" defaultValue={Product.Specifications.Battery_capacity} ref={batteryCapacity}/>
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
                                                            <input type="text" className="form-control" id="Operating_system" defaultValue={Product.Specifications.Operating_system} ref={operatingSystem}/>
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
                                                            <input type="text" className="form-control" id="Origin" defaultValue={Product.Specifications.Origin} ref={origin}/>
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
                                                            <input type="text" className="form-control" id="Release_time" defaultValue={Product.Specifications.Release_time} ref={releaseTime}/>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                            <Button onClick={()=>console.log(image.current.value)}>Save</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default EditProduct;