import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div>
      <Container>
        <Row xs="auto" className="align-items-center">
          <Col className="menu">
            <Link to="/">
              <img className="header-logo" src="./assets/logo_black.gif" alt="logo" />
            </Link>
          </Col>
          <Col className="menu">
            <Link className="signin" to="/signin">Sign In</Link>
          </Col>
          <Col className="menu">
            <Link to="/signup">
              <Button variant="outline-dark" className="signup">Sign Up</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;
