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
  let permitted;

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);

  return (
    <div>
      {allCustomers.data.map((customer) => {
        permitted = user.role === 'admin' || customer.user_id === user.id;
        // customer.user_id === user.id && (
        if (permitted)
          return (
            <NavLink key={customer.id} to={`/customers/${customer.id}`}>
              <div className="customer-container">
                <h3>
                  <span className="cus-name">Name:</span>
                  {customer.name}
                  {/* <p>marketer {user.id}</p> */}
                </h3>
                <p>
                  <span className="cus-phone">Phone:</span>
                  {customer.phone}
                  {/* <p>customer {customer.user_id}</p> */}
                </p>
              </div>
            </NavLink>
          );
      })}
      ;
    </div>
  );
};
export default Customers;
