import { useState } from 'react';
import { dbService } from 'fbase';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';

function UploadLocation() {
  const [location, setLocation] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    if (location === "") {
      return;
    }
    const regExp = /^\d{4}\.\d{2}\.\d{2}\s[\w.:-\s]+$/;
    if(regExp.test(location)) {
      setUploading(true);
      await dbService.collection("locations").add({
        location: location
      }).then(() => {
        setLocation("");
        setUploading(false);
        setMessage("");
      });  
    } else {
      setMessage("Please enter according to pattern!");
    }
  };

  return (
    <div>
      <Form className="mt-4" onSubmit={onSubmit}>
        <h4>Upload Location</h4>
        <div className="mb-3 text-center">{message}</div>
        <Form.Group as={Row} className="mt-3">
          <Form.Label column sm="2">Location:</Form.Label>
          <Col>
            <Form.Control type="text" value={location} placeholder="2022.01.01 Day Time Location"
              onChange={(event) => setLocation(event.target.value)} />
          </Col>
        </Form.Group>
        <Button type="submit" disabled={uploading} className="w-100 mt-3">
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

export default UploadLocation;
