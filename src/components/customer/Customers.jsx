import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import './Customers.css';
import Loader from '../loader/Loader';
/* eslint-disable */

const Customers = () => {
  const dispatch = useDispatch();
  const allCustomers = useSelector((state) => state.customer?.data);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const reId = localStorage.getItem('_id');
  const admins = user.role === 'admin' || user.role === 'superadmin';
  const supervisor = user.role === 'supervisor';
  const isMarketer = user.role === 'marketer';
  const [nx, setNx] = useState(10);
  const [pr, setPr] = useState(0);

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);

  const newData = allCustomers.filter((customer) => {
    if (
      (admins && +reId === customer.user_id) ||
      (supervisor && +reId === customer.user_id) ||
      (isMarketer && user.id === customer.user_id)
    ) {
      return customer;
    }
  });
  const len = newData.length;

  const handleNext = () => {
    if (nx <= len) {
      setNx(nx + 10);
      setPr(pr + 10);
    }
  };

  const handPrevious = () => {
    if (pr > 1) {
      setPr(pr - 10);
      setNx(nx - 10);
    }
  };

  return (
    <div>
      {len > 0 ? (
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
              {len}
            </h3>
          </div>

          {newData &&
            newData.slice(pr, nx).map((customer) => (
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
      <div className="pre-next-cont">
        <i
          className="fa fa-caret-left fa-2x text-red"
          onClick={handPrevious}
          style={{ cursor: 'pointer' }}
        />
        <p className="pre-text">
          {pr + 1} - {nx < len ? nx : len} <span>of</span> {len}
        </p>
        <i
          className="fa fa-caret-right fa-2x text-red"
          onClick={handleNext}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};
/* eslint-enable */
export default Customers;
