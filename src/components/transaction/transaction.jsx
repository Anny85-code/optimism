import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import '../customer/Customer.css';
/* eslint-disable */
import { getOneTransactionFromApi } from '../../redux/forms/OneTransactionReducer';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
/* eslint-enable */
const editUrl = (person) => {
  const { id } = person;
  return `/transactions/${id}/edit`;
};
const data = JSON.parse(localStorage.getItem('user'));
const { user } = data || {};

const Transaction = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const transaction = useSelector((state) => state.oneTransaction);
  const customer = useSelector((state) => state.oneCustomer);

  useEffect(() => {
    dispatch(getOneCustomerFromApi(id));
    dispatch(getOneTransactionFromApi(id));
  }, []);

  /* eslint-disable */

  const {
    amount,
    previous_contribution_date,
    current_contribution_date,
    days_paid_for,
    created_at,
    updated_at,
  } = transaction.data;
  const { name, picture, daily_contribution } = customer.data;
  const redirect = editUrl(transaction.data);

  return (
    <div className="containa">
      <div className="image-container">
        <img className="cus-image" src={picture} alt={`${name}`} />
      </div>
      <div className="details-container">
        <h3 className="cus-details">Name: {name}</h3>
        <p className="cus-details">
          Daily Contribution: NGN {daily_contribution}
        </p>
        <p className="cus-details">
          Previous contribution date: {previous_contribution_date}
        </p>
        <p className="cus-details">
          Current contribution date: {current_contribution_date}
        </p>
        <p className="cus-details">Days paid for: {days_paid_for}</p>
        <p className="cus-details">
          Transaction No.
          {user.location.slice(0, 3).toUpperCase()}
          {user.id}/{transaction.data.id}
        </p>
        <p className="cus-details">Amount: {amount}</p>
        <p className="cus-details">
          Joined:{Moment(created_at).format('MMMM DD, LT')}
        </p>
        <p className="cus-details">
          Last Updated:{Moment(updated_at).format('MMMM DD, LT')}
        </p>
      </div>

      {/* <div className="image-container">
        <div className="edit">
          {user.role === 'admin' && (
            <NavLink to={redirect} style={{ textDecoration: 'none' }}>
              <i className="fa fa-edit" />
            </NavLink>
          )}
        </div>
      </div> */}
    </div>
  );
};

/* eslint-enable */
export default Transaction;
