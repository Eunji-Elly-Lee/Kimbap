import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import OrderForm from 'components/OrderForm';
import 'routes/Order.css';

function Order({ user }) {
  const [stripePromise, ] = useState(() =>
    loadStripe(process.env.REACT_APP_LOAD_STRIPE)
  );

  return (
    <div className="order mx-auto mt-4">
      <Elements stripe={stripePromise}>
        <OrderForm user={user} />
      </Elements>
    </div>
  );
}
 
Order.propTypes = {
  user: PropTypes.object
};

export default Order;
