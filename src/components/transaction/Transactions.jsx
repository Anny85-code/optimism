import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import { getTransactionFromApi } from '../../redux/forms/transactionReducer';
// import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import './Transactions.css';
// import Loader from '../loader/Loader';
/* eslint-disable */

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state) => state.transactions?.data?.transactions
  );
  // const { customer_id } = transactions;
  console.log(transactions);
  const customers = useSelector((state) => state.customer);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};

  useEffect(() => {
    dispatch(getTransactionFromApi());
    // dispatch(getCustomerFromApi(customer_id));
  }, []);

  const comma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  return (
    <div className="transact-customer-container1">
      <div className="transact-customer-container1">
        <div className="custrans-name1">
          <h4 className="columns">
            <span className="cus-name1">Customer's Name</span>
          </h4>
          <h4 className="columns i" id="a">
            Amount
          </h4>
          <h4 className="columns">
            <span className="cus-name2 ">Date</span>
          </h4>
        </div>
        <div className="custrans-name1">
          <h3 className="columns" id="col">
            <p className="custransactname"></p>
          </h3>
          <h3
            className="columns i"
            id="col"
            style={{
              borderRight: '2px solid crimson',
              borderBottom: '2px solid crimson',
            }}
          ></h3>
          <h3 className="columns" id="col" style={{ color: 'crimson' }}></h3>
        </div>
        {transactions &&
          transactions.map((transaction) => {
            const permitted =
              user.role === 'admin' || transaction.user_id === user.id;
            const aCustomer = {};
            customers.data.filter((customer) => {
              if (customer.id === transaction.customer_id) {
                aCustomer.name = customer.name;
              }
            });

            if (permitted) {
              return (
                <NavLink
                  key={transaction.id}
                  to={`/transactions/${transaction.id}`}
                >
                  <ul id="p-child">
                    <li>
                      <div className="custrans-name1">
                        <h4 className="columns" style={{ color: 'crimson' }}>
                          {aCustomer.name}
                        </h4>
                        <h4
                          className="columns i"
                          style={{ borderRight: '2px solid crimson' }}
                        >
                          {` NGN ${comma(transaction.amount)}`}
                        </h4>
                        <h4 className="columns" style={{ color: '#000' }}>
                          {Moment(transaction.created_at).format('MMMM DD, LT')}
                        </h4>
                      </div>
                    </li>
                  </ul>
                </NavLink>
              );
            }
          })}
      </div>
    </div>
  );
};
/* eslint-enable */

export default Transactions;
