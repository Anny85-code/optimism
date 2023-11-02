/* eslint-disable */
import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import '../customer/Customer.css';
import { getOneTransactionFromApi } from '../../redux/forms/OneTransactionReducer';
import Loader from '../loader/Loader';
import comma from './../../utils/Comma';

const Transaction = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const paramID = param.id;
  const transaction = useSelector((state) => state.oneTransaction);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};

  useEffect(() => {
    dispatch(getOneTransactionFromApi(paramID));
  }, []);

  const {
    id,
    amount,
    user_id,
    v2_customer_id,
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
      user_id,
      v2_customer_id,
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
                TRN{user_id}/{id}
              </p>
              <p className="cus-details">
                <span>Payment Date: </span>
                {transaction_date?.includes('/')
                  ? Moment(transaction_date, 'DD/MM/YYYY').format(
                      'Do MMMM YYYY'
                    )
                  : Moment(transaction_date).format('MMMM DD, LT')}
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
