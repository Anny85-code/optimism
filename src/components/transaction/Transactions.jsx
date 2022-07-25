import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import { getTransactionFromApi } from '../../redux/forms/transactionReducer';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import './Transactions.css';
/* eslint-disable */

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);
  const { customer_id } = transactions.data;
  const customers = useSelector((state) => state.customer);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};

  useEffect(() => {
    dispatch(getTransactionFromApi());
    dispatch(getCustomerFromApi(customer_id));
  }, []);

  return (
    <div>
      {transactions.data.map((transaction) => {
        const permitted =
          user.role === 'admin' || transaction.user_id === user.id;
        const aCustomer = {};
        customers.data.filter((customer) => {
          if (customer.id === transaction.customer_id) {
            aCustomer.name = customer.name;
          }
        });

        console.log(aCustomer);
        if (permitted) {
          return (
            <NavLink
              key={transaction.id}
              to={`/transactions/${transaction.id}`}
            >
              <div className="customer-container transactions-container">
                <h3>
                  <span className="cus-name">Customer's Name:</span>
                  {aCustomer.name}
                </h3>
                <h4>
                  <span className="cus-name">Amount:</span>
                  {transaction.amount}
                </h4>
                <h4>
                  <span className="cus-phone">Date:</span>
                  {Moment(transaction.created_at).format('MMMM DD, LT')}
                </h4>
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
