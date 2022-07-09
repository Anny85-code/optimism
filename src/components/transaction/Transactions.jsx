import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import { getTransactionFromApi } from '../../redux/forms/transactionReducer';
import './Transactions.css';


const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};

  useEffect(() => {
    dispatch(getTransactionFromApi());
  }, []);
  /* eslint-disable */
  return (
    <div>
      {transactions.data.map((transaction) => {
        const permitted = user.role === 'admin' || transaction.user_id === user.id;
        if (permitted) {
          return (
            <NavLink key={transaction.id} to={`/transactions/${transaction.id}`}>
              <div className="customer-container">
                <h3>
                  <span className="cus-name">Amount:</span>
                  {transaction.amount}
                </h3>
                <p>
                  <span className="cus-phone">Date:</span>
                  {Moment(transaction.created_at).format('MMMM DD, LT')}
                </p>
              </div>
            </NavLink>
          );
        }
      })}
      ;
    </div>
  );
};
/* eslint-enable */

export default Transactions;
