import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import OrderGimbapForm from './OrderGimbapForm';
import OrderLocationForm from './OrderLocationForm';

function OrderGimbap({ gimbaps, locations }) {
  const onSubmit = async (event) => {
    event.preventDefault();    
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
