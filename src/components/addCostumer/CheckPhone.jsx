/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import './AddCostumer.css';
import Loader from '../loader/Loader';

const CheckPhone = () => {
  const dispatch = useDispatch();
  const fetchCustomer = useSelector((state) => state.customer);
  const [phone, setPhone] = useState('');
  const isLoading = fetchCustomer.loading;
  const { customers } = fetchCustomer?.data;
  const [proceed, setProceed] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);

  const phoneNumbers = [];
  customers?.forEach((customer) => phoneNumbers.push(customer.phone));
  console.log(phoneNumbers);

  const checkPhone = () => {
    if (phone.length === 11) {
      if (phoneNumbers.includes(phone)) {
        setError('Number already in use');
      } else {
        setProceed(!proceed);
        setError('Available');
      }
    } else {
      console.log('Check phone number');
      setError('Check phone number');
      return 'Check phone number';
    }
  };

  const handleProceed = () => {
    localStorage.setItem('checked__phone', phone);
  };

  return (
    <>
      {isLoading ? (
        Loader()
      ) : (
        <div>
          <div className="form-container update-cus-container">
            <div className="inner-container" id="cus-inner">
              <h3 className="title">Check Phone</h3>
            </div>
            <form className="add-customer-form">
              <center className="errors">
                {error && (
                  <p
                    style={
                      error === 'Available'
                        ? { color: 'green' }
                        : { color: 'red' }
                    }
                  >
                    {error}
                  </p>
                )}
              </center>
              <div className="form-group">
                <label htmlFor="phone">
                  <span>
                    Phone <span style={{ color: 'crimson' }}>*</span>
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-group-btn">
                <button
                  type="button"
                  className="add-item-btn"
                  onClick={checkPhone}
                >
                  Check
                  <i className="fa fa-search" id="toggle-btn" />
                </button>
              </div>
              <div className="form-group-btn">
                {proceed && (
                  <NavLink to="/addcustomer" style={{ textDecoration: 'none' }}>
                    <button
                      type="button"
                      className="add-item-btn"
                      onClick={handleProceed}
                    >
                      Proceed
                      <i className="fa fa-arrow-right" id="toggle-btn" />
                    </button>
                  </NavLink>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
/* eslint-enable */
export default CheckPhone;
