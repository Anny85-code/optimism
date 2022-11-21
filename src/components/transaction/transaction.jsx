/* eslint-disable */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import '../customer/Customer.css';
import {
  delOneTransFromApi,
  getOneTransactionFromApi,
} from '../../redux/forms/OneTransactionReducer';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
import Loader from '../loader/Loader';

const Transaction = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const transaction = useSelector((state) => state.oneTransaction);
  const cardNum = JSON.parse(localStorage.getItem('cardNumber'));
  const transCusId = transaction?.data?.customer_id;
  const customerId = cardNum ?? transCusId;
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const admins = user.role === 'admin' || user.role === 'superadmin';
  const isReady = Object.keys(transaction.data).length >= 1;
  const markId = localStorage.getItem('_id');

  useEffect(() => {
    dispatch(getOneCustomerFromApi(customerId));
    dispatch(getOneTransactionFromApi(id));
  }, []);

  const comma = (num) => {
    const number = parseInt(num);
    const newText = number.toLocaleString();
    return newText;
  };

  const handleConfirm = (e) => {
    if (e.target.id === 'yes') {
      dispatch(delOneTransFromApi(id));
      // window.history.pushState({}, '', `/customers/${customerId}/transactions`);
      window.history.pushState({}, '', `/users/${markId}/transactions`);
      window.location.reload();
    } else if (e.target.id === 'no') {
      const deleteS = document.getElementById('delete');
      deleteS.style.display = 'none';
    }
  };

  const handleDel = () => {};

  const {
    amount,
    previous_contribution_date,
    current_contribution_date,
    days_paid_for,
    transaction_date,
    created_at,
  } = transaction.data;

  const transDetails = {
    amount,
    previous_contribution_date,
    current_contribution_date,
    days_paid_for,
    transaction_date,
    created_at,
  };

  localStorage.setItem('transDetails', JSON.stringify(transDetails));

  return (
    <div className="containa transaction">
      {isReady ? (
        <div className="tansaction-del-container">
          <div id="delete" className="del-style-transact">
            <p>Are you sure you want to delete?</p>
            <button type="button" id="yes" onClick={handleConfirm}>
              Yes
            </button>
            <button type="button" id="no" onClick={handleConfirm}>
              No
            </button>
          </div>
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
              {user.location_area.slice(0, 3).toUpperCase()}
              {user.id}/{transaction.data.id}
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
          <div>
            {admins && (
              <div className="del">
                <button
                  type="button"
                  className="view-trans"
                  onClick={handleDel}
                >
                  More Details
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

/* eslint-enable */
export default Transaction;
