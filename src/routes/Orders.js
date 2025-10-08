import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { dbService } from 'fbase';
import CurrencyFormat from 'react-currency-format';
import PropTypes from 'prop-types';
import Pagination from 'components/Pagination';
import 'routes/Orders.css';

function Orders({ user }) {
  const PAGE_SIZE = 5;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const currentPaginationData = useMemo(() => {
    const offset = (currentPage - 1) * PAGE_SIZE;
    return orders.slice(offset, offset + PAGE_SIZE);
  }, [orders, currentPage]);
  const updatePage = (pageChange) => {
    setCurrentPage(pageChange);
  };
  useEffect(() => {
    if (user) {
      if (user.email === "ellylee2020@gmail.com") {
        dbService.collection("orders").orderBy("location", "desc")
          .onSnapshot(snapshot => {
            const orderArray = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setOrders(orderArray);
          });
      } else {
        dbService.collection("orders").where("name", "==", user.email)
          .orderBy("location", "desc").onSnapshot(snapshot => {
            const orderArray = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setOrders(orderArray);
          });
      }
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="orders d-flex align-items-center mx-auto px-3">
      <div className="w-100">
        {orders.length === 0 ? (
          <h5 className="text-center mt-5">No orders yet!</h5>
        ) : (
          <>
            {currentPaginationData.map(order => (
              <div key={order.id} className="mb-4">
                <h5>{order.location}</h5>
                <p>
                  {(user && user.email === "ellylee2020@gmail.com") && (
                    <>
                      {order.name} /&nbsp;
                    </>
                  )}
                  <CurrencyFormat value={order.amount} displayType="text"
                    decimalScale={2} prefix="$ " thousandSeparator />
                  <small> ({order.orderDate})</small>
                </p>
                {order.basket.map(gimbap => (
                  <p key={gimbap.name} className="m-2">
                    {gimbap.name}: {gimbap.quantity}EA
                  </p>
                ))}
              </div>
            ))}
            <Pagination currentPage={currentPage} totalCount={orders.length}
              pageSize={PAGE_SIZE} onPageChange={updatePage} />
          </>
        )}
      </div>
    </div>
  );
}

Orders.propTypes = {
  user: PropTypes.object
};

export default Orders;
