import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "routes/Home.css";

function Home({ user }) {
  return (
    <div className={`home ${user ? "home-logged-in" : ""} d-flex align-items-center`}>
      <Container>
        <Row
          className={`
            main-menu-wrapper ${!user ? "wrapper-logged-out" : ""} p-5 justify-content-evenly
          `}
        >
          <Col md="6" className="main-menu position-relative bg-black rounded">
            <Link
              to="/menu"
              className="w-100 h-100 d-flex align-items-center text-center"
            >
              <span className="w-100 text-white fs-2">Menu</span>
            </Link>
          </Col>
          {user ? (
            <Col md="6" className="main-menu position-relative bg-black rounded">
              <Link
                to="/orders"
                className="w-100 h-100 d-flex align-items-center text-center"
              >
                <span className="w-100 text-white fs-2">Orders</span>
              </Link>
            </Col>
          ) : (
            <Col md="6" className="intro-text my-auto pt-3 pb-2 px-5 shadow rounded">
              <h1>Pick Up Your Yummy Kimbap!</h1>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
