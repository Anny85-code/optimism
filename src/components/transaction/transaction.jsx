import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import '../customer/Customer.css';
/* eslint-disable */
import { getOneTransactionFromApi } from '../../redux/forms/OneTransactionReducer';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
/* eslint-enable */
const data = JSON.parse(localStorage.getItem('user'));
const { user } = data || {};

const Transaction = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const transaction = useSelector((state) => state.oneTransaction);
  const customer = useSelector((state) => state.oneCustomer);
  const customerId = JSON.parse(localStorage.getItem('cardNumber'));

  useEffect(() => {
    dispatch(getOneCustomerFromApi(customerId));
    dispatch(getOneTransactionFromApi(id));
  }, []);

  
  /* eslint-disable */
  const comma = (num) => {
    const number = parseInt(num);
    const newText = number.toLocaleString();
    return newText;
  };

  const {
    amount,
    previous_contribution_date,
    current_contribution_date,
    days_paid_for,
    created_at,
  } = transaction.data;
  const { name, picture, daily_contribution } = customer.data;

  
  return (
    <div className="containa transaction">
      <div className="image-container">
        <img className="cus-image" src={picture} alt={`${name}`} />
      </div>
      <div className="details-container">
        <h3 className="cus-details">Name: {name}</h3>
        <p className="cus-details">
          Daily Contribution: {`NGN ${comma(daily_contribution)}`}
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
          {user.location_area.slice(0, 3).toUpperCase()}
          {user.id}/{transaction.data.id}
        </p>
        <p className="cus-details">Amount: {`NGN ${comma(amount)}`}</p>
        <p className="cus-details">
          Date of transaction:{Moment(created_at).format('MMMM DD, LT')}
        </p>
      </div>
    </div>
  );
};

/* eslint-enable */
export default Transaction;
