import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import '../customer/Customer.css';
/* eslint-disable */
import {
  delOneTransFromApi,
  getOneTransactionFromApi,
} from '../../redux/forms/OneTransactionReducer';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
import Loader from '../loader/Loader';
/* eslint-enable */

const Transaction = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const transaction = useSelector((state) => state.oneTransaction);
  const customer = useSelector((state) => state.oneCustomer);
  const cardNum = JSON.parse(localStorage.getItem('cardNumber'));
  const transCusId = transaction?.data?.customer_id;
  const customerId = cardNum ?? transCusId;
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const admins = user.role === 'admin' || user.role === 'superadmin';
  const data1 = Object.keys(transaction.data).length >= 1;
  const data2 = Object.keys(customer.data).length >= 1;
  const isReady = data1 && data2;
  const markId = localStorage.getItem('_id');

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

  const handleDel = () => {
    const deleteS = document.getElementById('delete');
    deleteS.style.display = 'block';
  };

  const {
    amount,
    previous_contribution_date,
    current_contribution_date,
    days_paid_for,
    transaction_date,
    created_at,
  } = transaction.data;
  const { name, picture, daily_contribution } = customer?.data;

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
          {/* <div className="image-container">
            <img className="cus-image" src={picture} alt={`${name}`} />
          </div> */}
          <div className="details-container">
            <h3 className="cus-details">
              <span>Name:</span> {name}
            </h3>
            <p className="cus-details">
              <span>Daily Contribution:</span>{' '}
              {`NGN ${comma(daily_contribution)}`}
            </p>
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
                  Delete
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
