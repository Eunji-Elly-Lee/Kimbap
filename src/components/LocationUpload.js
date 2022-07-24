import { useState } from 'react';
import { dbService } from 'fbase';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';

function LocationUpload() {
  const [location, setLocation] = useState("");
  const [uploading, setUploading] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (location === "") {
      return;
    }
    setUploading(true);
    await dbService.collection("locations").add({
      location: location
    }).then(() => {
      setLocation("");
      setUploading(false);
    });    
  };

  return (
    <div>
      <Form className="mt-4" onSubmit={onSubmit}>
        <h4>Upload Location</h4>
        <Form.Group as={Row} className="mt-3">
          <Form.Label column sm="2">Location:</Form.Label>
          <Col>
            <Form.Control type="text" value={location}
              onChange={(event) => setLocation(event.target.value)} />
          </Col>
        </Form.Group>
        <Button type="submit" variant="dark" disabled={uploading}
          className="w-100 mt-3">
          {uploading ? (
            <>
            <Spinner as="span" animation="border" size="sm"
              role="status" aria-hidden="true" />
            <span className="visually-hidden">Uploading...</span>
            </>
          ) : "Upload"}
        </Button>
      </Form>
    </div>
  );
}

export default LocationUpload;
