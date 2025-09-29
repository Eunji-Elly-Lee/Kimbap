import CurrencyFormat from 'react-currency-format';
import PropTypes from 'prop-types';
import 'components/Gimbap.css';

function Gimbap({ gimbap }) {
  return (
    <div>
      <div>
        <strong>{gimbap.gimbapName}</strong> &nbsp;
        <CurrencyFormat value={gimbap.price} displayType="text"
          decimalScale={2} prefix="$ " thousandSeparator />
      </div>
      <div className="gimbap-image-wrapper position-relative my-4">
        <img src={gimbap.imageUrl} alt="gimbap" className="gimbap-image w-100 h-100 rounded" />
      </div>
      <p>{gimbap.ingredients}</p>
    </div>
  );
}

Gimbap.propTypes = {
  gimbap: PropTypes.object
};

export default Gimbap;
