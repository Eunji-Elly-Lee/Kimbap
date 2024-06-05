import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "routes/Home.css";

function Home({ user }) {
  return (
    <div className="home d-flex align-items-center">
      <Container>
        <Row className="justify-content-evenly">
          <Col md className="main-menu position-relative bg-black">
            <Link
              to="/menu"
              className="w-100 h-100 d-flex align-items-center text-center"
            >
              <span className="w-100 text-white fs-2">Menu</span>
            </Link>
          </Col>
          {user && (
            <Col md className="main-menu position-relative bg-black">
              <Link
                to="/orders"
                className="w-100 h-100 d-flex align-items-center text-center"
              >
                <span className="w-100 text-white fs-2">Orders</span>
              </Link>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
