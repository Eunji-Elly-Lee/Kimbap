import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { IoPersonSharp } from 'react-icons/io5';
import 'routes/SignIn.css';

function SignIn() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      return;
    }
    setEmail("");
  }

  return (
    <div className="signIn">
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="justify-content-center">
          <Form.Label column xs="1" className="signIn-icon text-center">
            <IoPersonSharp />
          </Form.Label>
          <Col xs="10" className="p-0 me-2">
            <Form.Control type="email" placeholder="Email"
              className="border-0 border-bottom border-dark"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </Col>
        </Form.Group>
        <Button type="submit" className="signIn-button mt-5 d-block">
          Sign In
        </Button>
      </Form>
    </div>
  );
}

export default SignIn;
