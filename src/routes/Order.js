import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import Payment from 'components/Payment';
import 'routes/Order.css';

function Order({ user }) {
  const [stripePromise, ] = useState(() =>
    loadStripe(process.env.REACT_APP_LOAD_STRIPE)
  );

  return (
    <div className="order">
      <Elements stripe={stripePromise}>
        <Payment user={user} />
      </Elements>
    </div>
  );
}
 
Order.propTypes = {
  user: PropTypes.object
};

export default Order;
