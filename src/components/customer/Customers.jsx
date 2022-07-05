import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import './Customers.css';

const Customers = () => {
  const dispatch = useDispatch();
  const allCustomers = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);

  return (
    <div>
      {allCustomers.data.map((customer) => (
        <NavLink key={customer.id} to={`/customers/${customer.id}`}>
          <div
            className="customer-container"
          >
            <h3 >
              <span className="cus-name">Name:</span>
              {customer.name}
            </h3>
            <p>
              <span className="cus-phone">Phone:</span>
              {customer.phone}
            </p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Customers;
