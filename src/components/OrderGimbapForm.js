import { useState } from 'react';
import { Form } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import PropTypes from 'prop-types';
import 'components/OrderGimbapForm.css';

function OrderGimbapForm({ gimbap }) {
  const [checked, setChecked] = useState(false);
  const [amount, setAmount] = useState(1);
  const onChange = (event) => {
    if (event.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    };
  };

  return (
    <Form.Group>
      <div className="d-flex">
        <Form.Check type="checkbox" id={gimbap.gimbapName}
          name="gimbaps" onChange={onChange} />
        <Form.Label htmlFor={gimbap.gimbapName} className="ms-2">
          {gimbap.gimbapName}
        </Form.Label>
        <Form.Label className="mx-2">
          <CurrencyFormat value={gimbap.price} displayType="text"
            decimalScale={2} prefix="$ " thousandSeparator />
        </Form.Label>
        <Form.Control type="number" step={1} min={1}
          disabled={!checked} className="number-input" value={amount}
          onChange={(event) => setAmount(event.target.value)} />
      </div>
      <img src={gimbap.imageUrl} alt="gimbap" className="gimbap-form-image" />
      <p>{gimbap.ingredients}</p>
    </Form.Group>
  );
}

OrderGimbapForm.propTypes = {
  gimbap: PropTypes.object
};

export default OrderGimbapForm;
