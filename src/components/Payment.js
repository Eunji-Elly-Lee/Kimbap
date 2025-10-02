import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from 'StateProvider';
import { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import axios from 'axiosInstance';
import { getTotalAmount } from 'reducer';
import CurrencyFormat from 'react-currency-format';
import { Form, Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Payment({ user }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [state, dispatch] = useStateValue();
  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  state.basket.sort((x, y) => x.price >= y.price ? 1: -1);
  const onSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(() => {
      const order = {
        name: user.email,
        basket: state.basket,
        amount: getTotalAmount(state.basket),
        location: state.location,
        orderDate: new Date().toLocaleString()
      };
      dbService.collection("orders").add(order)
        .then(() => {
          dispatch({
            type: "EMPTY_BASKET"
          });
          setProcessing(false);
          setMessage("");
          navigate("/orders");
        });
    });
  };
  const onChange = (event) => {
    setMessage(event.error ? event.error.message : "");
  };
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: 'POST',
        url: "/payment/create?total=" + getTotalAmount(state.basket) * 100
      });
      setClientSecret(response.data.clientSecret);
    }
    getClientSecret();
  }, [state]);

  return (
    <div>
      <h4 className="mb-3">Order Confirmation</h4>
      {state.basket.map(gimbap => (
        <p key={gimbap.name}>
          {gimbap.name}: {gimbap.quantity}EA *&nbsp;
          <CurrencyFormat value={gimbap.price} displayType="text"
            decimalScale={2} prefix="$ " thousandSeparator />
        </p>
      ))}
      <hr />
      <p>
        Total Amount:&nbsp;
        <CurrencyFormat value={getTotalAmount(state.basket)} displayType="text"
          decimalScale={2} prefix="$ " thousandSeparator />
      </p>
      <p>{state.location}</p>
      <Form onSubmit={onSubmit}>
        <CardElement onChange={onChange} className="border border-dark rounded p-3" />
        <div className="mt-3 text-center">{message}</div>
        <Button type="submit" disabled={processing} className="w-100 mt-3">
          {processing ? (
            <>
            <Spinner as="span" animation="border" size="sm"
              role="status" aria-hidden="true" />
            <span className="visually-hidden">Processing...</span>
            </>
          ) : "Pay"}
        </Button>
      </Form>
    </div>
  );
}

Payment.propTypes = {
  user: PropTypes.object
};

export default Payment;
