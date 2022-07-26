import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function OrderLocationForm({ location }) {
  return (
    <div>
      <Form.Group className="d-flex mt-3">
        <Form.Check type="radio" id={location.location} name="location" />
        <Form.Label htmlFor={location.location} className="ms-2">
          {location.location}
        </Form.Label>
      </Form.Group>
    </div>
  );
}

OrderLocationForm.propTypes = {
  location: PropTypes.object
};

export default OrderLocationForm;
