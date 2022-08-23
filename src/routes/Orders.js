import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import CurrencyFormat from 'react-currency-format';
import PropTypes from 'prop-types';
import 'routes/Orders.css';

function Orders({ user }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      if (user.email === "lizyduck@gmail.com") {
        dbService.collection("orders").orderBy("location", "desc")
        .onSnapshot((snapshot => {
          const orderArray = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setOrders(orderArray);
        }));
      } else {
        dbService.collection("orders").where("name", "==", user.email)
        .orderBy("location", "desc")
        .onSnapshot((snapshot => {
          const orderArray = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setOrders(orderArray);
        }));
      }
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className={orders.length > 3 ? "orders orders-long" : "orders orders-short"}>
      {orders.map(order => (
        <div key={order.id} className="mb-4">
          <h5>{order.location}</h5>
          <p>
            {(user && user.email === "lizyduck@gmail.com") && (
              <>
              {order.name} /&nbsp;
              </>
            )}
            <CurrencyFormat value={order.amount} displayType="text"
              decimalScale={2} prefix="$ " thousandSeparator />
            <small> ({order.orderDate})</small>
          </p>
          {order.basket.map(gimbap => (
            <p key={gimbap.name} className="m-2">{gimbap.name}: {gimbap.quantity}EA</p>
          ))}
        </div>
      ))}
    </div>
  );
}

Orders.propTypes = {
  user: PropTypes.object
};

export default Orders;
