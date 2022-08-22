import { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import PropTypes from 'prop-types';
import 'routes/Orders.css';

function Orders({ user }) {
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
    }
  }, [user]);

  return (
    <div className="w-75 mx-auto my-5">
      
    </div>
  );
}

Orders.propTypes = {
  user: PropTypes.object
};

export default Orders;
