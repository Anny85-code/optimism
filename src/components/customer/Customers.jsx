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
    <div className="transact-customer-container1">
      <div className="custrans-name1">
        <h4 className="columns">
          <span className="cus-name1">Customer's Name</span>
        </h4>
        <h4 className="columns i" id="a">
          Phone
        </h4>
        <h4 className="columns">
          <span className="cus-name2 ">Total number of customers</span>
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
        <h3 className="columns" id="col">
          {allCustomers.data.length}
        </h3>
      </div>

      {allCustomers.data.map((customer) => {
        const permitted = user.role === 'admin' || customer.user_id === user.id;
        if (permitted)
          return (
            <NavLink key={customer.id} to={`/customers/${customer.id}`}>
              <ul id="p-child">
                <li>
                  <div className="custrans-name1">
                    <h4 className="columns" style={{color: 'crimson'}}>{customer.name}</h4>
                    <h4
                      className="columns i"
                      style={{ borderRight: '2px solid crimson' }}
                    >
                      {customer.phone}
                    </h4>
                    <h4 className="columns"></h4>
                  </div>
                </li>
              </ul>
            </NavLink>
          );
      })}
    </div>
  );
};
/* eslint-enable */
export default Customers;


  // <p>Total No of Customers: {allCustomers.data.length}</p>;