import { Col, Container, Row } from 'react-bootstrap'
import SideBar from './SideBar'
import './assets/Admin.css'
const DashBoard = () => {
    return (
        <div>
            <Container fluid>
                <Row>
                    <SideBar />
                    <Col md={10} style={{ padding: "0" }}>
                        <div className="topbar">
                            <h1 className="admin-title">Dashboard</h1>
                        </div>
                        <div className='admin-content'>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default DashBoard