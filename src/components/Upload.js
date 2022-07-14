import { Form, Row, Col, Button } from 'react-bootstrap';
import 'components/Upload.css';

function Upload() {
  return (
    <div className="upload">
      <Form>
        <h4>Upload Gimbap</h4>
        <Form.Group as={Row} className="mt-3 mb-1">
          <Form.Label column sm="2">Image:</Form.Label>
          <Col>
            <Form.Control type="file" accept="image/*"
              className="border-dark rounded-0" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-1">
          <Form.Label column sm="2">Name:</Form.Label>
          <Col>
            <Form.Control type="text"
              className="border-dark rounded-0"/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-1">
          <Form.Label column sm="2">Ingredients:</Form.Label>
          <Col>
            <Form.Control type="text"
              className="border-dark rounded-0"/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-1">
          <Form.Label column sm="2">Price:</Form.Label>
          <Col>
            <Form.Control type="number"
              className="border-dark rounded-0"/>
          </Col>
        </Form.Group>
        <Button variant="dark" type="submit"
          className="w-100 mt-3 rounded-0">
          Upload
        </Button>
      </Form>
      <Form className="mt-4">
        <h4>Upload Location</h4>
        <Form.Group className="d-flex mt-3">
          <Form.Check type="checkbox" id="location-active" />
          <Form.Label htmlFor="location-active" className="m-0 ms-2">
            Active
          </Form.Label>
        </Form.Group>
        <Form.Group as={Row} className="mt-1">
          <Form.Label column sm="2">Location:</Form.Label>
          <Col>
            <Form.Control type="text"
              className="border-dark rounded-0"/>
          </Col>
        </Form.Group>
        <Button variant="dark" type="submit"
          className="w-100 mt-3 rounded-0">
          Upload
        </Button>
      </Form>
    </div>
  );
}

export default Upload;
