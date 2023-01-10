/* eslint-disable */
import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import '../customer/Customer.css';
import { getOneTransactionFromApi } from '../../redux/forms/OneTransactionReducer';
import Loader from '../loader/Loader';

const Transaction = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const paramID = param.id;
  const transaction = useSelector((state) => state.oneTransaction);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const isReady = Object.keys(transaction.data).length >= 1;

  useEffect(() => {
    dispatch(getOneTransactionFromApi(paramID));
  }, []);

  console.log(transaction);

  const comma = (num) => {
    const number = parseInt(num);
    const newText = number.toLocaleString();
    return newText;
  };

  const {
    id,
    amount,
    customer_id,
    previous_contribution_date,
    current_contribution_date,
    days_paid_for,
    transaction_date,
    created_at,
  } = transaction.data;

  localStorage.setItem(
    'transDetails',
    JSON.stringify({
      id,
      amount,
      customer_id,
      previous_contribution_date,
      current_contribution_date,
      days_paid_for,
      transaction_date,
      created_at,
    })
  );

  return (
    <>
      {transaction.loading && <Loader />}
      {!transaction.loading && (
        <div className="containa transaction">
          <div className="tansaction-del-container">
            <div className="details-container">
              <p className="cus-details">
                <span>Previous contribution date:</span>{' '}
                {previous_contribution_date}
              </p>
              <p className="cus-details">
                <span>Current contribution date:</span>{' '}
                {current_contribution_date}
              </p>
              <p className="cus-details">
                <span>Days paid for:</span> {days_paid_for}
              </p>
              <p className="cus-details">
                <span>Transaction No. </span>
                {/* {user.location_area.slice(0, 3).toUpperCase()} */}
                TRN{user.id}/{transaction.data.id}
              </p>
              <p className="cus-details">
                <span>Payment Date: </span>
                {Moment(transaction_date).format('MMMM DD, LT')}
              </p>
              <p className="cus-details">
                <span>Amount:</span> {`NGN ${comma(amount)}`}
              </p>
              <p className="cus-details">
                <span>Date of transaction: </span>
                {Moment(created_at).format('MMMM DD, LT')}
              </p>
            </div>
            <div className="del">
              <NavLink to="/transactiondetails">
                <button type="button" className="view-trans">
                  More Details
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* eslint-enable */
export default Transaction;
