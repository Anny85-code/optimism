/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Customers.css';
import Loader from '../loader/Loader';
import { getMarketerCustomersFromApi } from '../../redux/forms/marketerCustomersReducer';

const Customers = () => {
  const dispatch = useDispatch();
  const markCustomers = useSelector((state) => state.mCustomers);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const reId = localStorage.getItem('_id');
  const sliceChunk = 10;
  const [nx, setNx] = useState(sliceChunk);
  const [pr, setPr] = useState(0);

  useEffect(() => {
    dispatch(getMarketerCustomersFromApi(reId ?? user.id));
  }, []);

  const newData = markCustomers?.data?.customers;
  const len = markCustomers?.data?.no;

  const handleNext = () => {
    if (nx <= len) {
      setNx(nx + sliceChunk);
      setPr(pr + sliceChunk);
    }
  };

  const handPrevious = () => {
    if (pr > 1) {
      setPr(pr - sliceChunk);
      setNx(nx - sliceChunk);
    }
  };

  return (
    <div>
      {!markCustomers?.loading ? (
        <>
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
                  <NavLink
                    key={customer.id}
                    to={`/customers/${customer.id}`}
                    target="_blank"
                  >
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
            <div className="transact-customer-container">
              {' '}
              <p className="no-trans">No Customer yet!</p>
              <button type="button" className="no-trans-btn">
                <NavLink to="/checkphone" style={{ textDecoration: 'none' }}>
                  Add A Customer
                </NavLink>
              </button>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
      {len > 0 && (
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
      )}
    </div>
  );
};
/* eslint-enable */
export default Customers;
