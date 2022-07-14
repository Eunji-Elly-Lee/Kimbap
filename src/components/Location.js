import { Form } from 'react-bootstrap';
import 'components/Location.css';

function Location() {
  return (
    <div>
      <h4>Pick Up Location</h4>
      <Form.Group className="d-flex mt-3">
        <Form.Check type="radio" id="pickUp-location01" />
        <Form.Label htmlFor="pickUp-location01" className="m-0 ms-2">
          Mon. 8:00 A.M. AAA Station
        </Form.Label>
      </Form.Group>
      <Form.Group className="d-flex mt-3">
        <Form.Check type="radio" id="pickUp-location02" />
        <Form.Label htmlFor="pickUp-location02" className="m-0 ms-2">
          Mon. 8:00 A.M. AAA Station
        </Form.Label>
      </Form.Group>
      <Form.Group className="d-flex mt-3">
        <Form.Check type="radio" id="pickUp-location03" />
        <Form.Label htmlFor="pickUp-location03" className="m-0 ms-2">
          Mon. 8:00 A.M. AAA Station
        </Form.Label>
      </Form.Group>
    </div>
  );
}

export default Location;
