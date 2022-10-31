/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
import { getOneCustomerTransFromApi } from '../../redux/forms/oneCustomerTransactReducer';
import { getOneSeasonFromApi } from '../../redux/forms/oneSeasonReducer';
import { getSeasonFromApi } from '../../redux/forms/seasonReducer';
import {
  getTransactionFromApi,
  postTransactionToApi,
} from '../../redux/forms/transactionReducer';
import Loader from '../loader/Loader';
import './Contribution.css';

const Contribution = () => {
  const { cardNumber } = localStorage;
  const customer = useSelector((state) => state.oneCustomer?.data);
  const transactions = useSelector((state) => state.customerTransactions?.data);

  const isReady = customer && transactions;
  // const seasons = useSelector((state) => state.seasons);
  // const season = useSelector((state) => state.oneSeason?.data);
  // const { start_date } = season;
  // const lastSeason = seasons.data.length;
  const [go, setGo] = useState(false);
  const [daysNo, setDaysNo] = useState(0);
  // const [trDate, setTrDate] = useState(new Date().toLocaleDateString());
  const dispatch = useDispatch();

  // const lastTransaction = transactions?.slice(-1);
  // let lastDate;
  // lastTransaction.length
  //   ? (lastDate = lastTransaction[0]?.current_contribution_date)
  //   : (lastDate = start_date);
  // const date = new Date(lastDate);
  // const AddDaysToDate = date.setDate(date.getDate() + daysNo);
  // const convertDate = new Date(AddDaysToDate);
  const { name, daily_contribution } = customer;

  const handleDays = (e) => {
    const input = +e.target.value;
    if (input > 0) {
      setDaysNo(input);
      setGo(input > 0);
    }
  };

  const amount = daysNo * daily_contribution;
  // const { user } = JSON.parse(localStorage.getItem('user'));

  // const currentDate =
  //   convertDate.getFullYear() +
  //   '-' +
  //   (convertDate.getMonth() + 1) +
  //   '-' +
  //   convertDate.getDate();

  console.log({ customer, transactions });

  // const handleRetry = () => {
  //   window.pushState({}, '', '/');
  //   window.location.reload();
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      user_id: user.id,
      amount,
      customer_id: +cardNumber,
      days_paid_for: daysNo,
      previous_contribution_date: lastDate,
      current_contribution_date: currentDate,
      transaction_date: trDate,
    };
    // dispatch(postTransactionToApi(transactionData));
    console.log(transactionData);
  };

  useEffect(() => {
    dispatch(getOneCustomerFromApi(cardNumber));
    dispatch(getOneCustomerTransFromApi(cardNumber));
    // dispatch(getSeasonFromApi());
    // dispatch(getOneSeasonFromApi(lastSeason));
  }, []);

  return (
    <div className="contribution-form">
      {isReady ? (
        <>
          <div className="inner-container">
            <h2 className="title1">Contribution details</h2>
          </div>
          <center style={{ color: 'crimson' }}>
            Enter no. of days to continue!
          </center>
          <h3 className="details">Customer details</h3>
          <form onSubmit={handleSubmit} className="add-customer-form">
            <div className="contribution-container">
              <p>Name: {name}</p>
              <p>Daily Contribution: {daily_contribution}</p>
              <h3 className="details t-details">Transaction Details</h3>
              <input
                type="number"
                className="form-control days-input"
                id="days_number"
                placeholder="No. of days"
                required
                autoCorrect="off"
                onChange={handleDays}
              />
              <input
                type="date"
                className="form-control days-input"
                name=""
                id=""
                onChange={(e) => setTrDate(e.target.value)}
              />
              <p>Amount: NGN {amount}</p>
              {/* <p>Previous payment date: {lastDate}</p>
              <p>Current payment date: {currentDate}</p> */}
            </div>
            {go && (
              <NavLink to="/transactions" style={{ textDecoration: 'none' }}>
                <button
                  type="button"
                  className="add-customer-btn cont-btn"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </NavLink>
            )}
          </form>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

/* eslint-enable */
export default Contribution;
