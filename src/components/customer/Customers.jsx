import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import './Customers.css';
import { getUsersFromApi } from '../../redux/forms/userManReducer';
import Loader from '../loader/Loader';
/* eslint-disable */

const Customers = () => {
  const dispatch = useDispatch();
  const allCustomers = useSelector((state) => state.customer?.data);
  const allUsers = useSelector((state) => state.userManReducer?.data);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const marketer = allUsers.filter((users) => users.id === user.id);
  const marketerId = marketer[0]?.id;
  const marketerCustomer = allCustomers.filter(
    (customer) => user.id === customer.user_id
  );
  const reId = localStorage.getItem('_id');
  const admins = user.role === 'admin' || user.role === 'superadmin';

  useEffect(() => {
    dispatch(getCustomerFromApi());
    dispatch(getUsersFromApi());
  }, []);

  const newData = allCustomers.filter((customer) => {
    if (
      (admins && +reId === customer.user_id) ||
      customer.user_id === user.id ||
      customer.id === marketerId
    ) {
      return customer;
    }
  });

  return (
    <>
      {newData ? (
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
              {/* {admins && allCustomers.length}
              {user.role === 'marketer' && marketerCustomer.length} */}
              {newData.length}
            </h3>
          </div>

          {newData &&
            newData.map((customer) => (
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
            ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
/* eslint-enable */
export default Customers;
