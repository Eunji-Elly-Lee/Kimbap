import { useNavigate, Link } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import { authService } from 'fbase';
import { Form, Row, Col, Button, Spinner, Container } from 'react-bootstrap';
import { IoPencilSharp } from 'react-icons/io5';
import 'routes/Home.css';

function Home() {
  const href = window.location.href;
  const navigate = useNavigate();
  const [emailForSignIn, setEmailForSignIn] =
    useState(window.localStorage.getItem("emailForSignIn"));
  const [submittingEmail, setSubmittingEmail] = useState(false);
  const [message, setMessage] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState(false);
  const [email, setEmail] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    if (email === "") {
      return;
    }
    setEmailForSignIn(email);
    setSubmittingEmail(true);
  };
  const signIn = useCallback(async () => {
    try {
      await authService.signInWithEmailLink(emailForSignIn, href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          setMessage("");
          setEmailConfirmation(false);
          navigate("/");
        });
    } catch (error) {
      if (error.code === "auth/missing-email") {
        setMessage("Please provide your email for confirmation!");
        setEmailConfirmation(true);
      } else if (error.code === "auth/invalid-action-code") {
        setMessage("The link is invalid! Please try to sign in again!");
        setEmailConfirmation(false);
      }
    }
  }, [href, navigate, emailForSignIn]);
  useEffect(() => {
    if (authService.isSignInWithEmailLink(href)) {
      signIn();
    }
  }, [href, emailForSignIn, signIn]);

  return (
    <div className="home">
      <div className="mt-5 mb-sm-3 text-center">{message}</div>
      {emailConfirmation ?
        <Form onSubmit={onSubmit} className="confirm-form mx-auto">
          <Form.Group as={Row} className="justify-content-center">
            <Form.Label column xs="1" className="confirm-icon text-center">
              <IoPencilSharp />
            </Form.Label>
            <Col xs="10" className="p-0 me-2">
              <Form.Control type="email" placeholder="Email"
                className="border-0 border-bottom border-dark"
                value={email} onChange={(event) => setEmail(event.target.value)} />
            </Col>
          </Form.Group>
          <Button type="submit" variant="dark" disabled={submittingEmail}
            className="confirm-button mt-5 d-block">
            {submittingEmail ?
              <>
              <Spinner as="span" animation="border" size="sm"
                role="status" aria-hidden="true" />
              <span className="visually-hidden">Submitting...</span>
              </> :
              "Submit"
            }
          </Button>
        </Form> :
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
      }
    </div>
  );
}

export default Home;
