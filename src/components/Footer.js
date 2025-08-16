import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'components/Footer.css';

function Footer() {
  return (
    <footer className="pt-4 bg-black">
      <Container className="text-center text-white">
        <Row>
          <Col>
            <Link to="/">
              <img className="footer-logo" src="./assets/logo_white.gif" alt="logo" />
            </Link>
          </Col>
        </Row>
        <Row xs="auto" className="mx-2 justify-content-center">
          <Col>
            Mail:&nbsp;
            <a className="text-white" href="mailto:ellylee2020@gmail.com">
              ellylee2020@gmail.com
            </a>
          </Col>
          <Col>
            Phone: 1-825-365-9828
          </Col>
        </Row>
        <Row className="py-4">
          <Col>
            &copy; 2022 Kimbap
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
