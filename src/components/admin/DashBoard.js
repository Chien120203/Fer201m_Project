import {Col, Container, Row} from 'react-bootstrap' 
import SideBar from './SideBar'
import './assets/Admin.css'
import TopBar from './TopBar'
const DashBoard = () =>{
    return(
        <div>
            <Container fluid>
                <Row>
                    <SideBar/>
                    <Col md={10} style={{padding:"0"}}>
                        <TopBar/>
                        <div className='admin-content'>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default DashBoard