import { useState } from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { IoPersonAddSharp } from "react-icons/io5";
import 'routes/SignUp.css';

function SignUp() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      return;
    }
    setEmail("");
  }

  return (
    <div className="signUp">
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="justify-content-center">
          <Form.Label column xs="1" className="signUp-icon text-center">
            <IoPersonAddSharp />
          </Form.Label>
          <Col xs="10" className="p-0 me-2">
            <Form.Control type="email" placeholder="Email"
              className="border-0 border-bottom border-dark rounded-0"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </Col>
        </Form.Group>
        <Button variant="dark" type="submit"
          className="signUp-button mt-5 d-block rounded-0">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;
