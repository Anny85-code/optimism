import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Customer.css';
/* eslint-disable */
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
/* eslint-enable */
const editUrl = (person) => {
  const { id } = person;
  return `/customers/${id}/edit`;
};

const Customer = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const aCustomers = useSelector((state) => state.oneCustomer);

  useEffect(() => {
    dispatch(getOneCustomerFromApi(id));
  }, []);

  /* eslint-disable */

  const {
    name,
    phone,
    address,
    email,
    created_at,
    picture,
    updated_at,
    daily_contribution,
  } = aCustomers.data;
  const redirect = editUrl(aCustomers.data);

  return (
    <div className="main-cus-container">
      <div className="containa">
        <div className="details-container">
        <h3>Name: {name}</h3>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
          <p>Daily Contribution: NGN {daily_contribution}</p>
          <p>Address: {address}</p>
          <p>Joined: {created_at}</p>
          <p>Last Updated: {updated_at}</p>
        </div>

        <div>
          <img src={picture} alt={`${name}`} style={{ width: '100px' }} />
          <NavLink to={redirect}>Edit</NavLink>
        </div>
      </div>
    </div>
  );
};
/* eslint-enable */
export default Customer;
