/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
import { getOneCustomerTransFromApi } from '../../redux/forms/oneCustomerTransactReducer';
import { getSeasonFromApi } from '../../redux/forms/seasonReducer';
import { postTransactionToApi } from '../../redux/forms/transactionReducer';
import Loader from '../loader/Loader';
import './Contribution.css';

const Contribution = () => {
  const { user } = JSON.parse(localStorage.getItem('user'));
  const { cardNumber } = localStorage;

  const customer = useSelector((state) => state.oneCustomer?.data);
  const transactions = useSelector((state) => state.customerTransactions);
  const seasons = useSelector((state) => state.seasons?.data);

  const lastSeason = seasons?.sort((a, x) => a.id - x.id)?.slice(-1);
  console.log({ transactions }, { lastSeason }, { customer });
  const isReady = customer && transactions && lastSeason;
  const [lSea] = lastSeason;
  const [go, setGo] = useState(false);
  const [daysNo, setDaysNo] = useState(0);
  const [trDate, setTrDate] = useState(new Date().toLocaleDateString());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneCustomerFromApi(+cardNumber));
    dispatch(getOneCustomerTransFromApi(+cardNumber));
  }, []);
  useEffect(() => {
    dispatch(getSeasonFromApi());
  }, []);

  const startDate = lSea?.start_date;
  const lastTransaction = transactions?.data?.trans
    ?.sort((a, b) => a.id - b.id)
    ?.slice(-1);
  const lastDate = lastTransaction?.[0]?.current_contribution_date ?? startDate;

  const date = new Date(lastDate);
  const AddDaysToDate = date.setDate(date.getDate() + daysNo);
  const convertDate = new Date(AddDaysToDate);
  const { name, daily_contribution } = customer;

  const handleDays = (e) => {
    const input = +e.target.value;
    if (input >= 0) {
      setDaysNo(input);
      setGo(input >= 1);
    }
  };

  const amount = daysNo * daily_contribution;

  const currentDate =
    convertDate.getFullYear() +
    '-' +
    (convertDate.getMonth() + 1) +
    '-' +
    convertDate.getDate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      user_id: user.id,
      amount,
      v2_customer_id: +cardNumber,
      days_paid_for: daysNo,
      previous_contribution_date: lastDate,
      current_contribution_date: currentDate,
      transaction_date: trDate,
    };
    dispatch(postTransactionToApi(transactionData));
  };

  return (
    <>
      {isReady ? (
        <div className="contribution-form">
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
                {seasons && (
                  <>
                    <p>Previous payment date: {lastDate}</p>
                    <p>Current payment date: {currentDate}</p>
                  </>
                )}
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
        </div>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

/* eslint-enable */
export default Contribution;
