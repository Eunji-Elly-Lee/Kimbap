import CurrencyFormat from 'react-currency-format';
import PropTypes from 'prop-types';

function Gimbap({ gimbap }) {
  return (
    <div>
      <div>
        {gimbap.gimbapName} &nbsp;
        <CurrencyFormat value={gimbap.price} displayType="text"
          decimalScale={2} prefix="$ " thousandSeparator />
      </div>
      <img src={gimbap.imageUrl} alt="gimbap" className="gimbapImg mt-2" />
      <p>{gimbap.ingredients}</p>
    </div>
  );
}

Gimbap.propTypes = {
  gimbap: PropTypes.object
};

export default Gimbap;
