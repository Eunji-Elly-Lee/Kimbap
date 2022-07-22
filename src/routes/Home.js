import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'routes/Home.css';

function Home() {
  return (
    <div className="home">
      <Container>
        <Row className="justify-content-evenly">
          <Col xs="5" sm="4" md="3"
            className="main-menu m-5 m-sm-2 mt-sm-5 position-relative">
            <Link to="/menu"
              className="w-100 h-100 d-flex align-items-center text-center">
              <span className="w-100 text-white fs-2">Menu</span>
            </Link>
          </Col>
          <Col xs="5" sm="4" md="3"
            className="main-menu m-5 m-sm-2 mt-sm-5 position-relative">
            <Link to="/orders"
              className="w-100 h-100 d-flex align-items-center text-center">
              <span className="w-100 text-white fs-2">Orders</span>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
