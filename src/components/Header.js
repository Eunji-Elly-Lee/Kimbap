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
    <div>
      <Container>
        <Row xs="auto" className="mt-1 align-items-center">
          <Col className={user ? "login-logo p-0" : "logout-logo p-0"}>
            <Link to="/">
              <img className="header-logo" src="./assets/logo_black.gif" alt="logo" />
            </Link>
          </Col>
          {user ? (
            <>
            <Col className="header-name p-0">
              Hi, {user.displayName ? user.displayName : user.email.split('@')[0]}
            </Col>
            <Col>
              <Button variant="outline-dark" onClick={onClick} className="logout rounded-0">
                Log Out
              </Button>
            </Col>
            </>
          ) : (
            <Col className="header-signin p-0">
              <Link to="/signin" className="signin position-relative text-dark">
                Sign In
              </Link>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func
};

export default Header;
