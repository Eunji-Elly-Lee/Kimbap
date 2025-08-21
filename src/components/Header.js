import { useNavigate, Link } from 'react-router-dom';
import { authService } from 'fbase';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'components/Header.css';

function Header({ user, logOut }) {
  const navigate = useNavigate();
  const onClick = () => {
    authService.signOut();
    logOut();
    navigate("/");
  }

  return (
    <header>
      <Container>
        <Row xs="auto" className="mt-1 align-items-center">
          <Col className="py-4 px-3">
            <Link to="/" >
              <img className="header-logo" src="./assets/logo_black_cropped.png" alt="logo" />
            </Link>
          </Col>
          <Col>
            {user ? (
              <Row xs="auto" className="ps-2 align-items-center">
                <Col className="user-name">
                  Hi, {user.displayName ? user.displayName : user.email.split('@')[0]}
                </Col>
                <Col>
                  <Button variant="outline-dark" onClick={onClick} className="logout">
                    Log Out
                  </Button>
                </Col>
              </Row>
            ) : (
              <Link to="/signin" className="signin position-relative text-dark">
                Sign In
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func
};

export default Header;
