import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
import { getOneSeasonFromApi } from '../../redux/forms/oneSeasonReducer';
import { getSeasonFromApi } from '../../redux/forms/seasonReducer';
/* eslint-disable */
import {
  getTransactionFromApi,
  postTransactionToApi,
} from '../../redux/forms/transactionReducer';
import './Contribution.css';

const Contribution = () => {
  const dispatch = useDispatch();
  const { cardNumber } = localStorage;
  const customerDetails = useSelector((state) => state.oneCustomer);
  const customersTransactions = useSelector((state) => state.transactions);
  const seasons = useSelector((state) => state.seasons);
  const lastSeason = seasons.data.length;
  const season = useSelector((state) => state.oneSeason);
  const seasonData = season.data;
  const { start_date } = seasonData;
  const myData = customersTransactions.data;
  let oneCustomerTransactions = [];
  const [go, setGo] = useState(false);

  myData.map((trans) => {
    if (trans.customer_id === +cardNumber) {
      oneCustomerTransactions.push(trans);
    }
  });

  const [daysNo, setDaysNo] = useState(0);
  const { data } = customerDetails;
  const lastTransaction = oneCustomerTransactions.slice(-1);
  let lastDate;
  lastTransaction.length
    ? (lastDate = lastTransaction[0]?.current_contribution_date)
    : (lastDate = start_date);
  const date = new Date(lastDate);
  const AddDaysToDate = date.setDate(date.getDate() + daysNo);
  const convertDate = new Date(AddDaysToDate);
  const { name, daily_contribution } = data;
  const amount = daysNo * daily_contribution;
  const { user } = JSON.parse(localStorage.getItem('user'));

  const currentDate =
    convertDate.getFullYear() +
    '-' +
    (convertDate.getMonth() + 1) +
    '-' +
    convertDate.getDate();

  const handleDays = (e) => {
    const input = +e.target.value;
    if (input > 0) {
      setDaysNo(input);
      setGo(input > 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      user_id: user.id,
      amount,
      customer_id: +cardNumber,
      days_paid_for: daysNo,
      previous_contribution_date: lastDate,
      current_contribution_date: currentDate,
    };
    dispatch(postTransactionToApi(transactionData));
  };

  useEffect(() => {
    dispatch(getOneCustomerFromApi(cardNumber));
    dispatch(getTransactionFromApi());
    dispatch(getSeasonFromApi());
    dispatch(getOneSeasonFromApi(lastSeason));
  }, []);

  return (
    <div className="contribution-form">
      <div className="inner-container">
        <h2 className="title1">Contribution details</h2>
      </div>
      <center style={{ color: 'red' }}>
        Enter no. of days to continue!
      </center>
      <h3 className="details">Customer details</h3>
      <form onSubmit={handleSubmit} className="add-customer-form">
        <div className="contribution-container">
          <p className="contr-name">Name: {name}</p>
          <p className="d-contr">Daily Contribution: {daily_contribution}</p>
          <h3 id="details">Transaction Details</h3>
          <input
            type="number"
            className="form-control days-input"
            id="days_number"
            placeholder="No. of days"
            required
            autoCorrect="off"
            onChange={handleDays}
          />
          <p>Amount: NGN {amount}</p>
          <p className="p-p">Previous payment date: {lastDate}</p>
          <p className="c-p">Current payment date: {currentDate}</p>
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
    </div>
  );
};

/* eslint-enable */
export default Contribution;
