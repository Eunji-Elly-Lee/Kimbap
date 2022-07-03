import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div>
      <Container>
        <Row xs="auto" className="mt-1 align-items-center">
          <Col className="header-menu p-0">
            <Link to="/">
              <img className="header-logo" src="./assets/logo_black.gif" alt="logo" />
            </Link>
          </Col>
          <Col className="header-menu p-0">
            <Link to="/signin" className="signin position-relative text-dark">
              Sign In
            </Link>
          </Col>
          <Col className="header-menu">
            <Link to="/signup">
              <Button variant="outline-dark" className="signup rounded-0">
                Sign Up
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;
