import { useState } from 'react';
import { authService } from 'fbase';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { IoPersonSharp } from 'react-icons/io5';
import 'components/SignInForm.css';

function SignInForm() {
  const [email, setEmail] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [message, setMessage] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    if (email === "") {
      return;
    }
    try {
      setSendingEmail(true);
      const actionCodeSettings = {
        url: process.env.REACT_APP_SIGN_IN_URL,
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
        setSendingEmail(false);
        setMessage("The email address is not valid!");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="signIn-message mb-3 text-center">{message}</div>
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
        <Button type="submit" disabled={sendingEmail}
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
    </div>
  );
}

export default SignInForm;
