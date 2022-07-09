import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionFromApi } from '../../redux/forms/transactionReducer';
import './Transactions.css';


const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);
  return (
    <div>
      Transactions
    </div>
  )
}

export default Transactions;



import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import './Customers.css';

const Customers = () => {
  const dispatch = useDispatch();
  const allCustomers = useSelector((state) => state.customer);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);
  /* eslint-disable */
  return (
    <div>
      {allCustomers.data.map((customer) => {
        const permitted = user.role === 'admin' || customer.user_id === user.id;
        if (permitted)
          return (
            <NavLink key={customer.id} to={`/customers/${customer.id}`}>
              <div className="customer-container">
                <h3>
                  <span className="cus-name">Name:</span>
                  {customer.name}
                </h3>
                <p>
                  <span className="cus-phone">Phone:</span>
                  {customer.phone}
                </p>
              </div>
            </NavLink>
          );
      })}
      ;
    </div>
  );
};
/* eslint-enable */
export default Customers;

