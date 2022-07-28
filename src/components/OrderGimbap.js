import { useNavigate } from 'react-router-dom';
import { useStateValue } from 'StateProvider';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import OrderGimbapForm from './OrderGimbapForm';
import OrderLocationForm from './OrderLocationForm';

function OrderGimbap({ gimbaps, locations }) {
  const navigate = useNavigate();
  const [state, ] = useStateValue();
  const [message, setMessage] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    if (state.basket.length === 0) {
      setMessage("Please select at least one gimbap!");
    } else if (state.location === "") {
      setMessage("Please select the pick up location!");
    } else {
      navigate("/order");
    }
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h4>Gimbaps</h4>
        {gimbaps.map(gimbap => (
          <OrderGimbapForm key={gimbap.id} gimbap={gimbap} />
        ))}
        <h4>Pick Up Location</h4>
        {locations.map(location => (
          <OrderLocationForm key={location.id} location={location} />
        ))}
        <div className="mt-3 text-center">{message}</div>
        <Button type="submit" className="w-100 mt-3">
          Order
        </Button>
      </Form>
    </div>
  );
}

OrderGimbap.propTypes = {
  gimbaps: PropTypes.array,
  locations: PropTypes.array
};

export default OrderGimbap;
