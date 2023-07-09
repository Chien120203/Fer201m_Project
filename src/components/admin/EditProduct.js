import { Col, Container, Row } from 'react-bootstrap'
import SideBar from './SideBar'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
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
    useEffect(() => {
        fetch("http://localhost:9999/Product")
            .then((res) => res.json())
            .then((result) => {
                result.map((r) => {
                    if (r.ID == ProductID) setProduct(r);
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
            {
                console.log(Product)
            }
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
                                    <div class="form-group">
                                        <label for="ID">ID:</label>
                                        <input type="text" class="form-control" id="ID" value={Product.ID} readOnly />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div class="form-group">
                                        <label for="category">Category:</label>
                                        <select class="form-control" id="category">
                                            {
                                                Category.map((c) => {
                                                    return (
                                                        <option selected={c.ID == Product.Category_ID} value={c.ID}>{c.Category_Name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div class="form-group">
                                        <label for="name">Name:</label>
                                        <input type="text" class="form-control" id="name" defaultValue={Product.Name} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div class="form-group">
                                        <label for="price">Price:</label>
                                        <input type="number" class="form-control" id="price" defaultValue={Product.Price} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div class="form-group">
                                        <label for="saleprice">SalePrice:</label>
                                        <input type="number" class="form-control" id="saleprice" defaultValue={Product.SalePrice} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <img src={Product.Images} style={{ width: "100%" }} />
                                    <div class="form-group">
                                        <label for="image">Image:</label>
                                        <input type="file" class="form-control" id="image" />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <Container fluid>
                                        <Row>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div class="form-group">
                                                    <Row>
                                                        <Col md={3} style={{lineHeight:"30px"}}>
                                                            <label for="screen">Screen:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" class="form-control" id="screen" defaultValue={Product.Specifications.Screen} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div class="form-group">
                                                    <Row>
                                                        <Col md={3} style={{lineHeight:"30px"}}>
                                                            <label for="Rear_camera">Rear camera:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" class="form-control" id="Rear_camera" defaultValue={Product.Specifications.Rear_camera} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div class="form-group">
                                                    <Row>
                                                        <Col md={3} style={{lineHeight:"30px"}}>
                                                            <label for="RAM">RAM:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" class="form-control" id="RAM" defaultValue={Product.Specifications.RAM} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div class="form-group">
                                                    <Row>
                                                        <Col md={3} style={{lineHeight:"30px"}}>
                                                            <label for="Internal_memory">Internal memory:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" class="form-control" id="Internal_memory" defaultValue={Product.Specifications.Internal_memory} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div class="form-group">
                                                    <Row>
                                                        <Col md={3} style={{lineHeight:"30px"}}>
                                                            <label for="CPU">CPU:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" class="form-control" id="CPU" defaultValue={Product.Specifications.CPU} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div class="form-group">
                                                    <Row>
                                                        <Col md={3} style={{lineHeight:"30px"}}>
                                                            <label for="Battery_capacity">Battery capacity:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" class="form-control" id="Battery_capacity" defaultValue={Product.Specifications.Battery_capacity} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div class="form-group">
                                                    <Row>
                                                        <Col md={3} style={{lineHeight:"30px"}}>
                                                            <label for="Operating_system">Operating system:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" class="form-control" id="Operating_system" defaultValue={Product.Specifications.Operating_system} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div class="form-group">
                                                    <Row>
                                                        <Col md={3} style={{lineHeight:"30px"}}>
                                                            <label for="Origin">Origin:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" class="form-control" id="Origin" defaultValue={Product.Specifications.Origin} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div class="form-group">
                                                    <Row>
                                                        <Col md={3} style={{lineHeight:"30px"}}>
                                                            <label for="Release_time">Release time:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" class="form-control" id="Release_time" defaultValue={Product.Specifications.Release_time} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default EditProduct;