import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import './Customers.css';
import { getUsersFromApi } from '../../redux/forms/userManReducer';
/* eslint-disable */

const Customers = () => {
  const dispatch = useDispatch();
  const allCustomers = useSelector((state) => state.customer);
  const allUsers = useSelector((state) => state.userManReducer?.data);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const marketer = allUsers.filter((users) => users.id === user.id);
  const marketerId = marketer[0]?.id;
  const marketerCustomer = allCustomers.data.filter(
    (customer) => user.id === customer.user_id
  );

  useEffect(() => {
    dispatch(getCustomerFromApi());
    dispatch(getUsersFromApi());
  }, []);

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
        <h3 className="columns" id="col" style={{ color: 'crimson' }}>
          {user.role === 'admin' && allCustomers.data.length}
          {user.role === 'marketer' && marketerCustomer.length}
        </h3>
      </div>

      {allCustomers.data.map((customer) => {
        const permitted =
          user.role === 'admin' ||
          user.role === 'superadmin' ||
          customer.user_id === user.id ||
          customer.user_id === marketerId;

        if (permitted)
          return (
            <NavLink key={customer.id} to={`/customers/${customer.id}`}>
              <ul id="p-child">
                <li>
                  <div className="custrans-name1">
                    <h4 className="columns" style={{ color: 'crimson' }}>
                      {customer.name}
                    </h4>
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
