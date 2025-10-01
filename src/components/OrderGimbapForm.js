import { useStateValue } from 'StateProvider';
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import PropTypes from 'prop-types';
import 'components/OrderGimbapForm.css';

function OrderGimbapForm({ gimbap }) {
  const [state, dispatch] = useStateValue();
  const [checked, setChecked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const onCheckChange = (event) => {
    if (event.target.checked) {
      dispatch({
        type: "ADD_TO_BASKET",
        gimbap: {
          name: gimbap.gimbapName,
          price: gimbap.price,
          quantity: quantity
        }
      });
      setChecked(true);
    } else {
      dispatch({
        type: "REMOVE_FROM_BASKET",
        name: gimbap.gimbapName
      });
      setChecked(false);
    }
  };
  const onPriceChange = (event) => {
    const { value } = event.target;
    dispatch({
      type: "UPDATE_QUANTITY",
      name: gimbap.gimbapName,
      quantity: value
    });
    setQuantity(value);
  };
  useEffect(() => {
    if (state.basket.length !== 0) {
      state.basket.forEach((element) => {
        if (element.name === gimbap.gimbapName) {
          setChecked(true);
          setQuantity(element.quantity);
        }
      });
    }
  }, [state, gimbap]);

  return (
    <Form.Group className="mb-4">
      <div className="d-flex">
        <Form.Check type="checkbox" id={gimbap.gimbapName} checked={checked}
          name="gimbaps" onChange={onCheckChange} />
        <Form.Label htmlFor={gimbap.gimbapName} className="ms-2">
          <strong>{gimbap.gimbapName}</strong>
        </Form.Label>
        <Form.Label className="mx-2">
          <CurrencyFormat value={gimbap.price} displayType="text"
            decimalScale={2} prefix="$ " thousandSeparator />
        </Form.Label>
        <Form.Control type="number" step={1} min={1}
          disabled={!checked} className="number-input" value={quantity}
          onChange={onPriceChange} />
      </div>
      <div className="gimbap-form-image-wrapper position-relative mt-3 mb-4">
        <img src={gimbap.imageUrl} alt="gimbap" className="gimbap-form-image w-100 h-100 rounded" />
      </div>
      <p>{gimbap.ingredients}</p>
    </Form.Group>
  );
}

OrderGimbapForm.propTypes = {
  gimbap: PropTypes.object
};

export default OrderGimbapForm;
