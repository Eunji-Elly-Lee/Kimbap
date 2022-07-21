import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService, firebaseInstance } from 'fbase';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { IoPersonSharp } from 'react-icons/io5';
import 'routes/SignIn.css';

function SignIn({ user }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    if (email === "") {
      return;
    }
    try {
      setSendingEmail(true);
      const actionCodeSettings = {
        url: "http://localhost:3000",
        handleCodeInApp: true
      };
      await authService.sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem("emailForSignIn", email);
          setEmail("");
          setSendingEmail(false);
          setMessage("An email has been sent! Please check your email!");
        });
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setMessage("The email address is not valid!");
      }
    }
  };
  const onClick = async () => {
    try {
      const provider = new firebaseInstance.auth.GoogleAuthProvider();
      await authService.signInWithPopup(provider)
        .then(() => {
          navigate("/");
        });
    } catch (error) {
      if (error.code === "auth/popup-blocked") {
        setErrorMessage("The popup has been blocked by the browser!");
      }
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="signIn">
      <div className="email-message mb-3 text-center">{message}</div>
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row} className="justify-content-center">
          <Form.Label column xs="1" className="signIn-icon text-center">
            <IoPersonSharp />
          </Form.Label>
          <Col xs="10" className="p-0 me-2">
            <Form.Control type="email" placeholder="Email"
              className="border-0 border-bottom border-dark"
              value={email} onChange={(event) => setEmail(event.target.value)} />
          </Col>
        </Form.Group>
        <Button type="submit" variant="dark" disabled={sendingEmail}
          className="signIn-button mt-5 d-block">
          {sendingEmail ? (
            <>
            <Spinner as="span" animation="border" size="sm"
              role="status" aria-hidden="true" />
            <span className="visually-hidden">Sending...</span>
            </>
          ) : "Sign In"}
        </Button>
      </Form>
      <Button type="submit" onClick={onClick}
        className="signIn-button mt-5 d-block">
        Continue with Google
      </Button>
      <div className="popup-error text-center">{errorMessage}</div>
    </div>
  );
}

export default SignIn;
