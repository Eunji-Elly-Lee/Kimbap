import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import { authService } from 'fbase';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { IoPencilSharp } from 'react-icons/io5';
import 'routes/Auth.css';

function Auth() {
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
          navigate("/");
        });
    } catch (error) {
      if (error.code === "auth/missing-email") {
        setMessage("Please provide your email for confirmation!");
        setEmailConfirmation(true);
      } else if (error.code === "auth/invalid-action-code") {
        setMessage("The link is invalid! Please try to sign in again!");
        setEmailConfirmation(false);
      } else {
        console.log(error);
      }
    }
  }, [emailForSignIn, href, navigate]);
  useEffect(() => {
    if (authService.isSignInWithEmailLink(href)) {
      signIn();
    } else {
      navigate("/");
    }
  }, [href, signIn, navigate]);

  return (
    <div className="auth">
      <div className="auth-message mb-3 text-center">{message}</div>
      {emailConfirmation && (
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row} className="justify-content-center">
          <Form.Label column xs="1" className="auth-icon text-center">
            <IoPencilSharp />
          </Form.Label>
          <Col xs="10" className="p-0 me-2">
            <Form.Control type="email" placeholder="Email"
              className="border-0 border-bottom border-dark"
              value={email} onChange={(event) => setEmail(event.target.value)} />
          </Col>
        </Form.Group>
        <Button type="submit" disabled={submittingEmail}
          className="auth-button mt-5 d-block">
          {submittingEmail ? (
            <>
            <Spinner as="span" animation="border" size="sm"
              role="status" aria-hidden="true" />
            <span className="visually-hidden">Submitting...</span>
            </>
          ) : "Submit"}
        </Button>
      </Form>
      )}
    </div>
  );
}

export default Auth;
