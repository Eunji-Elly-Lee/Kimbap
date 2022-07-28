import { useStateValue } from 'StateProvider';
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function OrderLocationForm({ location }) {
  const [state, dispatch] = useStateValue();
  const [checked, setChecked] = useState(false);
  const onChange = (event) => {
    if (event.target.checked) {
      dispatch({
        type: "SET_LOCATION",
        location: location.location
      });
    }
  };
  useEffect(() => {
    if (state.location === location.location) {
      setChecked(true);
    }
  }, [state, location]);

  return (
    <div>
      <Form.Group className="d-flex mt-3">
        <Form.Check type="radio" id={location.location} checked={checked}
          name="location" onChange={onChange} />
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
