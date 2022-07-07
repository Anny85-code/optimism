import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
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
    <div className="containa">
      <div className="image-container">
        <img className="cus-image" src={picture} alt={`${name}`} />
      </div>
      <div className="details-container">
        <h3 className="cus-details">Name: {name}</h3>
        <p className="cus-details">Phone: {phone}</p>
        <p className="cus-details">Email: {email}</p>
        <p className="cus-details">
          Daily Contribution: NGN {daily_contribution}
        </p>
        <p className="cus-details">Address: {address}</p>
        <p className="cus-details">
          Joined:{Moment(created_at).format('MMMM DD, LT')}
        </p>
        <p className="cus-details">
          Last Updated:{Moment(updated_at).format('MMMM DD, LT')}
        </p>
      </div>

      <div className="edit">
        <NavLink to={redirect} style={{ textDecoration: 'none' }}>
          <i className="fa fa-edit" />
        </NavLink>
      </div>
    </div>
  );
};
/* eslint-enable */
export default Customer;
